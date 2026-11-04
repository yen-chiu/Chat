/**
 * 页面体检：用 Chrome DevTools Protocol 在无头浏览器里跑真实页面
 * ---------------------------------------------------------------------------
 * 用法：
 *   node tools/ui-check.mjs <url> [--shot out.png] [--wait 1200] [--eval "expr"] [--click "selector"]
 *
 * 为什么需要它：这个站没有构建、没有测试框架，很多问题（横向溢出、按钮没绑上事件、
 * JS 抛错）只能真跑一遍才看得见。脚本会打印控制台错误、document.scrollWidth、
 * 以及 --eval 表达式的结果，并按需截图。
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CHROME =
  process.env.CHROME || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333 + Math.floor(Math.random() * 200);

const args = process.argv.slice(2);
const url = args[0];
if (!url) {
  console.error('用法：node tools/ui-check.mjs <url> [--shot a.png] [--wait ms] [--eval expr] [--click selector]');
  process.exit(2);
}

function flag(name, fallback) {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
}

const shot = flag('--shot', '');
const waitMs = Number(flag('--wait', '1500'));
const evalExpr = flag('--eval', '');
const clickSel = flag('--click', '');
const width = Number(flag('--width', '430'));
const height = Number(flag('--height', '900'));
const storageFile = flag('--storage-file', '');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wd-ui-'));
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    // storage-file 会先改 localStorage 再回跳；回跳若命中 BFCache，脚本不会重跑
    '--disable-back-forward-cache',
    '--disable-features=BackForwardCache',
    '--hide-scrollbars',
    '--disable-extensions',
    `--window-size=${width},${height}`,
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ],
  { stdio: 'ignore' }
);

let ws;
let nextId = 1;
const pending = new Map();
const consoleLines = [];
const pageErrors = [];

function send(method, params = {}, timeout = 60000) {
  const id = nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error('CDP 超时：' + method));
      }
    }, timeout);
    // 有结果就把定时器撤掉，否则进程会白等 60 秒才退出
    pending.set(id, {
      resolve: (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      reject: (err) => {
        clearTimeout(timer);
        reject(err);
      }
    });
  });
}

async function waitForPort() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return await res.json();
    } catch (e) {
      /* 还没起来 */
    }
    await sleep(100);
  }
  throw new Error('Chrome 没有在预期时间内启动');
}

async function main() {
  await waitForPort();

  const created = await fetch(
    `http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`,
    { method: 'PUT' }
  );
  const target = await created.json();

  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve);
    ws.addEventListener('error', reject);
  });

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
      return;
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = (msg.params.args || [])
        .map((a) => (a.value !== undefined ? String(a.value) : a.description || a.type))
        .join(' ');
      consoleLines.push(`[${msg.params.type}] ${text}`);
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      pageErrors.push(
        (d.exception && (d.exception.description || d.exception.value)) || d.text || 'unknown error'
      );
    }
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      pageErrors.push(msg.params.entry.text);
    }
  });

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Log.enable');

  // Chrome 的窗口有最小宽度（约 500px），手机宽度必须靠 Emulation 覆盖
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600
  });

  await send('Page.navigate', { url });
  await sleep(waitMs);

  if (storageFile) {
    const fixture = JSON.parse(fs.readFileSync(storageFile, 'utf8'));
    const parsed = new URL(url);
    // 同源但换个查询串，避免多打一次 404；设置完 localStorage 再回到目标地址
    parsed.searchParams.set('wd-probe', '1');
    await send('Page.navigate', { url: parsed.toString() });
    await sleep(500);
    const js = Object.entries(fixture)
      .map(([k, v]) => `localStorage.setItem(${JSON.stringify(k)}, ${JSON.stringify(String(v))});`)
      .join('\n');
    await send('Runtime.evaluate', { expression: js, returnByValue: true });
    await send('Page.navigate', { url });
    await sleep(waitMs);
  }

  if (clickSel) {
    await send('Runtime.evaluate', {
      expression: `(function(){ var n=document.querySelector(${JSON.stringify(clickSel)}); if(!n) return 'NOT_FOUND'; n.click(); return 'CLICKED'; })()`,
      returnByValue: true
    });
    await sleep(1200);
  }

  const metrics = await send('Runtime.evaluate', {
    expression: `(function(){
      var d = document.documentElement;
      var overflow = [];
      document.querySelectorAll('body *').forEach(function(n){
        var r = n.getBoundingClientRect();
        if (r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1)) {
          overflow.push({ tag: n.tagName, cls: (n.className || '').toString().slice(0, 40), left: Math.round(r.left), right: Math.round(r.right) });
        }
      });
      return {
        title: document.title,
        viewport: window.innerWidth + 'x' + window.innerHeight,
        scrollWidth: d.scrollWidth,
        scrollHeight: d.scrollHeight,
        bodyOverflowX: getComputedStyle(document.body).overflowX,
        theme: d.getAttribute('data-theme'),
        drawer: !!document.getElementById('wd-drawer'),
        appsTrigger: !!document.getElementById('wd-apps-trigger'),
        overflow: overflow.slice(0, 12),
        overflowCount: overflow.length,
        bodyText: (document.body.innerText || '').slice(0, 300)
      };
    })()`,
    returnByValue: true
  });

  let evalResult = null;
  if (evalExpr) {
    const r = await send('Runtime.evaluate', {
      expression: evalExpr,
      returnByValue: true,
      awaitPromise: true
    });
    evalResult = r.result ? r.result.value : null;
  }

  if (shot) {
    const img = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(shot, Buffer.from(img.data, 'base64'));
  }

  const m = metrics.result.value;
  console.log(JSON.stringify({ ...m, eval: evalResult, console: consoleLines.slice(-20), errors: pageErrors.slice(-10) }, null, 2));

  ws.close();
}

try {
  await main();
} catch (err) {
  console.error('✗ ' + err.message);
  process.exitCode = 1;
} finally {
  try {
    chrome.kill();
  } catch (e) {
    /* ignore */
  }
  await sleep(200);
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (e) {
    /* Windows 上偶尔删不掉，无所谓 */
  }
}
