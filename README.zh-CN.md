# animate-text

[English](README.md) | [简体中文](README.zh-CN.md)

> 由 [**Sakura**](https://github.com/sakuraoxo-clio) 制作的 Claude / agent **技能** ·
> [在线演示](https://sakuraoxo-clio.github.io/sakura-animate-text/demo/) ·
> MIT 许可 · 欢迎贡献

`animate-text` 是一个以 agent 技能形式打包的精选**文字动画目录**。它为标题、标签、计数器和文本切换提供精确的 JSON 运动契约，并告诉 agent 如何把每个具名效果翻译成 **WAAPI、Motion（motion.dev）、GSAP、CSS、Lottie 或 Rive**，同时不复制来源网站的字体排版或页面布局。

<p align="center">
  <img src="demo/media/preview.gif" alt="animate-text 在线预览" width="900">
</p>

> 上方每个效果都是**浏览器实时渲染的效果，直接来自这个技能自己的 JSON 配方**，不是视频。你看到的就是 agent 会复现的运动表现。

## ▶ 在线演示

**→ [sakuraoxo-clio.github.io/sakura-animate-text/demo](https://sakuraoxo-clio.github.io/sakura-animate-text/demo/)**

[`demo/`](demo/) 文件夹是一个零依赖的效果画廊，会循环渲染全部 20 个展示效果。本地运行不需要构建步骤：

```bash
cd demo
python3 -m http.server 8000
# open http://localhost:8000
```

<p align="center">
  <img src="demo/media/catalog-grid.png" alt="全部 20 个效果" width="820">
</p>

## 包含内容

```text
animate-text/
├── SKILL.md                 # agent 读取的技能契约
├── assets/
│   ├── specs/*.json         # 24 个可移植运动契约（权威意图）
│   ├── effects/*.json       # 24 个精确复现配方（渲染器 + 播放 + 适配器）
│   ├── catalog.json         # 哪些效果会在画廊中展示
│   ├── renderer-recipes.json
│   ├── library-adapters.json
│   └── …
├── references/              # 目录、schema、选择指南和实现说明
├── scripts/                 # 可选 Node 辅助脚本（list / get / find specs）
└── demo/                    # 实时视觉画廊（GitHub 展示的内容）
    ├── index.html
    ├── gallery.js           # 对四类展示渲染器的忠实 JS 实现
    ├── build-data.mjs       # 打包 assets/effects → effects-data.js
    └── media/               # preview.gif + catalog-grid.png
```

这个技能共包含 **24 个 specs**；画廊展示其中在 [`assets/catalog.json`](assets/catalog.json) 中标记为可见的 **20 个**。

## 效果目录

| id | 名称 | 目标 | 描述 |
|----|------|------|------|
| `soft-blur-in` | 柔和模糊进入 | per-character | 逐字符淡入，带有轻微模糊和向上位移。类似 Apple 标志性的英雄标题揭示效果。 |
| `per-character-rise` | 逐字符上升 | per-character | 字母从下方滑入，不带模糊，清晰、克制且有动势。 |
| `per-word-crossfade` | 逐词交叉淡入 | per-word | 单词依次柔和淡入，并伴随短距离垂直漂移。 |
| `spring-scale-in` | 弹簧缩放进入 | per-word | 单词以柔和过冲缩放弹入，像弹簧回落稳定。 |
| `mask-reveal-up` | 遮罩向上揭示 | per-line | 文本行向上揭示，具有柔和遮罩感和紧凑错峰。 |
| `line-by-line-slide` | 逐行滑入 | per-line | 每一行从左侧进入、向右侧退出，形成流动的段落揭示。 |
| `typewriter` | 打字机 | per-character | 逐字符阶梯式揭示，带有极简编辑感的打字节奏。 |
| `micro-scale-fade` | 微缩放淡入 | whole | 平静、细微的缩放弹入，为标签增加克制的高级感。 |
| `shimmer-sweep` | 微光扫过 | whole | 一道细腻光扫过干净标题，从左侧滑向中心。 |
| `fade-through` | 穿透淡入淡出 | whole | Material 风格的内容转场：旧内容淡出，新内容淡入。 |
| `shared-axis-y` | 单词阶梯切换 | per-word | 逐词硬切转场，使用阶梯式时间安排，适合干脆的内容替换。 |
| `shared-axis-z` | 共享轴 Z | whole | 基于缩放的共享轴转场，用于焦点切换和景深变化。 |
| `blur-out-up` | 向上模糊退出 | per-word | 单词清晰进入，并在离场时向上移动且逐渐增加模糊。 |
| `scale-down-fade` | 缩小淡出 | whole | 克制的缩小淡出离场，用于高级、沉稳的收束。 |
| `focus-blur-resolve` | 对焦模糊解析 | whole | 从重度模糊拉焦到清晰文字，然后柔和模糊退出。 |
| `bottom-up-letters` | 字母自下而上 | per-character | 字母从下方以明显阶梯节奏升起，零模糊。 |
| `top-down-letters` | 字母自上而下 | per-character | 字母从上方以明显阶梯节奏下降，零模糊。 |
| `kinetic-center-build` | 动态居中构建 | per-word | 单词从右到左进入并推动整行，直到短语锁定在中心。 |
| `short-slide-right` | 短距离右滑 | per-word | 整个短语作为一个动作滑入，同时单词通过透明度依次显现。 |
| `short-slide-down` | 短距离下落 | per-word | 单词从上方下落，把文本堆叠推入居中的三行锁定版式。 |

另外还有 4 个隐藏 specs（`depth-parallax-words`、`shared-axis-x`、`stagger-from-center`、`stagger-from-edges`）。虽然画廊不展示它们，agent 仍然可以使用。

## agent 如何使用

1. 通过 id 选择效果，或按意图搜索（使用 `references/catalog.md`，或运行 `node scripts/find-spec.mjs "<query>"`）。
2. 读取 [`assets/specs/<id>.json`](assets/specs) 获取**可移植**运动契约，或读取 [`assets/effects/<id>.json`](assets/effects) 获取**精确**复现配方，包括渲染器、播放循环、时间、舞台要求和各库适配器。
3. 翻译到目标技术栈，并保持 `target`、缓动、错峰和 transform 不变。指定目标库时，只使用匹配的适配器，不做静默替换。

完整契约见 [`SKILL.md`](SKILL.md)。

## 重新生成演示数据

`demo/effects-data.js` 是生成文件，这样画廊即使通过 `file://` 打开也能工作：

```bash
node demo/build-data.mjs
```

## 作者

**Sakura** — building at the intersection of AI × IP.

- GitHub: [github.com/sakuraoxo-clio](https://github.com/sakuraoxo-clio)
- 本仓库: [sakura-animate-text](https://github.com/sakuraoxo-clio/sakura-animate-text)

如果这个技能或演示画廊对你有用，欢迎给仓库点一个 ⭐。
也欢迎提交 issue 和 PR。

## 许可证

[MIT](LICENSE) © Sakura。`demo/` 中的演示画廊代码按原样提供，用于展示这个目录；底层运动 specs 被整理为可移植复用的目录。
