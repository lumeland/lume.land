---
title: Resolve URLs
description: Resolve all URLs pointing to source files.
tags:
  - urls
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";

const site = lume();

site.use(resolveUrls());

export default site;
```

## Description

The `resolve_urls` plugin converts all URLs in your HTML documents matching with
any file in the `src` folder with the final url.

For example, the following link pointing to a markdown file.

<lume-code>

```html {title="Input"}
Go to <a href="/about-us.md">About us</a>
```

```html {title="Output"}
Go to <a href="/about-us/">About us</a>
```

</lume-code>

If the page `about-us.md` has a different url (because has a
[`url` variable](../creating-pages/urls.md#the-url-variable) in the front
matter), this plugin will use it accordingly. It also works with static files
that change the output directory.

The plugin also resolves relative urls (like `../about-us.md`) and keep any
anchor or search query in the url (for example: `/about-us.md#contact` is
replaced with `/about-us/#contact`).

A very common use case is a repository with documentation content in markdown
files. You may want the links to work in GitHub, but on build the HTML site they
change to the final urls.
