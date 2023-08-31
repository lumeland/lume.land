---
title: SASS
description: Compile SCSS files to CSS.
mod: plugins/sass.ts
tags:
  - styles
---

## Description

The `SASS` plugin loads and transforms your `.scss` files using the
[Deno SASS](https://github.com/binyamin/deno-sass) library.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";

const site = lume();

site.use(sass(/* Options */));

export default site;
```

## Includes

By default, the plugin is configured to look into the `_includes` directory to
find the imported files (you can change this behavior by editing the `includes`
option):

```css
/* Import the SCSS file from _includes/sass/reset.scss */
@import "sass/reset.scss";

/* The extension is optional */
@import "sass/reset";

/* Import files using a relative path */
@import "./variables.scss";
```

The output files have the same name as the input files, but with the `.css`
extension. For example, the file `/styles/main.scss` outputs `/styles/main.css`.
Take this into account when importing the styles in the HTML pages.
