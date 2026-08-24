# 开学自我介绍网页

适配 GitHub Pages 部署的「开学自我介绍」个人网页。采用学术专业风格（深色系、严谨排版、沉稳大气），纯前端静态实现，无需构建工具。

## 🌐 在线预览（本地）

在项目根目录启动任意静态服务器即可，例如：

```bash
# Python
python -m http.server 8080

# 或 Node.js
npx serve .
```

然后浏览器打开 <http://localhost:8080>。

## 📁 项目结构

```
.
├── index.html                 # 入口 HTML
├── css/
│   └── style.css              # 所有样式
├── js/
│   ├── main.js                # 主入口
│   ├── content.js             # 内容渲染（作品、海报、展示区）
│   └── effects.js             # 动效（打字机、滚动渐入、弹窗等）
├── projects/
│   └── data.js                # 【编程兴趣区数据】修改此文件即可增删作品
├── showcase/
│   ├── data.js                # 【科技作品区数据】修改此文件即可增删作品
│   ├── projects/              # 放置自有代码文件（可选）
│   │   └── .gitkeep
│   └── README.md              # 作品导入说明
├── assets/
│   ├── posters/               # 本地电影海报图片（可选，优先使用 TMDB 在线图）
│   │   └── .gitkeep
│   ├── wechat-qr.png          # 【请替换】微信二维码图片
│   └── avatar.jpg             # 【请替换】头像图片（可选）
└── README.md
```

所有资源路径均为**相对路径**，确保 GitHub Pages 子目录部署也能正常加载。

## 🚀 GitHub Pages 部署

### 方法一：直接推送到仓库

1. 在 GitHub 新建仓库，例如 `self-intro`。
2. 将本项目所有文件推送到 `main` 分支根目录。
3. 进入仓库 **Settings → Pages**：
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main` / `(root)`，保存
4. 等待几十秒，页面会给出访问地址，形如：
   `https://<你的用户名>.github.io/self-intro/`

### 方法二：使用 `/docs` 目录

若仓库已有其他内容，可把所有本项目文件放进仓库的 `docs/` 子目录，然后在 Pages 设置里选择 `main` + `/docs`。

## ✏️ 内容替换指南

### 1. 个人信息（姓名 / 学校 / 邮箱等）

直接编辑 `index.html`，搜索以下标记对应位置即可：

| 内容 | 位置 |
|------|------|
| 姓名 / 昵称 / 学校（导航栏、标题、副标题） | `index.html` 顶部 Nav 和 Hero 区 |
| 基本信息卡片 6 组内容 | `#info` 区块 |
| 个人简介打字机文本 | `js/effects.js` 的 `initTypewriter` 函数（或在 Hero 的 `#typewriter` 元素上加 `data-text="..."` 属性） |
| GitHub 链接 / 邮箱 / 微信号 | `#contact` 区块 + 弹窗 |

### 2. 编程 / 科技兴趣区（作品卡片）

编辑 `projects/data.js`：

```javascript
window.PROJECTS_DATA = [
  {
    name: "项目名",
    description: "简介",
    tags: ["标签1", "标签2"],
    code: "// 代码片段，可选",
    link: "https://github.com/xxx/xxx"  // 可选
  }
];
```

保存刷新即生效，无需改 HTML。

### 3. 科技作品展示区（左右分栏）

编辑 `showcase/data.js`：

```javascript
window.SHOWCASE_DATA = [
  {
    id: "unique-id",
    name: "项目名",
    icon: "🚀",
    description: "详细描述...",
    tags: ["Python", "底层"],
    language: "python",           // 决定代码高亮：c / cpp / python / javascript / arduino 等
    code: `# your code here`
  }
];
```

如果代码较长，可把代码文件放在 `showcase/projects/` 目录里，再以 `<script src="showcase/projects/xxx.js">` 引入并挂到全局，最后在 `data.js` 引用。

### 4. 影视 / 电影海报墙

默认使用 TMDB（The Movie Database）公开海报。若要自定义：

- **方式 A（推荐）**：在 `index.html` 的 `<script src="projects/data.js">` 之前，加一段：
  ```html
  <script>
    window.MOVIES_DATA = [
      { title: "片名", year: 2024, review: "一句话影评", poster: "assets/posters/movie1.jpg" }
    ];
  </script>
  ```
- **方式 B**：把海报图片放到 `assets/posters/` 目录，再用方式 A 的 `poster` 字段指向对应相对路径。

### 5. 微信二维码

将你的二维码图片命名为 `wechat-qr.png` 覆盖 `assets/wechat-qr.png` 即可。建议尺寸 400×400 以上的正方形 PNG。

### 6. 搜索替换占位符

项目里仅在以下两处使用了 `[请替换为xxx]` 提示文案，全文搜索即可定位：

- `assets/wechat-qr.png`（弹窗中的图片占位文字）
- `assets/avatar.jpg`（若需要真实头像替换 Hero 中的字母头像）

## 🎨 设计规范速查

| 用途 | 色值 |
|------|------|
| 主背景 | `#0f1923` |
| 卡片背景 | `#1a2332` |
| 主强调色（科技蓝） | `#3b82f6` |
| 次强调色（信号绿） | `#10b981` |
| 正文文字 | `#e2e8f0` |
| 次要文字 | `#94a3b8` |

字体通过 Google Fonts CDN 引入：
- 标题：**Noto Serif SC**（思源宋体，学术感）
- 正文：**Noto Sans SC**（思源黑体）
- 代码：**JetBrains Mono**

## 📱 响应式断点

| 断点 | 适配 |
|------|------|
| `> 960px` | 桌面端：4 列信息卡 / 3 列联系卡 / 280px 侧栏作品导航 |
| `720 – 960px` | 平板：2 列信息卡 / 1 列联系卡 / 作品区上下堆叠 |
| `≤ 720px` | 手机：汉堡菜单、单列布局、Hero 缩小间距 |
| `≤ 480px` | 小屏手机：所有元素进一步收紧 |

## 🛠 技术栈

- 纯静态：HTML + CSS + 原生 JavaScript
- 无构建工具（无需 webpack / vite / npm）
- 代码高亮：[Prism.js](https://prismjs.com/)（CDN）
- 字体：Google Fonts（CDN）
- 海报：TMDB 公开 CDN 图片（可替换为本地）

## ❤️ Credits

Built with ❤️ and TraeCode.
