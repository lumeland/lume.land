---
title: Base path
description: Automatically add a base path to all urls
tags:
  - urls
---

## Description

The `base_path` plugin fixes all absolute paths in the HTML and CSS files by
prepending the pathname of the
[location setting](../docs/configuration/config-file.md#location). It's useful
if your site is hosted in a subdirectory.

The plugin searches for any element with the attribute `href`, `src`, `srcset`
and `imagesrcset` in the HTML pages and automatically fix the URLs. For CSS
files, it fixes all `@import` and `url()` with URLs to local files.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";

const site = lume();

site.use(basePath());

export default site;
```

## Example

Let's say we have configured the location of the website to
`https://my-site.com/blog/`. This means that all path URLs should be inside
`/blog/` directory.

```js
import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";

const site = lume({
  location: new URL("https://my-site.com/blog/"), // ← Note the path /blog/
});

site.use(basePath());
```

This plugin will fix all absolute paths like this:

```html
<a href="/articles/my-second-article/">Go to the second article</a>
```

or this CSS file:

```css
a {
  background-image: url("/images/link.png");
}
```

Prepending the `/blog/` prefix:

```html
<a href="/blog/articles/my-second-article/">Go to the second article</a>
```

```css
a {
  background-image: url("/blog/images/link.png");
}
```
