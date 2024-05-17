---
title: Code Highlight
description: Code syntax highlighting using highlight.js
mod: plugins/code_highlight.ts
tags:
  - html
---

## Description

This plugin uses the [highlight.js](https://highlightjs.org/) library to search
and highlight the syntax code of any `<pre><code>` element.

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

`Highlight.js` has support for several languages by default. You can see
[a list of supported languages](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md).
Use the `languages` key to register additional languages:

```js
import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";

// import your favorite language
import lang_javascript from "npm:highlight.js/lib/languages/javascript";
import lang_bash from "npm:highlight.js/lib/languages/bash";

const site = lume();

site.use(
  code_highlight({
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
automatically with the `theme` option:

```ts
import lume from "lume/mod.ts";
import highlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.use(highlight({
  theme: {
    name: "atom-one-dark", // The theme name to download
    path: "/css/code_theme.css", // The destination filename
  },
}));

site.copy("/css/code_theme.css"); // Copy the css file to dest.

export default site;
```

Internally, the file is downloaded
[as a remote file](../docs/core/remote-files.md). So you have to copy it.

If you're using a CSS plugin like [postcss](./postcss.md) or
[lightningcss](./lightningcss.md), you can define the destination filename to
the _includes folder and import it from your CSS code. For example:

<lume-code>

```ts{title="_config.ts"}
import lume from "lume/mod.ts";
import highlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.use(highlight({
  theme: {
    name: "atom-one-dark",
    path: "/_includes/css/code_theme.css",
  },
}));

export default site;
```

```css{title="styles.css"}
/* Import the file _includes/css/code_theme.css */
@import "css/code_theme.css";
```

</lume-code>

If you want to use different themes (for example for dark and light mode), you
can provide an array of themes:

```ts{title="_config.ts"}
import lume from "lume/mod.ts";
import highlight from "lume/plugins/code_highlight.ts";

const site = lume();

site.use(highlight({
  theme: [
    {
      name: "atom-one-light",
      path: "/_includes/css/code_light.css",
    },
    {
      name: "atom-one-dark",
      path: "/_includes/css/code_dark.css",
    },
  ]
}));

export default site;
```
