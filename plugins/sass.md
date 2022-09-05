---
title: SASS
description: Compile SCSS files to CSS.
docs: plugins/sass.ts/~/Options
tags:
  - styles
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";

const site = lume();

site.use(sass({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/sass.ts/~/Options).

## Description

The `SASS` plugin load and transform your `.scss` files using
[Deno SASS](https://github.com/binyamin/deno-sass) library.

## Configuration

This plugin accepts a configuration object. The available options are:

- `extensions`: Array with the extensions of the files that this plugin will
  load. By default is `[".scss", ".sass"]`.
- `sourceMap`: Set `true` to generate the source map file.
- `format`: The output format (expanded or compressed). By default is
  `compressed`.
- `options`: An object with options to configure Deno SASS.
- `includes`: An array of directories to search for the `@import`ed files. By
  default is `_includes`.

## Includes

By default, the plugin is configured to look into the `_includes` directory to
find the imported files (you can change this behavior editing the `includes`
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
