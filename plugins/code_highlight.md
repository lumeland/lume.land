---
title: Code Highlight
description: Code syntax highlighting using highlight.js
mod: plugins/code_highlight.ts
tags:
  - html
---

## Description

This plugin uses the [highlight.js](https://highlightjs.org/) library to search
and highlight the code syntax in any `<pre><code>` element.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.use(codeHighlight(/* Options */));

export default site;
```

## Languages

`Highlight.js` supports many languages by default. You can see
[a list of supported languages](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md).
You can (and probably should) use the `languages` option key to register only
the languages you need:

```js
import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";

// import your preferred language
import lang_javascript from "npm:highlight.js/lib/languages/javascript";
import lang_bash from "npm:highlight.js/lib/languages/bash";

const site = lume();

site.use(
  codeHighlight({
    languages: {
      javascript: lang_javascript,
      bash: lang_bash,
    },
  }),
);

export default site;
```

## Themes

To properly highlight the syntax of your code, you need CSS code compatible with
Highlight.js classes. This library provides some
[pre-made themes](https://highlightjs.org/examples) that you can download
automatically using the `theme` option:

```ts
import lume from "lume/mod.ts";
import highlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.use(codeHighlight({
  theme: {
    name: "atom-one-dark", // The theme name to download
    cssFile: "/styles.css", // The destination filename
    placeholder: "/* insert-theme-here */", // Optional placeholder to replace with the theme code
  },
}));

export default site;
```

If you want to use multiple themes (for example for dark and light mode), you
can provide an array of themes:

```ts{title="_config.ts"}
import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.use(codeHighlight({
  theme: [
    {
      name: "atom-one-light",
      cssFile: "/styles.css",
      placeholder: "/* light-theme-here */"
    },
    {
      name: "atom-one-dark",
      cssFile: "/styles.css",
      placeholder: "/* dark-theme-here */"
    },
  ]
}));

export default site;
```
