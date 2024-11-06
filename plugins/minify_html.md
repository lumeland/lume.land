---
title: Minify HTML
description: Minify the HTML code of your pages.
mod: plugins/minify_html.ts
tags:
  - html
  - optimization
---

## Description

The `MinifyHTML` plugin minifies the HTML code of your pages using the
[minify-html](https://github.com/wilsonzlin/minify-html) minifier. It can also
minify CSS and JavaScript code.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

const site = lume();

site.use(minifyHTML(/* Options */));

export default site;
```

## Configuration

This plugin accepts a configuration object. The available options are:

- `extensions`: Array with the extensions of the files that will be minified. By
  default it is `[".html"]`, but you can include also `.css` and `.js` to minify
  these files.
- `options`: The available options for `minify-html`. See
  [the documentation](https://doc.deno.land/https://deno.land/x/lume/deps/minify_html.ts/~/Options)
  for more info.
