/**
 * 剧本体检：图结构 + 伏笔账本 + 体量
 * ---------------------------------------------------------------------------
 * 用法：node tools/check-world.mjs
 * 有错误时退出码 1；警告不阻塞。
 */

import fs from 'node:fs';
import path from 'node:path';

const DIR = process.argv[2] || 'assets/stories/nianzhen';
const STORY = path.join(DIR, path.basename(DIR) + '.json');
const SEEDS = process.env.WD_SEEDS || path.join(DIR, 'seeds.json');

const story = JSON.parse(fs.readFileSync(STORY, 'utf8'));
const seeds = fs.existsSync(SEEDS)
  ? JSON.parse(fs.readFileSync(SEEDS, 'utf8'))
  : { seeds: [] };

const nodes = story.nodes || {};
const ids = new Set(Object.keys(nodes));
const errors = [];
const warnings = [];

function target(id, from) {
  if (!id) return;
  if (!ids.has(id)) errors.push(`${from} → ${id}：节点不存在`);
}

for (const [id, node] of Object.entries(nodes)) {
  if (node.next) target(node.next, id);
  (node.choices || []).forEach((c) => target(c.goto, id));
  (node.branch || []).forEach((b) => target(b.goto, id));
  if (node.end && !story.endings[node.end]) {
    errors.push(`${id}.end：结局「${node.end}」不存在`);
  }
  if (node.end && story.endings[node.end] && story.endings[node.end].next) {
    target(story.endings[node.end].next, id + '.end.next');
  }
  const hasExit =
    node.end ||
    node.next ||
    (node.choices && node.choices.length) ||
    (node.branch && node.branch.length);
  if (!hasExit) errors.push(`${id}：没有出口（死路）`);
}

// 可达性
const reachable = new Set();
const queue = [story.meta.start];
while (queue.length) {
  const id = queue.pop();
  if (!id || reachable.has(id)) continue;
  const node = nodes[id];
  if (!node) continue;
  reachable.add(id);
  if (node.next) queue.push(node.next);
  (node.choices || []).forEach((c) => queue.push(c.goto));
  (node.branch || []).forEach((b) => queue.push(b.goto));
  if (node.end && story.endings[node.end] && story.endings[node.end].next) {
    queue.push(story.endings[node.end].next);
  }
}
const orphans = [...ids].filter((id) => !reachable.has(id));
if (orphans.length) errors.push(`不可达节点：${orphans.join(', ')}`);

// 伏笔账本
if (!fs.existsSync(SEEDS)) warnings.push('伏笔账本未找到：' + SEEDS);

for (const seed of seeds.seeds || []) {
  const plants = seed.plant || [];
  const realPlants = plants.filter((p) => ids.has(p));
  if (!realPlants.length) {
    if (seed.status === 'planted') {
      errors.push(`伏笔 ${seed.id}：标了 planted，但 plant 节点都不存在`);
    } else {
      warnings.push(`伏笔 ${seed.id}：还没埋（${plants.join(', ')}）`);
    }
  }
  if (seed.status === 'planted' && realPlants.length < 2) {
    warnings.push(`伏笔 ${seed.id}：只出现 1 次，季内伏笔建议至少 2 次`);
  }
}

// 碎片
for (const frag of seeds.fragments || []) {
  if (frag.status === "live" && !(story.vars && Object.prototype.hasOwnProperty.call(story.vars, frag.id))) {
    errors.push(`碎片 ${frag.id}：标了 live，但 vars 里没有这个标记`);
  }
  if (frag.status !== "live") {
    warnings.push(`碎片 ${frag.id}：还没接（${frag.hint || ""}）`);
  }
}

// 体量
let chars = 0;
let messages = 0;
for (const node of Object.values(nodes)) {
  (node.messages || []).forEach((m) => {
    messages += 1;
    chars += String(typeof m === 'string' ? m : m.text || '').length;
  });
  (node.choices || []).forEach((c) => {
    chars += String(c.text || '').length;
  });
}

console.log(
  `节点 ${ids.size} · 可达 ${reachable.size} · 消息 ${messages} · 约 ${chars} 字 · ` +
    `结局 ${Object.keys(story.endings).length} · 伏笔 ${seeds.seeds.length}`
);

for (const w of warnings) console.log('  ! ' + w);
if (errors.length) {
  for (const e of errors) console.log('  ✗ ' + e);
  process.exit(1);
}
console.log('✓ 通过');
