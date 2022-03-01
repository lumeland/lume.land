---
title: Base path
description: Add automatically a base path to all urls
tags:
  - urls
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";

const site = lume();

site.use(basePath());

export default site;
```

## Description

The `base_path` plugin fixes all URLs in your HTML documents by prepending the
path of the [location setting](../docs/configuration/config-file.md#location).
It's useful if your site is hosted in a subdirectory.

It will search for any element with the attribute `href`, `src`, `srcset` and
`imagesrcset` in your html pages and fix automatically the urls. Note that the
plugin only works with html pages, it won't fix css or JavaScript files.

## Example

Let's say we have configured the location of the website to
`https://my-site.com/blog/`. This means that all path urls should be inside
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
