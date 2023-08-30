---
title: SVGO
description: Optimize SVG files with SVGO
docs: plugins/svgo.ts/~/Options
mod: plugins/svgo.ts
tags:
  - images
---

## Description

This plugin loads all `.svg` files and optimizes them using
[SVGO](https://github.com/svg/svgo).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import svgo from "lume/plugins/svgo.ts";

const site = lume();

site.use(svgo());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/svgo.ts/~/Options).
