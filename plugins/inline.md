---
title: Inline
description: Inline CSS, JavaScript, SVG and images in the HTML.
docs: plugins/inline.ts/~/Options
tags:
  - html
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import inline from "lume/plugins/inline.ts";

const site = lume();

site.use(inline({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/inline.ts/~/Options).

## Description

This plugin allows to inline some sources, like CSS, images or JavaScript, in
the HTML automatically. Any HTML tag with the `inline` attribute will be
included in the HTML. For example:

<lume-code>

```html {title="Input"}
<link rel="stylesheet" href="/css/my-styles.css" inline>

<script src="/js/my-scripts.js" inline></script>

<img src="/img/avatar.png" inline>

<img src="/img/logo.svg" inline>
```

```html {title="Output"}
<style>
  /* Content of /css/my-styles.css */
</style>

<script>
  // Content of /js/my-scripts.js
</script>

<img src="data:image/png;base64,...">

<svg>...</svg>
```

</lume-code>

The source file must be exported to the `dest` directory, there's no support for
external URLs. {.tip}

## SVG inline

Bitmap images (like `.png` or `.jpeg`) are inlined as base64 data but SVG images
are replaced by the `<svg>` element. The new `<svg>` elements will keep the same
`class` and `id` attributes as the replaced `<img>`.

For example, this image:

```html
<img src="icon.svg" class="icon" id="icon-1" inline>
```

Will become to:

```html
<svg width="180px" height="180px" xmlns="http://www.w3.org/2000/svg" class="icon" id="icon-1">
...
</svg>
```
