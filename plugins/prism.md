---
title: Prism
description: Code syntax highlighting using Prism
docs: plugins/prism.ts/~/Options
tags:
  - html
---

## Description

This plugin uses the [Prism](https://prismjs.com/) library to search and syntax
highlight the code of any `<pre><code>` element.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import prism from "lume/plugins/prism.ts";

const site = lume();

site.use(prism());

export default site;
```

## Configuration

By default it only load a subset of languanges. You can configure more languages
in this way:

```js
site.use(prism({
  languages: ["md", "js", "css", "rust"], // Load these languages
}));
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/prism.ts/~/Options).
