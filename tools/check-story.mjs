/**
 * 剧本自检：node tools/check-story.mjs [剧本路径]
 * ---------------------------------------------------------------------------
 * 写剧本最容易出的错，是把 goto 写成一个不存在的节点，或者某个结局永远走不到。
 * 这个脚本做三件事：
 *   1. 静态检查：goto / next / branch 目标存在，end 指向的结局存在，when 能解析
 *   2. 图可达性：忽略条件，从 start 出发能碰到哪些节点（漏写节点的兜底检查）
 *   3. 随机试玩：真的跑运行时，几百次随机选择，统计结局覆盖
 *
 * 引擎（js/core/narrative.js）是浏览器 IIFE，这里用 vm 造一个 window 把��装起来，
 * 保证测的是真实运行时，而不是另写一套旁路逻辑。
 */

import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const engineCode = fs.readFileSync(path.join(root, 'js/core/narrative.js'), 'utf8');
const storyPath = process.argv[2] || path.join(root, 'assets/stories/night-radio.json');
const data = JSON.parse(fs.readFileSync(storyPath, 'utf8'));

const sandbox = { window: {}, console, setTimeout, clearTimeout };
vm.createContext(sandbox);
vm.runInContext(engineCode, sandbox, { filename: 'narrative.js' });

const { Story, parse, check } = sandbox.window.WDNarrative;

const errors = [];
const warnings = [];
const nodes = data.nodes || {};
const endings = data.endings || {};
const startId = (data.meta && data.meta.start) || data.start;

/* ---------------- 1. 静态检查 ---------------- */

function assertTarget(target, from) {
  if (!target) {
    errors.push(`${from}：目标节点为空`);
    return;
  }
  if (!nodes[target]) errors.push(`${from}：找不到节点「${target}」`);
}

const edges = new Map();

function addEdge(from, to) {
  if (!edges.has(from)) edges.set(from, []);
  if (to) edges.get(from).push(to);
}

for (const [id, node] of Object.entries(nodes)) {
  if (node.next) {
    assertTarget(node.next, `${id}.next`);
    addEdge(id, node.next);
  }
  (node.choices || []).forEach((choice, i) => {
    const label = `${id}.choices[${i}]`;
    const target = choice.goto || choice.next;
    if (!target) errors.push(`${label}：没有 goto/next`);
    else {
      assertTarget(target, label);
      addEdge(id, target);
    }
    if (choice.when) {
      try {
        parse(choice.when);
      } catch (e) {
        errors.push(`${label}.when 解析失败：${e.message}`);
      }
    }
  });
  (node.branch || []).forEach((branch, i) => {
    const label = `${id}.branch[${i}]`;
    if (!branch.goto) errors.push(`${label}：没有 goto`);
    else {
      assertTarget(branch.goto, label);
      addEdge(id, branch.goto);
    }
    if (branch.when) {
      try {
        parse(branch.when);
      } catch (e) {
        errors.push(`${label}.when 解析失败：${e.message}`);
      }
    }
  });
  if (node.end && !endings[node.end]) errors.push(`${id}.end：找不到结局「${node.end}」`);
}

/* ---------------- 2. 图可达性（忽略条件） ---------------- */

const reachable = new Set();
const queue = startId ? [startId] : [];
while (queue.length) {
  const id = queue.shift();
  if (!id || reachable.has(id)) continue;
  reachable.add(id);
  for (const next of edges.get(id) || []) queue.push(next);
}

const strangers = Object.keys(nodes).filter((id) => !reachable.has(id));
if (strangers.length) {
  errors.push(`从 ${startId} 出发永远走不到的节点：${strangers.join(', ')}`);
}

/* ---------------- 3. 随机试玩 ---------------- */

function settle(story) {
  return new Promise((resolve) => {
    const tick = () => {
      if (story.finished || story.choices.length) return resolve();
      setTimeout(tick, 0);
    };
    tick();
  });
}

async function playOnce(seed) {
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };

  const story = new Story(JSON.parse(JSON.stringify(data)), {});
  story.speed = 0;

  // 记录真正进入过的节点（引擎内部通过 self.goto 跳转，所以直接换掉这个方法）
  const visited = new Set();
  const originalGoto = story.goto;
  story.goto = function (id) {
    visited.add(id);
    return originalGoto.call(this, id);
  };

  story.start();
  await settle(story);

  let guard = 0;
  while (!story.finished && story.choices.length && guard++ < 300) {
    story.choose(Math.floor(rand() * story.choices.length));
    await settle(story);
  }

  return { ending: story.ending ? story.ending.id : null, visited };
}

const RUNS = 400;
const covered = new Set();
const visitCount = new Map();

for (let i = 0; i < RUNS; i++) {
  const result = await playOnce(i * 7919 + 17);
  if (result.ending) covered.add(result.ending);
  result.visited.forEach((id) => visitCount.set(id, (visitCount.get(id) || 0) + 1));
}

const missing = Object.keys(endings).filter((id) => !covered.has(id));
if (missing.length) {
  warnings.push(`随机试玩 ${RUNS} 次没走到这些结局：${missing.join(', ')}（可能条件太苛刻，或者设置了 silent 分支）`);
}

const untouched = Object.keys(nodes).filter(
  (id) => reachable.has(id) && !visitCount.has(id) && !nodes[id].end
);
if (untouched.length) {
  warnings.push(`随机试玩没经过的节点：${untouched.join(', ')}`);
}

/* ---------------- 报告 ---------------- */

console.log(`剧本：${path.basename(storyPath)}`);
console.log(`节点 ${Object.keys(nodes).length} 个 · 结局 ${Object.keys(endings).length} 个 · 随机试玩 ${RUNS} 次`);
console.log(`走到的结局：${[...covered].join(', ') || '（无）'}`);

for (const w of warnings) console.log('  ! ' + w);

if (errors.length) {
  console.error('\n发现问题：');
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}

console.log('\n✓ 剧本自检通过');
