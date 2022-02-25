---
title: Inline
description: Using the inline plugin to inline sources
docs: plugins/inline.ts/~/Options
tags:
  - html
---

This plugin allows to inline some sources, like CSS, images or JavaScript, in
the HTML automatically. It is **disabled by default**, so you have to enable it
in the `_config.js` file:

```js
import inline from "lume/plugins/inline.ts";

site.use(inline());
```

Now, any HTML tag with the `inline` attribute will be included in the HTML. For
example:

```html
<link rel="stylesheet" href="css/my-styles.css" inline>

<script src="js/my-scripts.js" inline></script>

<img src="img/avatar.png" inline>

<img src="img/logo.svg" inline>
```

It's converted to:

```html
<style>
  /* Content of the CSS file */
</style>

<script>
  // Content of the js file
</script>

<img src="data:image/png;base64,...">

<svg>...</svg>
```

Note that bitmap images will be inlined as base64 data but svg images are
replaced by the `<svg>` elements itself. The source file must be in the `dest`
directory (usually `_site`), there's no support for external URLs yet.
