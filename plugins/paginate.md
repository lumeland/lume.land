---
title: Paginate
description: Provide a helper to paginate results.
mod: plugins/paginate.ts
enabled: true
tags:
  - nav
---

## Description

This plugin registers the `paginate` helper to create pages using an array of
results. This is useful when combined with the `search` helper to create
paginated results. For example:

```js
export const layout = "layouts/post-list.vto";

export default function* ({ search, paginate }) {
  const posts = search.pages("posts");
  const options = {
    url: (n) => `/posts/page/${n}/`,
    size: 10,
  };

  for (const page of paginate(posts, options)) {
    yield page;
  }
}
```

As you can see, the `paginate` helper accepts two arguments: an iterable and an
object with the options. The available options are:

| Name   | Default              | Description                                                                                |
| ------ | -------------------- | ------------------------------------------------------------------------------------------ |
| `size` | `10`                 | Number of elements per page                                                                |
| `url`  | `(n) => ./page-${n}` | The function to generate the URL of each page. It receives the page number as an argument. |

This helper returns an array. Each item has the following values:

```js
for (const page of paginate(posts, options)) {
  page.url;        // URL of the page, for example "post/page/1"
  page.results;    // Array with the results of this page

  // Pagination info:
  page.pagination.page;         // The current page
  page.pagination.totalPages;   // Total pages
  page.pagination.totalResults; // Total results
  page.pagination.previous;     // The URL of the previous page
  page.pagination.next;         // The URL of the next page

  yield page;
}
```

## Installation

This plugin is installed by default. 🎉

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file.

```ts
import lume from "lume/mod.ts";

// Paginate plugin configuration
const paginate = {/* your config here */};

// Apply the plugin config
const site = lume({}, { paginate });
```
