---
title: Resolve URLs
description: Resolve all URLs pointing to source files
tags:
  - urls
---

The `resolve_urls` plugin converts all URLs in your HTML documents matching with
any file in the `src` folder with the final url. It **is disabled by default**
so to enable it you have to import and use it in the `_config.js` file:

```js
import resolveUrls from "lume/plugins/resolve_urls.ts";

site.use(resolveUrls());
```

For example, the following link is pointing to a markdown file:

```html
Go to <a href="/about-us.md">About us</a>
```

The pluging replaces the markdown file with the final url.

```html
Go to <a href="/about-us/">About us</a>
```

If the page `about-us.md` has a different url (because has a
[`url` variable](../creating-pages/urls.md#the-url-variable) in the front
matter), this plugin will use it accordingly. It also can be used for static
files that change the output directory.

The plugin also resolves relative urls (like `../about-us.md`) and keep any
anchor or search query in the url (for example: `/about-us.md#contact` is
replaced with `/about-us/#contact`).

A very common use case is a repository with documentation content in markdown
files. You may want the links to work in GitHub, but on build the HTML site they
change to the final urls.
