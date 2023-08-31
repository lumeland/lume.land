---
title: Nav
description: Provide a helper to build menus and breadcrumbs.
mod: plugins/nav.ts
enabled: false
tags:
  - utils
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
  slug: "",
  data: Data,
  children: [
    {
      slug: "articles",
      data: Data,
      children: [
        {
          slug: "first-article",
          data: Data,
        },
        {
          slug: "second-article",
          children: [
            {
              slug: "chapter-1",
              data: Data,
            },
            {
              slug: "chapter-2",
              data: Data,
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
- The item with the slug `second-article` doesn't have the `data` value because
  there isn't any page with the url `/articles/second-article/`. Note that there
  are pages inside this url (`/articles/second-page/chapter-1/` and
  `/articles/second-page/chapter-2/`) that do have the `data` value.

You can use this object in your templates to build a menu recursively. For
example in Nunjucks:

<lume-code>

```html{title="menu.njk"}
<ul class="menu">
  {% asyncEach item in nav.menu().children %}
    <li>
      {% include "templates/menu_item.njk" %}
    </li>
  {% endeach %}
</ul>
```

```html{title="menu_item.njk"}
{% if item.data %}
  <a href="{{ item.data.url }}">
    {{ item.data.title }}
  </a>
{% else %}
  <span>{{ item.slug }}</span>
{% endif %}

<ul>
  {% asyncEach item in item.children %}
  <li>
    {% include "templates/menu_item.njk" %}
  </li>
  {% endeach %}
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

We can use this data to generate the breadcrumb with the following Nunjucks
code:

```html
<ul>
  {% for item in nav.breadcrumb("/articles/second-article/chapter-2") %}
  <li>
    {% if item.data %}
      <a href="{{ item.data.url }}">
        {{ item.data.title }}
      </a>
    {% else %}
      <span>{{ item.slug }}</span>
    {% endif %}
  </li>
  {% endfor %}
</ul>
```
