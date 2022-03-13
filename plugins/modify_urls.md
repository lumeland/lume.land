---
title: Modify URLs
description: Modify all URLs of HTML files with a custom function.
docs: plugins/modify_urls.ts/~/Options
tags:
  - urls
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import modifyUrls from "lume/plugins/modify_urls.ts";

const site = lume();

site.use(modifyUrls({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/modify_urls.ts/~/Options).

## Description

The `modify_urls` plugin modifies all URLs in your HTML documents using a
function. It's used internally by other plugins like
[resolve_urls](resolve_urls.md), [relative_urls](relative_urls.md) and
[base_path](base_path.md) but you can use it to modify the urls using a custom
function.

To use it, just import in the `_config.js` file and create a callback to change
the url. For example, let's say we want to convert all urls to lowercase:

```js
import lume from "lume/mod.ts";
import modifyUrls from "lume/plugins/modify_urls.ts";

const site = lume();

site.use(modifyUrls({
  fn: (url) => url.toLowerCase();
}));

export default site;
```

The plugin will search all urls in your HTML documents (elements with `href`,
`src`, `srcset` and `imagesrcset` attributes) and invoke the callback for every
url found. The callback has two arguments: the url and the `Page` instance where
that url was found.
