---
title: Attributes
description: To manage attributes and class names of HTML elements
tags:
  - utils
---

This plugin **is disabled by default** so to enable it, you have to edit your
`_config.js` file:

```js
import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";

const site = lume();

site.use(attributes());
```

The `attributes` plugin register two template filters to normalize the
attributes of your HTML. The included filters are:

## attr

Provide a convenient way to work with HTML attributes.

```html
---
link:
  title: Go to GitHub
  href: https://github.com
  target: _blank
---

<a {{ link | attr | safe }}>
```

You can also filter the attributes names:

```html
---
link:
  text: Go to GitHub
  href: https://github.com
  target: _blank
  noopen: true
  class:
    - link
    - link-external
---

<a {{ link | attr('href', 'target', 'noopen', 'class') | safe }}>
  {{ link.text }}
</a>
```

## class

To work with HTML class names:

```html
---
styles:
  - btn
  - btn-primary
---

<a class="{{ styles | class }}">
```

You can use objects to enable/disable classes:

```html
---
styles:
  btn: true
  btn-primary: true
  is-disabled: false
---

<a class="{{ styles | class }}">
```
