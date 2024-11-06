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
