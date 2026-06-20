# 喂鱼字体动效库

> 抖音 **@喂鱼** · 让你用 AI 做视频时，字体出现效果更好
> [在线预览](https://sakuraoxo-clio.github.io/sakura-animate-text/demo/catalog/) · MIT 开源 · 觉得有用欢迎 ⭐ Star

一套**可直接复制使用的文字出现动效库**。浏览器里实时预览，挑中意的一键复制，贴进你的视频、网页或项目——不用装任何东西，也不用会写动画。

<p align="center">
  <img src="demo/media/preview.gif" alt="喂鱼字体动效库 实时预览" width="900">
</p>

> 上面每一个都是**浏览器里实时跑出来的动画**，不是录屏、不是 GIF。你复制走的就是这段效果本身。

## ▶ 在线预览

| 版本 | 是什么 | 打开 |
|---|---|---|
| **v2 · 全量库** | 60+ 种文字出现动效，分入场 / 出场 / 循环，持续更新，复制即用 | [demo/catalog →](https://sakuraoxo-clio.github.io/sakura-animate-text/demo/catalog/) |
| **v1 · 精选版** | 20 个手工打磨的动效，附精确动效参数，可翻译成 GSAP / WAAPI / CSS / Lottie / Rive | [demo →](https://sakuraoxo-clio.github.io/sakura-animate-text/demo/) |

本地跑（零依赖，无需构建）：

```bash
python3 -m http.server 8000        # 在仓库根目录执行
# 浏览器打开 http://localhost:8000/demo/catalog/
```

## 直接用到你的项目

无需构建，三行接入，文字换成你自己的：

```html
<link rel="stylesheet" href="assets/library/jy-text-animations.css">
<div id="stage"></div>
<script src="assets/library/jy-text-animations.js"></script>
<script>
  // 按 id 播放一个动效
  JYTextAnimations.play("7239559299196785209", "#stage", "你的文字");
  JYTextAnimations.list("入场");                 // 按分组浏览：入场 / 出场 / 循环
  JYTextAnimations.get("7239559299196785209");  // 拿到原始函数自己调
</script>
```

> 每个动效的 id，在 v2 页面点卡片上的「复制」就能拿到一段现成代码，直接贴走。

## 仓库结构

```
sakura-animate-text/
├── assets/
│   └── library/                    # 喂鱼字体动效库（v2 用的库本体）
│       ├── jy-text-animations.js   # 全部动效函数 + JYTextAnimations API
│       ├── jy-text-animations.css
│       ├── presets.js              # 动效清单（v2 画廊展示的就是它）
│       ├── catalog.csv             # id · 名称 · 分组 · 类型 · 时长 索引
│       └── fonts/                  # 展示用网页字体：Eva 宋体子集（中文）+ 授权说明
├── demo/
│   ├── index.html                  # v1 · 20 个精选动效
│   ├── catalog/index.html          # v2 · 喂鱼字体动效库实时画廊
│   ├── gallery.js · build-data.mjs # v1 画廊渲染 / 数据构建
│   └── media/                      # 预览图
├── assets/specs · effects · …      # v1 的 JSON 动效契约（给 AI agent 翻译用）
├── references/ · scripts/          # v1 的说明文档与脚本
└── SKILL.md                        # v1 作为 Claude / Agent Skill 的契约
```

## 字体

| 用途 | 字体 | 说明 |
|---|---|---|
| 中文展示 | **Eva 宋体**（思源宋体衍生） | 已子集化：品牌片 10KB 默认载入，常用字片 1.5MB 仅在输入自定义中文时才下载 |
| 标题 | **思源宋体**（Noto Serif SC） | 走 Google Fonts |
| 英文展示 | **Space Grotesk** | 走 Google Fonts；中英混排时拉丁走它、汉字落 Eva 宋体 |

字体授权（均为 SIL OFL 1.1）详见 [`assets/library/fonts/NOTICE.md`](assets/library/fonts/NOTICE.md)。

## v1 · 精选动效契约（也是一个 Claude / Agent Skill）

v1 是 20 个精挑细选的文字动效，每个都带**可移植的 JSON 动效契约**，能被 AI agent 一键翻译成 WAAPI / Motion / GSAP / CSS / Lottie / Rive。完整契约见 [`SKILL.md`](SKILL.md)；动效规格在 [`assets/specs/`](assets/specs)、渲染配方在 [`assets/effects/`](assets/effects)。

<details>
<summary>展开 v1 的 20 个精选动效清单</summary>

| id | 动法 | 粒度 |
|----|------|------|
| `soft-blur-in` | 逐字模糊上浮淡入（Apple 风标题揭示） | 逐字 |
| `per-character-rise` | 逐字自下升起，无模糊，干净利落 | 逐字 |
| `per-word-crossfade` | 逐词淡入并轻微上移 | 逐词 |
| `spring-scale-in` | 逐词弹性放大入场，像弹簧回稳 | 逐词 |
| `mask-reveal-up` | 逐行向上揭开，柔和遮罩感 | 逐行 |
| `line-by-line-slide` | 逐行从左入、向右出，段落流动 | 逐行 |
| `typewriter` | 逐字打字机节奏 | 逐字 |
| `micro-scale-fade` | 极小幅放大，标签的高级微动 | 整体 |
| `shimmer-sweep` | 清爽标题上的扫光 | 整体 |
| `fade-through` | Material 风内容切换：旧淡出、新淡入 | 整体 |
| `shared-axis-y` | 逐词硬切，阶梯时序 | 逐词 |
| `shared-axis-z` | 缩放式共享轴切换，景深聚焦 | 整体 |
| `blur-out-up` | 词干净到来、上浮并渐糊离开 | 逐词 |
| `scale-down-fade` | 克制的缩小淡出收尾 | 整体 |
| `focus-blur-resolve` | 从重模糊拉到清晰再轻糊出 | 整体 |
| `bottom-up-letters` | 字母自下显著阶梯升起 | 逐字 |
| `top-down-letters` | 字母自上显著阶梯降落 | 逐字 |
| `kinetic-center-build` | 词从右入并推动整行，最终居中锁定 | 逐词 |
| `short-slide-right` | 整句滑入、词按透明度依次显现 | 逐词 |
| `short-slide-down` | 词自上落下，叠成居中三行 | 逐词 |

另有 4 个规格随包但默认不展示（`depth-parallax-words`、`shared-axis-x`、`stagger-from-center`、`stagger-from-edges`），agent 仍可调用。

</details>

## 作者

**喂鱼** · 一线带团队的 AI × IP 操盘手 / IP 就业教育者。

- 抖音：**@喂鱼** —— 用 AI 做视频 · IP 运营
- GitHub：[@sakuraoxo-clio](https://github.com/sakuraoxo-clio)

觉得有用，给仓库点个 ⭐ **Star** 就是最好的支持。欢迎 Issue / PR。

## License

- 代码 → [MIT](LICENSE) © 喂鱼 / sakuraoxo
- 字体子集 → SIL OFL 1.1（Eva 宋体 / 思源宋体 / Space Grotesk），见 [`assets/library/fonts/NOTICE.md`](assets/library/fonts/NOTICE.md)
