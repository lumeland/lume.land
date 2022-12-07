---
title: Windi CSS
description: Use the Windi framework to create the CSS styles.
docs: plugins/windi_css.ts/~/Options
tags:
  - styles
---

## Description

This plugin allows using the [Windi CSS](https://windicss.org/) utility-first
CSS framework, compatible with Tailwind.

It analyzes the HTML code of the pages, searching for Windi classes and
generating the CSS code needed. It also loads `.windi.css` files, processes
them, and outputs CSS files.

It can also transform Windi code embedded in the HTML using
`<style lang="windi">...</style>` elements.

<lume-code>

```html{title=hello.njk}
---
layout: layout.njk
---
<h1 class="bg-purple-500">Hello world</h1>

<a href="/" class="btn">Go to home</a>

<style lang="windi">
body {
  @apply bg-red-500 text-white;
}
</style>
```

```css{title=styles.windi.css}
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 hover:bg-blue-700 text-white;
  padding-top: 1rem;
}
```

</lume-code>

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import windi from "lume/plugins/windi_css.ts";

const site = lume();

site.use(windi());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/windi_css.ts/~/Options).

## Configuration

This plugin accepts a configuration object with the available options:

- `config`: Configuration object for Windi CSS where you can define themes,
  shortcuts, plugins, etc. See the
  [Windi docs for more info](https://windicss.org/guide/configuration.html)
- `cssFile`: Set the name of the file to export the CSS code. If it's not
  defined, the CSS is inserted in a `<style>` tag for each page.
- `minify`: Set `true` to minify the CSS code.
- `mode`: It can be "interpret" or "compile". See
  [Interpret vs Compile](https://windicss.org/posts/modes.html) for more info.
