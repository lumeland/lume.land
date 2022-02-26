---
title: Code Highlight
description: Syntax highlighting
docs: plugins/code_highlight.ts/~/Options
tags:
  - html
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.use(codeHighlight({/* your config here */}));

export default site;
```

To see all configuration options, click in the "See available Options in Deno
Doc" button above.

## Description

This plugin uses the [highlight.js](https://highlightjs.org/) library to search
and highlight the syntax code of any `<pre><code>` element. See the
[highlight.js docs](https://highlightjs.readthedocs.io/en/latest/api.html#configure)
for available config options. Example:

```js
import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.use(codeHighlight({
  options: {
    classPrefix: "syntax-",
  },
}));

export default site;
```