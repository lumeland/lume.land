---
title: Sitemap
description: Generate a sitemap automatically for your site
mod: plugins/sitemap.ts
tags:
  - nav
  - utils
---

## Description

This plugin generates a `sitemap.xml` file automatically with all your pages,
which is
[useful for SEO](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
See the
[Sitemaps XML format specification](https://www.sitemaps.org/protocol.html) for
more info.

It also creates a `robots.txt` file that include a link to the sitemap file, so
it's easier to discover for the search engines.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sitemap from "lume/plugins/sitemap.ts";

const site = lume();

site.use(sitemap(/* Options */));

export default site;
```

## Configuration

Internally, this plugin uses [Search](./search.md) to search and return the
pages. By default, all pages are included in the sitemap (except the 404 page)
and sorted by URL. You can setup a different configuration:

```js
site.use(sitemap({
  filename: "my-sitemap.xml", // to change the sitemap filename
  query: "indexable=true", // Select only pages with the indexable attribute as true
  sort: "date=desc", // To sort by data in ascendent order
}));
```

To define the URL, it uses the location defined in the
[config file](../docs/configuration/config-file.md#location).

### lastmod value

By default, the plugin uses the value of the `date` variable for `lastmod`. This
variable can mean anything, but it is not necessarily the last modification
date. If you want to use the last modification time of the page file, you can
create a preprocessor like this:

```js
// Create the lastmod variable with the mtime of the file
site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    const info = page.src.entry?.getInfo();
    page.data.lastmod = info?.mtime;
  }
});

// Configure the plugin to use the variable
site.use(sitemap({
  lastmod: "lastmod",
}));
```

> [!note]
>
> `mtime` is not a reliable value. In some CI environments, it's the present
> time (the moment where the file is created after cloning the repo, instead of
> when this file content was modified for the last time). Alternatively, you can
> use [Git Last Updated](../docs/creating-pages/page-data.md#date) value, but it
> doesn't work for CI like GitHub Actions, because the repository is cloned
> without the history (only the last commit).

## Multilanguage

It's possible generate sitemaps for sites with multiple languages using the
[multilanguage](./multilanguage.md) plugin:

```js
import lume from "lume/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import sitemap from "lume/plugins/sitemap.ts";

const site = lume();

site.use(multilanguage({
  languages: ["en", "gl", "es"],
}));
site.use(sitemap(/* Options */));

export default site;
```
