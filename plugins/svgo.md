---
title: SVGO
description: Using the SVGO plugin to optimize SVG files
docs: plugins/svgo.ts/~/Options
tags:
  - images
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import svgo from "lume/plugins/svgo.ts";

const site = lume();

site.use(svgo({/* your config here */}));

export default site;
```

To see all configuration options, click in the "See available Options in Deno
Doc" button above.

## Description

This plugin load all `.svg` files and optimize them using
[SVGO](https://github.com/svg/svgo)
