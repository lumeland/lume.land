---
title: Prism
description: Code syntax highlighting using Prism
mod: plugins/prism.ts
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

site.use(prism(/* Options */));

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

## Themes

To properly highlight the syntax of your code, you need CSS code compatible with
Prism classes. Prism provides some
[pre-made themes](https://github.com/PrismJS/prism/tree/master/themes) that you
can download automatically with the `theme` option:

```ts
import lume from "lume/mod.ts";
import prism from "lume/plugins/prism.ts";

const site = lume();

site.use(prism({
  theme: {
    name: "funky", // The theme name to download
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
import prism from "lume/plugins/prism.ts";

const site = lume();

site.use(prism({
  theme: {
    name: "funky",
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
import prism from "lume/plugins/prism.ts";

const site = lume();

site.use(prism({
  theme: [
    {
      name: "funky",
      path: "/_includes/css/code_light.css",
    },
    {
      name: "dark",
      path: "/_includes/css/code_dark.css",
    },
  ]
}));

export default site;
```
