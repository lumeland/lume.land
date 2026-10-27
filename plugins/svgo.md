---
title: SVGO
description: Optimize SVG files with SVGO
category: images
---

## Description

This plugin loads all `.svg` files and optimizes them using
[SVGO](https://github.com/svg/svgo).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import svgo from "@lumeland/plugin-svgo";

const site = lume();

site.use(svgo(/* Options */));
site.add([".svg"]); //Add all SVG files to process

export default site;
```
