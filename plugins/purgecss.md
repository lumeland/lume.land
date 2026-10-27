---
title: PurgeCSS
description: Use PurgeCSS to remove unused CSS code.
category: css
---

## Description

This plugin allows using [PurgeCSS](https://purgecss.com/) utility to remove
unused CSS code, making your CSS files smaller to improve the site performance.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import purgecss from "@lumeland/plugin-purgecss";

const site = lume();
site.use(purgecss());

export default site;
```
