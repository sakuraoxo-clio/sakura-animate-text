# Fonts used in the catalog showcase

## Chinese — Eva 宋体 (Eva-Ming SC)

`eva-ming-brand.woff2` and `eva-ming-cjk.woff2` are **web subsets** of **Eva-Ming-SC**,
a modification of Adobe **Source Han Serif** (思源宋体).

- Source Han Serif © Adobe, licensed under the **SIL Open Font License 1.1** (OFL-1.1).
- Eva-Ming-SC is a community derivative; as an OFL derivative it remains under OFL-1.1.
- These files are **subsets** (Latin + brand glyphs / GB2312 level-1 hanzi) produced with
  `fontTools.subset`, redistributed under the same OFL-1.1 terms. Reserved Font Names are
  not used as the webfont family name (it is exposed to CSS as `"Eva Ming"`).

OFL-1.1 full text: https://openfontlicense.org · Source Han Serif: https://github.com/adobe-fonts/source-han-serif

> If you are not the rights-holder and want to ship Eva-Ming yourself, verify the derivative's
> license terms for your use before redistributing.

## Titles — 思源宋体 (Noto Serif SC)

`noto-serif-sc-title.woff2` is a **web subset** of **Noto Serif SC** (= Adobe Source Han
Serif SC, weight 900), containing only the title glyphs (`喂鱼字体动效库 v0-9`).
Noto Serif SC © Adobe & Google, **SIL OFL 1.1**. https://fonts.google.com/noto/specimen/Noto+Serif+SC

## English — Space Grotesk

`space-grotesk-latin.woff2` is the **self-hosted Latin subset** (weight 700) of
**Space Grotesk** by Florian Karsten, **SIL OFL 1.1**.
https://fonts.google.com/specimen/Space+Grotesk

## Delivery

All fonts are **self-hosted** in this folder — the site loads **nothing from Google Fonts at
runtime**, so the intended typefaces render even where Google Fonts is blocked or slow (e.g.
mainland China). The showcase stack is `"Space Grotesk", "Eva Ming", serif` (Latin → Space
Grotesk, CJK → Eva 宋体); titles use `"Noto Serif SC"`.
