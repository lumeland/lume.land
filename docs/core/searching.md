---
title: Search and paginate
description: Using the search and paginate helper to create dynamic pages.
order: 8
---

${toc}

The variables `search` and `paginate` are global functions that allows to search
other pages and paginate the result.

## Searching pages

The function `search.pages()` returns an array of pages that you can filter and
sort. For example, to search pages having the variable `category` set to
`music`, use the following code:

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

You can combine the `search` helper with `paginate` helper to group the result
under different pages. For example:

```js
export const layout = "layouts/post-list.njk";

export default function* ({ search, paginate }) {
  const musicPages = search.pages("category=music");
  const pagination = paginate(musicPages);

  for (const page of pagination)) {
    yield page;
  }
}
```

[Go to the Paginate plugin documentation](../../plugins/paginate.md) to see more
info and available configuration.
