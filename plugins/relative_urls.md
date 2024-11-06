---
title: Relative URLs
description: Convert all URLs to relative.
mod: plugins/relative_urls.ts
tags:
  - urls
---

## Description

The `relative_urls` plugin converts all URLs in your HTML documents to relative,
so you can publish the same site under different domains, subdirectories, or
even protocols (like opening the site from the filesystem under `file://`).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import relativeUrls from "lume/plugins/relative_urls.ts";

const site = lume();

site.use(relativeUrls());

export default site;
```

## Example

The plugin converts all internal URLs of your site to relative URLs. For
example:

<lume-code>

```html {title="Input"}
<!-- /articles/my-first-article/ -->
<a href="/articles/my-second-article/">Go to the second article</a>
```

```html {title="Output"}
<!-- /articles/my-first-article/ -->
<a href="../my-second-article/">Go to the second article</a>
```

</lume-code>

This plugin changes not only the `<a>` elements, but any element with the `href`
attribute (`link`, `area`) or `src` (`img`, `video`, `audio`, etc).

## Modify URLs inside CSS files

By default, the plugin only checks HTML pages. You can use the `extensions`
option to extend it to `.css` files.

```js
site.use(relativeUrls({
  extensions: [".html", ".css"], // Fix URLs inside HTML and CSS files
}));
```
