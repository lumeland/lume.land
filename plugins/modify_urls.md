---
title: Modify URLs
description: Modify all URLs of HTML files
docs: plugins/modify_urls.ts/~/Options
tags:
  - urls
---

The `modify_urls` plugin modifies all URLs in your HTML documents using a
function. It's used internally by other plugins like
[resolve_urls](resolve_urls.md), [relative_urls](relative_urls.md) and
[base_path](base_path.md) but you can use it to modify the urls in a different
way.

To use it, just import in the `_config.js` file and create a callback to change
the url. For example, let's say we want to convert all urls to lowercase:

```js
import modifyUrls from "lume/plugins/modify_urls.ts";

site.use(modifyUrls({
  fn: (url) => url.toLowerCase();
}));
```

The plugin will search all urls in your HTML documents (elements with `href`,
`src`, `srcset` and `imagesrcset` attributes) and invoke the callback for every
url found. The callback has two arguments: the url and the `Page` instance where
that url was found.
