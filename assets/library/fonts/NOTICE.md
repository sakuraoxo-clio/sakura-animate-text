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

## English — Space Grotesk

Loaded at runtime from Google Fonts. **Space Grotesk** by Florian Karsten, **SIL OFL 1.1**.
https://fonts.google.com/specimen/Space+Grotesk

The showcase stack is `"Space Grotesk", "Eva Ming", serif` — Latin renders in Space Grotesk,
CJK falls through to Eva 宋体.
