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
`src`, `srcset`, and `imagesrcset` attributes) and CSS files (like `url()`
functions and `@import ...` at-rules) and invoke the callback for every URL
found. The callback has two arguments: the URL and the `Page` instance where
that URL was found. If the URL has found in a HTML document, the element
containing the URL (link, image, etc) is passed as the third argument.
