---
title: Pug
description: Use the template engine Pug to create pages and layouts
docs: plugins/pug.ts/~/Options
tags:
  - template_engine
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import pug from "lume/plugins/pug.ts";

const site = lume();

site.use(pug({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/pug.ts/~/Options).

## Description

[Pug](https://pugjs.org/) is a template engine heavily influenced by Haml. This
plugin allows to use it to create pages and layouts.

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
