---
title: Liquid
description: Use the Liquid template engine to create pages and layouts
mod: plugins/liquid.ts
tags:
  - template_engine
---

## Description

[Liquid](https://liquidjs.com/) is a simple, expressive, and safe template
engine. This plugin allows you to use it to create pages and layouts.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import liquid from "lume/plugins/liquid.ts";

const site = lume();

site.use(liquid(/* Options */));

export default site;
```

## Creating layouts

Add a file with `.liquid` extension in the `_includes` directory. Use the _front
matter_ to set data for the template.

```html
---
title: Welcome to my page
intro: This is my first post using Lume. I hope you like it!
---

<html>
  <head>
    <title>{{ title }}</title>
  </head>

  <body>
    <p>{{ intro }}</p>
  </body>
</html>
```

## Creating pages

Creating pages is the same as creating layouts; just place the `.liquid` file
outside the `_includes` directory.

## `liquid` filter

The Liquid plugin also registers the `liquid` filter, to render any string value
as a Liquid template and output HTML. The filter accepts an object with data.

```html
---
data:
  username: Oscar
text: "Hello {{ username }}"
---

<!-- Render a string -->
<div>{{ text | liquid: data }}<div>
```

## Configure VSCode

You can use the
[Liquid extension for VS Code](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid)
for syntax highlight and some useful snippets.
