---
title: Filter pages
description: To filter pages under a specific condition
mod: plugins/filter_pages.ts
tags:
  - utils
---

## Description

This plugin allows to filter the pages of your site using a callback.

## Installation

The plugin requires a function that receives the `Page` instance as the first
argument and must return a boolean. If it returns `false`, the page will be
discarded. For example, to remove all pages with the property `ignored=true`:

```js
import lume from "lume/mod.ts";
import filterPages from "lume/plugins/filter_pages.ts";

const site = lume();

site.use(filterPages({
  fn: (page) => page.data.ignored !== true,
}));

export default site;
```
