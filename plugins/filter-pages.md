---
title: Filter pages
description: To filter pages under a specific condition
category: dev
oldUrl: /plugins/filter_pages/
---

## Description

This plugin allows to filter the pages of your site using a callback.

## Installation

The plugin requires a function that receives the `Page` instance as the first
argument and must return a boolean. If it returns `false`, the page will be
discarded. For example, to remove all pages with the property `ignored=true`:

```js
import lume from "@lumeland/lume";
import filterPages from "@lumeland/plugin-filter-pages";

const site = lume();

site.use(filterPages({
  fn: (page) => page.data.ignored !== true,
}));

export default site;
```
