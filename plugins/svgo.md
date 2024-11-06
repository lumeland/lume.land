---
title: SVGO
description: Optimize SVG files with SVGO
mod: plugins/svgo.ts
tags:
  - images
  - optimization
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

site.use(svgo(/* Options */));

export default site;
```
