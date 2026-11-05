/**
 * 给 shell / ambient 的静态资源统一打版本号
 * ---------------------------------------------------------------------------
 * 版本号 = 这几个文件内容的 sha1 前 10 位。
 * 内容不变 → token 不变（不制造无意义的缓存失效）
 * 内容一变 → token 必变（不会出现「改了文件但 4 小时缓存还是旧的」）
 *
 * 用法：node tools/stamp.mjs
 */

import fs from 'node:fs';
import crypto from 'node:crypto';

const FILES = ['css/shell.css', 'css/ambient.css', 'js/shell.js', 'js/ambient.js', 'js/ai.js'];
const PAGES = ['index.html', 'ai.html', 'game.html', 'credits.html'];

const hash = crypto.createHash('sha1');
for (const f of FILES) {
  hash.update(fs.readFileSync(f));
  hash.update('\n');
}
const v = hash.digest('hex').slice(0, 10);

for (const page of PAGES) {
  let html = fs.readFileSync(page, 'utf8');
  for (const ref of FILES) {
    const escaped = ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(escaped + '(\\?v=[\\w.-]+)?', 'g'), `${ref}?v=${v}`);
  }
  fs.writeFileSync(page, html);
}

console.log(v);
