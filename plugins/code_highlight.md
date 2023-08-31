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

You may need to load the CSS file of the color theme. The simplest way to load a
theme is import it from a CDN in your CSS files. For example:

```css
@import "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css";
```

As an alternative, you can define the CSS file it as a
[remote file](../docs/core/remote-files.md):

```ts
// Define the _includes/css/code.css file as a remote file
site.remoteFile(
  "_includes/css/code.css",
  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css",
);
```

```ts
/* Import the _includes/css/code.css (needs postCSS plugin) */
@import "css/code.css";
```

Test [all available themes](https://highlightjs.org/static/demo/) in the demo
page. {.tip}
