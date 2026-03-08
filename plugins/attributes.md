---
title: Attributes
description: Provide helpers to manage attributes and class names of HTML elements
tags:
  - utils
  - html
---

## Description

Plugin with utils to work with HTML attributes in the templates. It register the
following [filters](../docs/configuration/filters.md):

### attr

Provide a convenient way to work with HTML attributes.

<lume-code>

```yml { title="example.vto" }
---
link:
  title: Go to GitHub
  href: https://github.com
  target: _blank
  noopen: false
  class:
    - link
    - link-external
---

<a {{ link |> attr }}>Hello</a>
```

```js { title="example.page.js" }
const link = {
  title: "Go to GitHub"
  href: "https://github.com"
  target: "_blank"
  noopen: false
  class: ["link", "link-external"]
}

export default function (_, { attr }) {
  return `<a ${ attr(link) }>Hello</a>`;
}
```

</lume-code>

### class

To work with HTML class names:

<lume-code>

```yml { title="example.vto" }
---
styles:
  - btn
  - btn-primary
---

<a class="{{ styles |> class }}">Hello</a>
```

```js { title="example.page.js" }
const styles = [
  "btn",
  "btn-primary",
  { "is-disabled": true },
];

export default function (_, filters) {
  return `<a class="${filters.class(styles)}>Hello</a>`;
}
```

</lume-code>

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";

const site = lume();

site.use(attributes());

export default site;
```
