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

Prism by default load the default languages `markup`, `css`, `clike` and
`javascript`. You can load
[more languages](https://prismjs.com/#supported-languages) in this way:

```ts
import lume from "lume/mod.ts";
import prism from "lume/plugins/prism.ts";

// Additional prism languages
import "npm:prismjs@1.29.0/components/prism-less.js";
import "npm:prismjs@1.29.0/components/prism-git.js";

const site = lume();
site.use(prism());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/prism.ts/~/Options).
