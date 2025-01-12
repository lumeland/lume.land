---
title: Google Fonts
description: Self host Google fonts
mod: plugins/google_fonts.ts
tags:
  - styles
  - optimization
---

## Description

This plugin downloads the optimized font files from Google fonts automatically
into the `/fonts` directory and generates the `/fonts.css` file with the
`@font-face` declarations. This allows to self host the webfonts instead of
using directly the Google Fonts CDN, which is not a good idea, not only for
privacy and GDPR compliance, but also
[for performance](https://github.com/HTTPArchive/almanac.httparchive.org/pull/607).

## Installation

Import this plugin in your `_config.ts` file, passing the sharing URL of your
font selection. For example, let's say we want to use
[Playfair Display](https://fonts.google.com/share?selection.family=Playfair+Display:ital,wght@0,400..900;1,400..900):

```js
import lume from "lume/mod.ts";
import googleFonts from "lume/plugins/google_fonts.ts";

const site = lume();

site.use(googleFonts({
  fonts:
    "https://fonts.google.com/share?selection.family=Playfair+Display:ital,wght@0,400..900;1,400..900",
}));

export default site;
```

## Renaming fonts

It's possible to rename the fonts by passing an object with `name: url` pairs:

```js
site.use(googleFonts({
  fonts: {
    display: "https://fonts.google.com/share?selection.family=Playfair+Display:ital,wght@0,400..900;1,400..900",
    text: "https://fonts.google.com/share?selection.family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900"
}));
```

In the example above, the **Playfair Display** font is renamed to "display" and
**Roboto** to "text", so this allows the use of the fonts in the CSS code with
these names:

```css
h1 {
  font-family: display;
}
body {
  font-family: text;
}
```

This is useful to be able to change the font of the site without modifying the
CSS code.

## Configure the output code

This plugin outputs the CSS code with the `@font-face` declarations to the
`/fonts.css` file by default. You can configure a different file name with the
`cssFile` option:

```js
site.use(googleFonts({
  cssFile: "styles.css",
  fonts:
    "https://fonts.google.com/share?selection.family=Playfair+Display:ital,wght@0,400..900;1,400..900",
}));
```

In this example, the `@font-face` declarations are generated into the
`styles.css` file. If the file already exists, the code is appended to the file
content. If you want to insert the code in a different place, use the
`placeholder` option.

```js
site.use(googleFonts({
  cssFile: "styles.css",
  placeholder: "/* google-fonts */",
  fonts:
    "https://fonts.google.com/share?selection.family=Playfair+Display:ital,wght@0,400..900;1,400..900",
}));
```

Then, in your CSS file, add the placeholder in the place you want to insert the
code, for example:

```css
/* google-fonts */

body {
  color: blue;
}
```

The `/* google-fonts */` placeholder will be replaced by the `@font-face`
declarations.

## Specifying Subsets

By default, the plugin downloads all available subsets of the font. If you know you won't need certain subsets, you can specify which you _do_ need in your config. Google Fonts shows the subset names in the css it provides, such as [here](https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap) and [here](https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700&display=swap), and you can specify an array of the subsets you want as follows: 

```
site.use(googleFonts({
  subsets: ["latin", "latin-ext","[2]","[3]","[4]","[5]","[6]","[7]","[8]","[9]","[10]","[11]","[12]","[13]","[14]","[15]","[16]","[17]","[18]","[19]","[20]","[21]","[22]","[23]","[24]","[25]","[26]","[27]","[28]","[29]","[30]","[31]","[32]","[33]","[34]","[35]","[36]","[37]","[38]","[39]","[40]","[41]","[42]","[43]","[44]","[45]","[46]","[47]","[48]","[49]","[50]","[51]","[52]","[53]","[54]","[55]","[56]","[57]","[58]","[59]","[60]","[61]","[62]","[63]","[64]","[65]","[66]","[67]","[68]","[69]","[70]","[71]","[72]","[73]","[74]","[75]","[76]","[77]","[78]","[79]","[80]","[81]","[82]","[83]","[84]","[85]","[86]","[87]","[88]","[89]","[90]","[91]","[92]","[93]","[94]","[95]","[96]","[97]","[98]","[99]","[100]","[101]","[102]","[103]","[104]","[105]","[106]","[107]","[108]","[109]","[110]","[111]","[112]","[113]","[114]","[115]","[116]","[117]","[118]","[119]"],
  cssFile: "styles.css",
  placeholder: "/* lume-google-fonts-here */",
  fonts: {
    display:
      "https://fonts.google.com/share?selection.family=Alegreya+Sans+SC:wght@300",
    text:
      "https://fonts.google.com/share?selection.family=Alegreya:ital,wght@0,400..900;1,400..900",
    textjp:
      "https://fonts.google.com/share?selection.family=Zen+Maru+Gothic:wght@700&display=swap",
  },
}));
```

Non CJK fonts will typically have subsets like "latin", "latin-ext", "cyrillic" or "vietnamese", whicle CJK fonts like the above-mentioned "Zen Maru Gothic" Japanese font, have many subsets corresponding to the wide range of Unicode characters used in the contained syllabaries and kanji character sets. 
