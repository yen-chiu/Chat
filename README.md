<div align="center">

# 与念真聊天中

一个小型「聊天站」，也是 [Wendell 的博客](https://yenchiu.com) 的子站。现在它不止能聊天：里面还装了一个对话式小游戏和一个自带模型的 AI 页。

> **以主站为准**：线上只有一份——[yenchiu.com/chat](https://yenchiu.com/chat/)，它由 `yen-chiu.github.io` 仓库的 `chat/` 目录发布。那边才是改代码的地方；**本仓库只是偶尔打一次的快照备份**，不跟随每次改动（GitHub Pages 已关闭，`yen-chiu.github.io/Chat/` 不再提供访问）。
>
> 要打快照：在 `C:\03_Github\Chat` 下跑 `powershell -File tools\backup-from-site.ps1`（默认只提交本地，加 `-Push` 才推上去）。

<p>
  <a href="https://yenchiu.com/chat/"><img src="https://img.shields.io/badge/Live-yenchiu.com%2Fchat-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live" /></a>
  <a href="https://yenchiu.com"><img src="https://img.shields.io/badge/Blog-yenchiu.com-a855f7?style=for-the-badge&logo=jekyll&logoColor=white" alt="Blog" /></a>
  <img src="https://img.shields.io/badge/Vue-2.x-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/build-none-22c3aa?style=flat-square" alt="No build" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="MIT" />
</p>

</div>

## 现在有什么

打开任意一页，右上角的四个方块按钮会拉出一个「手机桌面」式的抽屉：

| 模块 | 地址 | 是什么 |
| --- | --- | --- |
| 与念真聊天 | `/` | 原来的脚本化对话，她按 `assets/dialog.json` 里的剧本回你 |
| 第一 / 二 / 三季 | `/story.html`、`/story-s2.html`、`/story-s3.html` | 按「夜」分章的对话故事 |
| 异次元通讯 | `/play.html?a=miko` | 搬进来的网页版：原版与「次元复苏」的剧情、词典、图鉴、动态 |
| 生命线 | `/play.html?a=lifeline` | 搬进来的网页版：和坠毁在陌生星球的泰勒用消息保持联系 |
| 自带模型的 AI | `/ai.html` | 填自己的 API Key，接任何 OpenAI 兼容接口；带人格、流式输出、本地工具与联网搜索 |
| 凌晨两点十七分 | `/game.html` | 一个即时通讯式的短篇剧情，45 个节点、4 个结局，约 12 分钟 |
| 致谢 | `/credits.html` | 这个小站站着的开源项目，以及各自帮了什么忙 |

这些模块共用一套设计令牌（`css/shell.css`），支持浅色 / 深色 / 跟随系统，抽屉里可以切换；背景还有「自动 / 静 / 萤火」三档氛围。

## 设计取舍

- **纯静态、无构建**：没有打包器，改完刷新就是最新的。代价是不能用 npm 依赖，所以 Markdown 渲染、剧情运行时、SSE 客户端都是自己写的几十到两百行。
- **模块 = 独立页面**：抽屉只负责跳转，不做前端路由。任何一页崩了不会拖垮其他页，也方便单独分享链接。
- **搬进来的两个网页版原样保留**：`apps/miko-web/` 与 `apps/lifeline-web/` 是另外两个站的完整副本（各自的样式、剧情引擎、存档键都没动），只由 `play.html` 加一层顶栏 + iframe 装起来。它们的音乐、存档、后日谈 AI 全都照旧；以后要更新这两个游戏，直接从各自仓库整体覆盖这两个目录。
- **AI 模块不经过服务器**：Key 只写进本机 `localStorage`，请求由浏览器直接发往你填的地址。本站没有后端，也不经手对话内容。
- **旧页面尽量不动**：聊天页原有的 `main.min.css` + `index-min.js` 逻辑没改，新样式叠在 `shell.css` 里覆盖。

## 目录结构

```text
.
├── index.html                  # 聊天页（旧）
├── game.html                   # 对话游戏
├── ai.html                     # AI 模块
├── play.html                   # 内嵌应用页：装抽屉里的两个网页版游戏
├── credits.html                # 致谢
├── apps/
│   ├── miko-web/               # 异次元通讯 · 网页版（整站副本）
│   └── lifeline-web/           # 生命线 · 网页版（整站副本）
├── css/
│   ├── main.min.css            # 旧聊天页样式
│   ├── enhance.css             # 旧页面的增强覆盖
│   ├── shell.css               # 设计令牌 + 应用抽屉 + 深色主题（新）
│   ├── ambient.css             # 氛围背景：天光 / 台灯 / 颗粒 / 光尘（新）
│   ├── game.css                # 游戏页（新）
│   ├── ai.css                  # AI 页（新）
│   ├── play.css                # 内嵌应用页：顶栏 + iframe 舞台（新）
│   └── credits.css             # 致谢页（新）
├── js/
│   ├── index-min.js            # 旧聊天逻辑
│   ├── enhance.js              # 旧页面的键盘 / 可访问性增强
│   ├── shell.js                # 抽屉 + 主题（新）
│   ├── ambient.js              # 氛围背景运行时：光尘 canvas + 启停策略（新）
│   ├── core/narrative.js       # 剧情运行时：变量、条件、结局、回退（新）
│   ├── core/markdown.js        # 安全的 Markdown 渲染（新）
│   ├── core/ai-client.js       # OpenAI 兼容的流式客户端（新）
│   ├── game.js                 # 游戏页逻辑（新）
│   └── ai.js                   # AI 页逻辑（新）
├── assets/
│   ├── dialog.json             # 聊天页剧本
│   └── stories/
│       ├── night-radio.json    # 游戏剧本
│       └── README.md           # 剧本格式说明
├── tools/
│   ├── check-story.mjs         # 剧本自检（跳转 / 条件 / 结局覆盖）
│   ├── ui-check.mjs            # 无头浏览器体检（CDP，截图 + 控制台错误）
│   └── mock-openai.mjs         # 本地假的 OpenAI 接口，用来离线测 AI 模块
├── lib/                        # Vue 2 与 Zepto
└── img/                        # 图片资源
```

## 本地运行

不需要构建。起一个静态服务器即可（`fetch` 读 JSON、模块页跳转都需要 HTTP，直接双击 `file://` 打开会踩跨域）：

```bash
python -m http.server 8000
# 打开 http://127.0.0.1:8000
```

## 怎么加东西

**加一个模块**：写一个 HTML 页，引入 `css/shell.css` 和 `js/shell.js`，在页面里放一个 `<span data-wd-apps-slot></span>`（抽屉按钮会插进去），然后到 `js/shell.js` 的 `APPS` 里加一条注册信息。

**搬一个完整的网页版应用**：把整站复制到 `apps/<名字>/`（保持它自己的相对路径不变），在 `play.html` 顶部那个 `APPS` 表里加一条 `{ name, note, src, theme, title }`，再到 `js/shell.js` 的 `APPS` 里注册一条 `href: 'play.html?a=<名字>'`。这样它就和站内的页面共用同一个抽屉；仓库里的 `miko-web`、`lifeline-web` 都是这么进来的。

**加一个故事**：复制 `assets/stories/night-radio.json`，照着 [格式说明](assets/stories/README.md) 改，然后 `node tools/check-story.mjs 你的文件.json`。

**接一个模型服务**：AI 页的「服务商」里选「自定义 / 代理」，填一个以 `/v1` 结尾的地址即可。官方接口不允许浏览器直连时（比如 OpenAI），把「接口地址」换成自己的反向代理地址；也可以先跑 `node tools/mock-openai.mjs`，把地址填成 `http://127.0.0.1:8100/v1` 看整条链路。

## 隐私

- 没有后端、没有统计脚本；图片和字体都在仓库里。
- AI 的 Key 与对话只存在本机浏览器；「清空 Key」会把 Key 从 storage 里删掉。
- 联网搜索和读网页会经本站的只读代理（`api.yenchiu.com`，Cloudflare Worker）转一次：代理只把公开网页/搜索结果取回来，不保存查询内容、不存 Key。想完全绕开它，就在设置里换成自己的 SearXNG / 读取代理。
- 游戏进度同样只存本机，清浏览器数据即清空。

## 致谢

完整的清单（含许可证与每个项目具体帮了什么忙）在 **[credits.html](credits.html)**。要点：

- 聊天页的原始设计与实现来自 [Ovilia 的开源博客模板](https://github.com/Ovilia/blog)，界面依赖 [Vue 2](https://vuejs.org/) 与 [Zepto](https://zeptojs.com/)
- 剧情语法的设计参考 [inkle/ink](https://github.com/inkle/ink) 与 [Yarn Spinner](https://github.com/YarnSpinnerTool/YarnSpinner)，即时通讯叙事的形式参考 *Emily is Away* 与 *Digital: A Love Story*
- AI 模块的交互参考 [chatbot-ui](https://github.com/mckaywrigley/chatbot-ui)、[LibreChat](https://github.com/danny-avila/LibreChat)、[LobeChat](https://github.com/lobehub/lobe-chat)、[Open WebUI](https://github.com/open-webui/open-webui)、[assistant-ui](https://github.com/Yonom/assistant-ui)
- 手机式抽屉的形态参考 [Puter](https://github.com/HeyPuter/puter) 与 [daedalOS](https://github.com/DustinBrett/daedalOS)

## License

MIT，详见 [LICENSE](LICENSE)。
