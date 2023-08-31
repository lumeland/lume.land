---
title: Source Maps
description: Generate source maps files for your CSS and JS.
mod: plugins/source_maps.ts
tags:
  - styles
  - javascript
  - utils
---

## Description

Lume plugins like [Postcss](./postcss.md), [esbuild](./esbuild.md),
[Terser](./terser.md), [SASS](./sass.md) or [Lightning CSS](./lightningcss.md)
process and bundle your CSS and JavaScript files. Combine them with
`source_maps` to create the source maps files to debug your code in the
browser's development tools.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import postcss from "lume/plugins/postcss.ts";
import esbuild from "lume/plugins/esbuild.ts";
import sourceMaps from "lume/plugins/source_maps.ts";

const site = lume();

// Process your CSS and JS code with other plugins
site.use(sass());
site.use(postcss());
site.use(esbuild());

// Use the source maps plugin to generate the .map files
site.use(sourceMaps(/* Options */));

export default site;
```
