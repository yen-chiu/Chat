<div align="center">

# 与念真聊天中

一个可以聊天的个人小站，来自 [Wendell 的博客](https://yenchiu.com)。

<p>
  <a href="https://chat.wendell.cloud/"><img src="https://img.shields.io/badge/Live-chat.wendell.cloud-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live" /></a>
  <a href="https://yenchiu.com"><img src="https://img.shields.io/badge/Blog-yenchiu.com-a855f7?style=for-the-badge&logo=jekyll&logoColor=white" alt="Blog" /></a>
  <img src="https://img.shields.io/badge/Vue-2.x-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="MIT" />
</p>

</div>

## 关于

「与念真聊天中」是一个轻量的个人聊天页：打开就能聊，不需要注册，也不把对话丢进第三方平台。它最初来自 [Ovilia 的开源博客模板](https://github.com/Ovilia/blog)，后来按自己的需要重做了界面、移动端入口和细节交互。

- 线上地址：<https://chat.wendell.cloud/>
- 博客入口：<https://yenchiu.com/chat/>

## 功能

- 💬 即时聊天界面，打开即用
- 📱 移动端适配，手机上也能单手操作
- 🧭 与主站互通的入口，随时回到博客
- ⚡ 纯静态部署，无后端依赖
- 🎨 轻量、干净的单页样式

## 技术栈

| 层次 | 选型 |
| --- | --- |
| 视图 | Vue 2 |
| DOM / 事件 | Zepto |
| 样式 | 原生 CSS |
| 部署 | GitHub Pages + 自定义域名（CNAME） |

## 本地运行

不需要构建，直接打开 `index.html` 即可；也可以起一个静态服务器：

```bash
python -m http.server 8000
# 打开 http://127.0.0.1:8000
```

## 目录结构

```text
.
├── index.html        # 页面入口
├── css/              # 样式
├── js/               # 页面逻辑（index-min.js / enhance.js）
├── lib/              # Vue、Zepto 等本地依赖
├── img/              # 图片资源
├── assets/           # 其他静态资源
├── CNAME             # chat.wendell.cloud
└── 404.html
```

## 致谢

- [Ovilia](https://github.com/Ovilia) 的开源博客模板
- [Vue.js](https://vuejs.org/) 与 [Zepto](https://zeptojs.com/)

## License

遵循 MIT 许可证，详见 [LICENSE](LICENSE)。
