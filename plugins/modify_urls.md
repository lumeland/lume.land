---
title: Modify URLs
description: Modify all URLs of HTML files with a custom function.
mod: plugins/modify_urls.ts
tags:
  - urls
---

## Description

The `modify_urls` plugin modifies all URLs in your HTML & CSS documents using a
function. It's used internally by other plugins like
[resolve_urls](resolve_urls.md), [relative_urls](relative_urls.md) and
[base_path](base_path.md), but you can use it to modify URLs using a custom
function.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import modifyUrls from "lume/plugins/modify_urls.ts";

const site = lume();

site.use(modifyUrls(/* Options */));

export default site;
```

## Example

To use it, just import the plugin in the `_config.js` file and create a callback
to change the url. For example, let's say we want to convert all URLs to
lowercase:

```js
import lume from "lume/mod.ts";
import modifyUrls from "lume/plugins/modify_urls.ts";

const site = lume();

site.use(modifyUrls({
  fn: (url) => url.toLowerCase(),
}));

export default site;
```

The plugin will search all URLs in your HTML documents (elements with `href`,
`src`, `srcset`, and `imagesrcset` attributes) and invoke the callback for every
URL found. The callback has two arguments: the URL and the `Page` instance where
that URL was found.

## Modify URLs inside CSS files

By default, the plugin only checks HTML pages. You can use the `extensions`
option to extend it to `.css` files.

```js
site.use(modifyUrls({
  extensions: [".html", ".css"], // Modify URLs inside HTML and CSS files
  fn: (url) => url.toLowerCase(),
}));
```

> [!important]
>
> Keep in mind that Lume only processes files that are loaded. To transform CSS
> files they must be loaded before. If you're using any styling plugin like
> [`postcss`](./postcss.md), [`lightningcss`](./lightningcss.md), or
> [`sass`](./sass.md), you don't need to do anything. But if you are copying the
> css files with `site.copy([".css"])` or `site.copy("/styles")` they won't be
> processed. To fix it, you have to use `site.loadAssets([".css"])`.
