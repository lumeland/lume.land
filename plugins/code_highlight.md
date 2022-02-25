---
title: Code Highlight
description: Syntax highlighting
docs: plugins/code_highlight.ts/~/Options
tags:
  - html
---

This plugin uses the [highlight.js](https://highlightjs.org/) library to search
and highlight the syntax code of any `<pre><code>` element. **It is disabled by
default** so to enable it you have to import and use it in the `_config.js`
file:

```js
import codeHighlight from "lume/plugins/code_highlight.ts";

site.use(codeHighlight());
```

See the
[highlight.js docs](https://highlightjs.readthedocs.io/en/latest/api.html#configure)
for available config options. Example:

```js
import codeHighlight from "lume/plugins/code_highlight.ts";

site.use(codeHighlight({
  options: {
    classPrefix: "syntax-",
  },
}));
```
