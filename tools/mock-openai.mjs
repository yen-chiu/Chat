/**
 * 本地假的 OpenAI 接口，用来在没有 Key、没有网络的情况下验证 AI 模块
 * ---------------------------------------------------------------------------
 * 只实现 AI 模块用到的那几个字段：/v1/models、/v1/chat/completions（流式与
 * 非流式）、tool_calls。跑起来以后把页面里的「接口地址」填成
 * http://127.0.0.1:8100/v1 就能走完整条链路。
 *
 *   node tools/mock-openai.mjs [port]
 */

import http from 'node:http';

const port = Number(process.argv[2] || 8100);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
  'Access-Control-Max-Age': '86400'
};

function json(res, status, body) {
  res.writeHead(status, { ...CORS, 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

const REPLY = [
  '我先试了一句，你看看这个节奏对不对：',
  '',
  '> 凌晨两点十七分，手机亮了一下。',
  '',
  '拆开看，其实就三件事：',
  '',
  '1. 时间要具体到分钟，**02:17** 比「深夜」有力；',
  '2. 动作要小，比如「亮了一下」，不要写「思绪翻涌」；',
  '3. 留一个没说出口的东西。',
  '',
  '```js',
  "const line = { time: '02:17', action: '屏幕亮了一下' };",
  'console.log(`${line.time} · ${line.action}`);',
  '```',
  '',
  '要不要我把这段扩成 200 字？'
].join('\n');

function sse(res, chunks, done) {
  res.writeHead(200, {
    ...CORS,
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  let i = 0;
  const timer = setInterval(() => {
    if (i >= chunks.length) {
      clearInterval(timer);
      res.write('data: [DONE]\n\n');
      res.end();
      if (done) done();
      return;
    }
    const payload = {
      id: 'chatcmpl-mock',
      object: 'chat.completion.chunk',
      choices: [{ index: 0, delta: { content: chunks[i] }, finish_reason: null }]
    };
    res.write('data: ' + JSON.stringify(payload) + '\n\n');
    i++;
  }, 40);
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');

  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  if (url.pathname.endsWith('/models')) {
    json(res, 200, { data: [{ id: 'mock-chat' }, { id: 'mock-tools' }] });
    return;
  }

  if (url.pathname.endsWith('/chat/completions') && req.method === 'POST') {
    const body = await readBody(req);
    const messages = body.messages || [];
    const hasToolResult = messages.some((m) => m.role === 'tool');
    const wantsTools = Array.isArray(body.tools) && body.tools.length > 0;

    if (wantsTools && !hasToolResult) {
      // 工具调用走一次性 JSON：页面在 Agent 模式下本来就不开流式
      json(res, 200, {
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: '',
              tool_calls: [
                {
                  id: 'call_calc_1',
                  type: 'function',
                  function: { name: 'calc', arguments: '{"expression":"(12+3)*4"}' }
                }
              ]
            },
            finish_reason: 'tool_calls'
          }
        ],
        usage: { prompt_tokens: 10, completion_tokens: 5 }
      });
      return;
    }

    if (body.stream) {
      const chunks = REPLY.match(/[\s\S]{1,12}/g) || [REPLY];
      sse(res, chunks);
      return;
    }

    json(res, 200, {
      choices: [
        {
          index: 0,
          message: { role: 'assistant', content: hasToolResult ? '算出来是 60。（工具返回结果）\n\n' + REPLY : REPLY },
          finish_reason: 'stop'
        }
      ],
      usage: { prompt_tokens: 20, completion_tokens: 80 }
    });
    return;
  }

  json(res, 404, { error: { message: 'not found' } });
});

server.listen(port, '127.0.0.1', () => {
  console.log('mock OpenAI listening on http://127.0.0.1:' + port + '/v1');
});
