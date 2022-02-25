---
title: Pug
description: Using the template engine Pug to create pages and layouts
docs: plugins/pug.ts/~/Options
tags:
  - template_engine
---

[Pug](https://pugjs.org/) is a template engine heavily influenced by Haml. This
format is **disabled by default**, so you have to enable it in the `_config.js`
file:

```js
import pug from "lume/plugins/pug.ts";

site.use(pug());
```

## Creating layouts

Add a file with `.pug` extension in the `_includes` directory. Use the _front
matter_ to set data to the template.

```yml
---
title: Welcome to my page
intro: This is my first post using lume, I hope you like it!
---

doctype html
html
  head
    title= title

  body
    include partials/nav.pug

    p= title
```

Note that the paths passed to `include` are relative to `_includes` directory.

## Creating pages

Creating pages is the same as creating layouts, just place the `.pug` file
outside the `_includes` directory.
