---
title: Sitemap
description: Generate a sitemap automatically for your site
docs: plugins/sitemap.ts/~/Options
tags:
  - utils
---

## Description

This plugin generates a `sitemap.xml` file automatically with all your pages,
which is
[useful for SEO](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
It also creates a `robots.txt` file that include a link to the sitemap file, so
it's easier to discover for the search engines.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sitemap from "lume/plugins/sitemap.ts";

const site = lume();

site.use(sitemap());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/sitemap.ts/~/Options).

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
