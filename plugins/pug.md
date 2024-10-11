---
title: Pug
description: Use the Pug template engine to create pages and layouts
mod: plugins/pug.ts
tags:
  - template_engine
---

## Description

[Pug](https://pugjs.org/) is a template engine heavily influenced by Haml. This
plugin allows you to use it to create pages and layouts.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import pug from "lume/plugins/pug.ts";

const site = lume();

site.use(pug(/* Options */));

export default site;
```

## Creating layouts

Add a file with `.pug` extension in the `_includes` directory. Use the _front
matter_ to set data for the template.

```yml
---
title: Welcome to my page
intro: This is my first post using Lume. I hope you like it!
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

Creating pages is the same as creating layouts; just place the `.pug` file
outside the `_includes` directory.
