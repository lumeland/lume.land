---
title: Render order
description: Configure the rendering order of pages
order: 9
related:
  - /docs/core/multiple-pages/
  - /docs/core/searching/
---

In Lume, all pages are rendered at the same time. This works well in most cases,
but sometimes you want to make sure a page is rendered before or after others.
The most typical example is with auto-generated pages. Let's say you have a page
that generates multiple pages dynamically using data from an external API:

```js
export const layout = "layouts/api.vto";

const response = await fetch("https://my-api.com/data.json");
const data = await response.json();

export default function* () {
  for (const item of data.items) {
    yield {
      url: `item-${item.id}`,
      title: item.title,
      type: "api",
      content: item.text,
    };
  }
}
```

This script will generate one page for every item returned by the api. Note that
we have added the variable `type` to all pages with the value `"api"`. This will
help us to select these new pages later.

To list and paginate all these auto-generated pages, you may want to create
something like this:

```js
export const layout = "layouts/api-pagination.vto";

export default function* ({ search, paginate }) {
  const items = search.pages("type=api");

  for (const page of paginate(items)) {
    yield page;
  }
}
```

In this script, we are using the [search](../../plugins/search.md) helper to
search all pages with the variable `type=api` and paginate them with the
[paginate](../../plugins/paginate.md) helper. But we have a problem: because all
pages are executed at the same time, it's possible that the `type=api` pages
didn't exist when we went to paginate them, so the pagination won't work. What
we really need is create all dynamic pages **before** paginating them.

To control this, lume has the `renderOrder` variable, to configure the order in
which every page is rendered. By default this value is `0`, so if you change it
to a negative value (like `-1`, `-2` etc) the page will be rendered **before**
the others, and changing it to a positive value (`1`, `2`, etc) will cause the
page to be rendered **after**. So, to fix our example, the solution could be to
change the `renderOrder` of the pagination script to a value greater than 0, for
example, `1`:

```js
export const layout = "layouts/api-pagination.vto";

// Changed this to render this page after the others
export const renderOrder = 1;

export default function* ({ search, paginate }) {
  const items = search.pages("type=api");

  for (const page of paginate(items, { url: (n) => `/page/${n}/`, size: 10 })) {
    yield page;
  }
}
```

This ensures that this script will be run **after** the `type=api` pages are
created. An alternative solution is change the `renderOrder` of the API script
to a negative value, like `-1`.
