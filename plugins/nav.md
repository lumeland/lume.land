---
title: Nav
description: Provide a helper to build menus and breadcrumbs.
mod: plugins/nav.ts
enabled: false
tags:
  - nav
---

## Description

This plugin registers the `nav` helper to build navigation stuff like menus and
breadcrumbs in your pages.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import nav from "lume/plugins/nav.ts";

const site = lume();

site.use(nav(/* Options */));

export default site;
```

## Menu

The function `nav.menu()` returns a tree object with the complete site structure
using the pages' URLs to define the hierarchy. For example, let's say our site
exports the following pages:

- `/`
- `/articles/`
- `/articles/first-article/`
- `/articles/second-article/chapter-1/`
- `/articles/second-article/chapter-2/`

The object returned by `nav.menu()` would be like this:

```js
{
  data: { basename: "", ...Data },
  children: [
    {
      data: { basename: "articles", ...Data },
      children: [
        {
          data: { basename: "first-article", ...Data },
        },
        {
          data: { basename: "second-article" },
          children: [
            {
              data: { basename: "chapter-1", ...Data },
            },
            {
              data: { basename: "chapter-2", ...Data },
            },
          ],
        },
      ],
    },
  ];
}
```

Some interesting things:

- The `data` property contains the page data object. So you can access to any
  page variable like `data.title` or `data.url`.
- The item with the basename `second-article` doesn't have more data because
  there isn't any page with the url `/articles/second-article/`. Note that there
  are pages inside this url (`/articles/second-page/chapter-1/` and
  `/articles/second-page/chapter-2/`) that do have the `data` value.

You can use this object in your templates to build a menu recursively. For
example in Vento:

<lume-code>

```vento{title="menu.vto"}
<ul class="menu">
  {{ for item of nav.menu().children }}
    <li>
      {{ include "templates/menu_item.vto" { item } }}
    </li>
  {{ /for }}
</ul>
```

```vento{title="menu_item.vto"}
{{ if item.data.url }}
  <a href="{{ item.data.url }}">
    {{ item.data.title }}
  </a>
{{ else }}
  <span>{{ item.data.basename }}</span>
{{ /if }}

<ul>
  {{ for child of item.children }}
  <li>
    {{ include "templates/menu_item.vto" { item: child } }}
  </li>
  {{ /for }}
</ul>
```

</lume-code>

### Change the initial URL

If you want to start your menu from a specific page, just include it's url in
the first argument:

```js
nav.menu("/articles/");
```

### Filtering and sorting

You can filter and sort the elements of the menu in the same way as the
[Search](./search.md) plugin. For example, let's build a menu with the english
pages, sorted by URL:

```js
nav.menu("/", "lang=en", "url=asc");
```

### Export to JSON

The menu can be exported to JSON, useful to work with it in the frontend:

```js
const menu = nav.menu();
JSON.stringify(menu);
```

### Next and previous pages

Use the functions `nav.nextPage()` and `nav.previousPage()` to return the next
and previous page of the menu relative to the current page.

For example, let's say we have the following tree structure created with
`nav.menu()`:

```txt
docs
  |__ getting-started
        |__ installation
        |__ configuration
  |__ plugins
        |__ prettier
```

The function `nav.nextPage()` returns the next page relative to the provided
URL. For example:

```js
const nextPage = nav.nextPage("/docs/getting-started/installation/");
console.log(nextPage.url); // /docs/getting-started/configuration/
```

If the page is the last sibling of the current section, it returns the first
page of the next section:

```js
const nextPage = nav.nextPage("/docs/getting-started/configuration/");
console.log(nextPage.url); // /docs/plugins/
```

If the current section has children, it returns the first child:

```js
const nextPage = nav.nextPage("/docs/plugins/");
console.log(nextPage.url); // /docs/plugins/prettier/
```

The `nav.previousPage()` works similarly but in reverse order.

The first argument of these functions is the URL you want to use as current.
Next arguments are the same as `nav.menu()`, so you can configure the base path,
query and sort options to match the menu:

```js
nav.menu("/", "lang=en", "url=asc");

nav.nextPage(url, "/", "lang=en", "url=asc");
nav.previousPage(url, "/", "lang=en", "url=asc");
```

## Breadcrumbs

The function `nav.breadcrumb()` returns an array of the parent items until the
root. For example, the page `/articles/second-article/chapter-2/` returns the
following breadcrumb data:

```js
[
  {
    slug: "chapter-2",
    data: Data,
  },
  {
    slug: "second-article",
    children: [...],
  },
  {
    slug: "articles",
    data: Data,
    children: [...],
  },
  {
    slug: "",
    data: Data,
    children: [...],
  }
]
```

We can use this data to generate the breadcrumb with the following Vento code:

```vento
<ul>
  {{ for item of nav.breadcrumb("/articles/second-article/chapter-2") }}
  <li>
    {{ if item.data }}
      <a href="{{ item.data.url }}">
        {{ item.data.title }}
      </a>
    {{ else }}
      <span>{{ item.slug }}</span>
    {{ /if }}
  </li>
  {{ /for }}
</ul>
```
