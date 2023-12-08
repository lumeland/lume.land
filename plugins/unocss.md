---
title: UnoCSS
description: Use the UnoCSS framework to create the CSS styles.
mod: plugins/unocss.ts
tags:
  - styles
---

## Description

This plugin allows using the [UnoCSS](https://unocss.dev/) utility-first CSS
framework, compatible with Tailwind and Windi CSS.

It analyzes the HTML code of the pages, searching for UnoCSS classes and
generating the CSS code needed. It also processes the `.css` files to apply the
[directives transformer](https://unocss.dev/transformers/directives) and
[variant group transformer](https://unocss.dev/transformers/variant-group).

<lume-code>

```vento{title=hello.vto}
---
layout: layout.vto
---
<h1 class="bg-purple-500">Hello world</h1>
</style>
```

```css{title=styles.css}
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 hover:bg-blue-700 text-white;
  padding-top: 1rem;
}
```

</lume-code>

The generated CSS code is output to the `unocss.css` file. You can customize the
filename with the `cssFile` option, or set `false` to inline the code in the
HTML pages using `<style>` elements.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import unocss from "lume/plugins/unocss.ts";

const site = lume();

site.use(unocss(/* Options */));

export default site;
```

## Configuration

This plugin accepts a configuration object with the available options:

<!-- deno-fmt-ignore-start -->

`options` : Configuration object for UnoCSS to define themes, shortcuts, etc.
See the [UnoCSS docs for more info](https://unocss.dev/guide/config-file)

`cssFile` : Set the name of the file to export the CSS code or `false` to insert
the CSS code a `<style>` tag for each page.

`transformers` : An array with all transformers to apply to the CSS files. By
default loads `variantGroup` and `directives`. Set an empty array to disable
this feature. See the
[UnoCSS docs for more info](https://unocss.dev/config/transformers)

`reset` : To apply a reset file. See the
[UnoCSS docs for more info](https://unocss.dev/guide/style-reset). By default
it's disabled.
