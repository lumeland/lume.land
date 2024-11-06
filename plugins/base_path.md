---
title: Base path
description: Automatically add a base path to all urls
mod: plugins/base_path.ts
tags:
  - urls
---

## Description

The `base_path` plugin fixes all URLs in your HTML documents by prepending the
path of the [location setting](../docs/configuration/config-file.md#location).
It's useful if your site is hosted in a subdirectory.

It will search for any element with the attribute `href`, `src`, `srcset` and
`imagesrcset` in your html pages and automatically fix the URLs. Note that the
plugin only works with HTML pages, it won't fix CSS or JavaScript files.

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

Prepending the `/blog/` prefix:

```html
<a href="/blog/articles/my-second-article/">Go to the second article</a>
```

## Modify URLs inside CSS files

By default, the plugin only checks HTML pages. You can use the `extensions`
option to extend it to `.css` files.

```js
site.use(basePath({
  extensions: [".html", ".css"], // Fix URLs inside HTML and CSS files
}));
```
