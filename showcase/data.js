/**
 * 科技作品展示区 — 作品数据
 * 修改此文件即可添加自有作品
 * 每个作品字段：
 *   id:          唯一 ID（字母数字下划线，bundle 文件名会用到）
 *   name:        项目名称
 *   icon:        项目图标（emoji 或任意字符）
 *   description: 项目详细描述
 *   tags:        标签数组
 *   bundleUrl:   完整文件包下载地址（相对路径，放在 showcase/bundles/ 下）
 *   bundleSize:  压缩包大小（字符串，如 "约 480 KB"）
 *   files:       项目包含文件清单（数组）
 *   demoUrl:     【可选】在线预览地址，留空则不显示"在线预览"按钮
 */
window.SHOWCASE_DATA = [
  {
    id: "csv_dashboard",
    name: "通用数据可视化大屏",
    icon: "📊",
    description:
      "液体玻璃风的通用 CSV 大屏，导入任意 CSV 文件即可一键生成可视化。" +
      " 核心技术栈：ECharts 图表、PapaParse 解析 CSV、CSS 变量驱动的 Liquid Glass 主题，" +
      "多层径向渐变柔光缓慢漂移，叠加鼠标跟随高光折射。",
    tags: ["ECharts", "液体玻璃", "CSS变量", "PapaParse", "数据大屏"],
    bundleUrl: "showcase/bundles/csv_dashboard.zip",
    bundleSize: "约 420 KB",
    files: [
      { name: "index.html", size: "16 KB" },
      { name: "css/liquid-glass.css", size: "9 KB" },
      { name: "js/echarts-loader.js", size: "22 KB" },
      { name: "sample.csv", size: "4 KB" },
      { name: "README.md", size: "2 KB" }
    ],
    demoUrl: ""
  },
  {
    id: "cloud_music",
    name: "Jack 云音乐网站",
    icon: "🎵",
    description:
      "仿网易云 Web 端的完整 UI：左侧导航 + 顶部搜索栏 + 主内容网格 + 底部常驻播放器。" +
      " 使用 CSS Grid 做三行两列应用框架，播放器栏固定高 88px 横跨整个右下区域，" +
      "侧边栏 204px 固定宽配合阴影层次。",
    tags: ["CSS Grid", "网易云UI", "播放器", "侧栏布局"],
    bundleUrl: "showcase/bundles/cloud_music.zip",
    bundleSize: "约 560 KB",
    files: [
      { name: "index.html", size: "18 KB" },
      { name: "css/app.css", size: "26 KB" },
      { name: "css/sprites.css", size: "7 KB" },
      { name: "js/player.js", size: "14 KB" },
      { name: "assets/img/", size: "目录 420+ KB" },
      { name: "README.md", size: "3 KB" }
    ],
    demoUrl: ""
  },
  {
    id: "photo_wall_3d",
    name: "3D 回忆照片墙",
    icon: "🖼️",
    description:
      "纯 CSS 3D + perspective 实现的立体照片墙。舞台设置超大透视视距，" +
      "四排照片以不同行高绝对定位，各自无限横向滚动形成环绕视差，" +
      "鼠标悬停照片放大细节，背景配合星星粒子与 BGM 自动播放。",
    tags: ["CSS 3D", "perspective", "transform-style: preserve-3d", "视差滚动"],
    bundleUrl: "showcase/bundles/photo_wall_3d.zip",
    bundleSize: "约 1.8 MB",
    files: [
      { name: "index.html", size: "12 KB" },
      { name: "css/stage-3d.css", size: "21 KB" },
      { name: "js/stars.js", size: "6 KB" },
      { name: "assets/photos/", size: "目录 1.6+ MB" },
      { name: "assets/bgm.mp3", size: "约 180 KB" },
      { name: "README.md", size: "2 KB" }
    ],
    demoUrl: ""
  },
  {
    id: "pdd_wheel",
    name: "拼多多一刀暴富转盘",
    icon: "🎰",
    description:
      "Canvas 2D 绘制的转盘小游戏：先甜后苦的砍一刀机制——前几轮飞快逼近 100，" +
      "越接近越给你「还差 0.01」的金币。核心是用概率曲线控制中奖档位+余额逼近算法，" +
      "配合 CSS 箭头指针和 drop-shadow 发光。",
    tags: ["Canvas 2D", "概率算法", "转盘游戏", "先甜后苦"],
    bundleUrl: "showcase/bundles/pdd_wheel.zip",
    bundleSize: "约 340 KB",
    files: [
      { name: "index.html", size: "10 KB" },
      { name: "css/wheel.css", size: "8 KB" },
      { name: "js/game.js", size: "26 KB" },
      { name: "assets/arrow.svg", size: "2 KB" },
      { name: "README.md", size: "3 KB" }
    ],
    demoUrl: ""
  },
  {
    id: "hero_blindbox",
    name: "英雄盲盒十连抽",
    icon: "🎁",
    description:
      "抽卡盲盒玩法：SSR / SR / R / N 四档稀有度，十连抽保底 1 张 SR 以上。" +
      "使用 localStorage 存档抽卡历史，档案卡带星级+属性标签，" +
      "背景星空粒子配合 grid 布局呈现卡片翻牌入场动画。",
    tags: ["localStorage", "概率抽卡", "保底机制", "卡牌动画"],
    bundleUrl: "showcase/bundles/hero_blindbox.zip",
    bundleSize: "约 510 KB",
    files: [
      { name: "index.html", size: "14 KB" },
      { name: "css/cards.css", size: "32 KB" },
      { name: "css/animations.css", size: "11 KB" },
      { name: "js/gacha.js", size: "28 KB" },
      { name: "assets/hero-covers/", size: "目录 400+ KB" },
      { name: "README.md", size: "4 KB" }
    ],
    demoUrl: ""
  },
  {
    id: "video_workshop",
    name: "热歌短视频工坊",
    icon: "🎬",
    description:
      "浏览器端短视频生成器：用户上传封面图 + 背景图，选择风格模板，" +
      "逐行填写歌词后点击生成 → Canvas 按时间轴逐帧渲染画面，" +
      "配合 MediaRecorder API 录制 WebM 短视频直接下载。",
    tags: ["Canvas", "MediaRecorder", "视频合成", "歌词时间轴"],
    bundleUrl: "showcase/bundles/video_workshop.zip",
    bundleSize: "约 620 KB",
    files: [
      { name: "index.html", size: "16 KB" },
      { name: "css/editor.css", size: "18 KB" },
      { name: "js/renderer.js", size: "46 KB" },
      { name: "js/recorder.js", size: "12 KB" },
      { name: "assets/templates/", size: "目录 120+ KB" },
      { name: "README.md", size: "5 KB" }
    ],
    demoUrl: ""
  }
];
