---
title: Attributes
description: Provide helpers to manage attributes and class names of HTML elements
tags:
  - utils
---

## Description

Use the `attributes` plugin to register two template filters to normalize the
attributes of your HTML:

### attr

Provide a convenient way to work with HTML attributes.

<lume-code>

```yml { title=".vto" }
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

<a {{ link | attr | safe }}>Hello</a>
```

```js { title=".page.js" }
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

```yml { title=".vto" }
---
styles:
  - btn
  - btn-primary
---

<a class="{{ styles |> class }}">Hello</a>
```

```js { title=".page.js" }
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
