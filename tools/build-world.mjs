/**
 * 把分章源文件合并成一个运行时剧本
 * ---------------------------------------------------------------------------
 * 源：assets/stories/nianzhen/src/ch*.json（人写，按章拆）
 * 产物：assets/stories/nianzhen/nianzhen.json（提交进仓库，站点仍然无构建）
 *
 * 用法：node tools/build-world.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'assets/stories/nianzhen';
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'nianzhen.json');
const SEEDS = path.join(ROOT, 'seeds.json');

const files = fs
  .readdirSync(SRC)
  .filter((f) => /^ch\d+.*\.json$/.test(f))
  .sort();

if (!files.length) {
  console.error('✗ src/ 里没有 ch*.json');
  process.exit(1);
}

const chapters = files.map((file) => {
  const data = JSON.parse(fs.readFileSync(path.join(SRC, file), 'utf8'));
  return { file, data };
});

const first = chapters[0].data;
const world = {
  meta: {
    ...first.meta,
    chapters: chapters.map((c) => ({
      id: c.data.meta.id,
      title: c.data.meta.title,
      start: c.data.meta.start,
      file: c.file
    }))
  },
  vars: {},
  endings: {},
  nodes: {}
};

const seen = new Set();
let messages = 0;
let choices = 0;
let chars = 0;

for (const { file, data } of chapters) {
  Object.assign(world.vars, data.vars || {});
  Object.assign(world.endings, data.endings || {});
  for (const [id, node] of Object.entries(data.nodes || {})) {
    if (seen.has(id)) {
      console.error(`✗ 节点 id 重复：${id}（${file}）`);
      process.exit(1);
    }
    seen.add(id);
    world.nodes[id] = node;
    (node.messages || []).forEach((m) => {
      messages += 1;
      const text = typeof m === 'string' ? m : m.text || '';
      chars += String(text).length;
    });
    (node.choices || []).forEach((c) => {
      choices += 1;
      chars += String(c.text || '').length;
    });
  }
}

const seedData = fs.existsSync(SEEDS) ? JSON.parse(fs.readFileSync(SEEDS, 'utf8')) : null;
if (seedData && seedData.fragments) world.meta.fragments = seedData.fragments;

fs.writeFileSync(OUT, JSON.stringify(world, null, 2) + '\n');
console.log(
  `✓ ${OUT} · ${files.length} 章 · ${Object.keys(world.nodes).length} 节点 · ` +
    `${messages} 条消息 · ${choices} 个选项 · 约 ${chars} 字`
);
