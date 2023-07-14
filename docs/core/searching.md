---
title: Search and paginate
description: Using the search and paginate helper to create dynamic pages.
order: 8
---

The variables `search` and `paginate` are global functions that allow searching
other pages and paginating the result.

## Searching pages

The function `search.pages()` returns an array of pages you can filter and sort.
For example, to search pages having the variable `category` set to `music`, use
the following code:

```html
<ul>
  {% for page in search.pages("category=music") %}
  <li>{{ page.data.title }}</li>
  {% endfor %}
</ul>
```

Each `page` is an object with all info related with this page. The property
`data` contains all data assigned to this page (like variables in the front
matter, or in the _data.* files). In the example above, we use the title of
every page to build the list.

The `search` helper is very powerful and has more interesting features.
[Go to the Search plugin documentation](../../plugins/search.md) for more info.

## Pagination

In Lume [you can create multiple pages using a generator](./multiple-pages.md).
Pagination is basically the same thing: the creation of multiple pages using the
result of a search.

Let's say we want to paginate some pages in groups of 10 elements. We could do
it manually with a generator:

```js
export default function* ({ search }) {
  // Select the pages
  const pages = search.pages("category=music");
  const totalResults = pages.length;

  let currentPage = 1;

  while (pages.length) {
    // Generate a page for each 10 results
    const results = pages.splice(0, 10);

    yield {
      layout: "layouts/post-list.njk",
      url: `/music/page-${currentPage}/`,
      results,
      pagination: {
        currentPage,
        totalResults,
      },
    };

    // Increase the page number
    ++currentPage;
  }
}
```

In this example we have selected all pages to generate a page for each 10
results with the urls `/music/page-1/`, `/music/page-2/`, `/music/page-3/`, etc.
Every page uses the layout `layouts/post-list.njk` that will receive, among
others, the variables `results` (with the array of results to show in this page)
and `pagination` (with some interesting info like the current page number or the
total results).

[The Paginate plugin](../../plugins/paginate.md) (enabled by default in Lume),
exposes the `paginate` helper to ease this process. The previous example can be
done in this simpler way:

```js
export const layout = "layouts/post-list.njk";

export default function* ({ search, paginate }) {
  const musicPages = search.pages("category=music");

  for (const page of paginate(musicPages))) {
    yield page;
  }
}
```

[Go to the paginate plugin documentation](../../plugins/paginate.md) for more
info.
