---
title: SRI
description: Use SRI to load securely assets loaded from a external CDN.
mod: plugins/sri.ts
tags:
  - utils
---

## Description

<abbr>SRI</abbr> (Subresource Integrity) is a browser feature to protect your
site and your users from compromised code loaded from external CDN. It verifies
the code loaded by the browser is exactly the same code that you got during the
build process, without unexpected manipulations. You can
[learn more about SRI in the MDN article](https://developer.mozilla.org/en-US/blog/securing-cdn-using-sri-why-how/).

The plugin searches for `<script>` and `<link rel="stylesheet">` elements in
your pages that load resources from other domains and add the `integrity` and
`crossorigin` attributes automatically. For example, if you have this code:

```html
<script src="https://code.jquery.com/jquery-3.7.0.slim.min.js"></script>
```

The plugin outputs the following:

```html
<script
  src="https://code.jquery.com/jquery-3.7.0.slim.min.js"
  integrity="sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE="
  crossorigin="anonymous"
></script>
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sri from "lume/plugins/sri.ts";

const site = lume();

site.use(sri(/* Options */));

export default site;
```

> [!note]
>
> Note that SRI only works with URLs that always return the same code, so you
> must use URLs that are guaranteed never to change. Learn
> [how to use SRI with jsDelivr](https://www.jsdelivr.com/using-sri-with-dynamic-files).
