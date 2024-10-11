---
title: Nunjucks
description: Use the Nunjucks template engine to create pages and layouts.
mod: plugins/nunjucks.ts
enabled: false
tags:
  - template_engine
---

## Description

[Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful template language
created by Mozilla and inspired by **ninja2**. This plugin allows you to use it
to create pages and layouts.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";

const site = lume();

site.use(nunjucks(/* Options */));

export default site;
```

## Creating layouts

Add a file with `.njk` extension in the `_includes` directory. Use the _front
matter_ to set data to the template.

```html
--- title: Welcome to my page intro: This is my first post using Lume. I hope
you like it! ---

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

Creating pages is the same as creating layouts; just place the `.njk` file
outside the `_includes` directory.

## njk filter

The Nunjucks plugin also registers the `njk` filter, to render any string value
as a Nunjucks template and output it as HTML. The filter accepts an object with
data.

```html
---
data:
  username: Oscar
text: "Hello {{ username }}"
---

<!-- Render a string -->
<div>{{ text | njk(data) | safe }}<div>
```

## Hooks

This plugin exposes the following hooks:

- `addNunjucksPlugin(name, fn)` To add additional plugins.

## Configure VSCode

You can use the
[Nunjucks extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks)
for syntax highlight and some useful snippets.

## Async mode

Lume file loader is asynchronous, meaning that files imported by Nunjucks must
use the async API (`asyncEach` instead of `for` etc). For example, the following
code won't work:

```html
{% if includeHeader %} {% include "header.njk" %} {% endif %}
```

You have to use the async mode:

```html
{% ifAsync includeHeader %} {% include "header.njk" %} {% endif %}
```

More info about
[Asynchronous support for Nunjucks](https://mozilla.github.io/nunjucks/api.html#asynchronous-support)
