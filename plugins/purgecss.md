---
title: PurgeCSS
description: Use PurgeCSS to remove unused CSS code.
mod: plugins/purgecss.ts
tags:
  - styles
  - optimization
---

## Description

This plugin allows using [PurgeCSS](https://purgecss.com/) utility to remove
unused CSS code, making your CSS files smaller to improve the site performance.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import purgecss from "lume/plugins/purgecss.ts";

const site = lume();
site.use(purgecss());

export default site;
```
