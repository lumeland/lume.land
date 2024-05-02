---
title: Vento
description: Use the Vento template engine to create pages and layouts.
mod: plugins/vento.ts
enabled: true
tags:
  - template_engine
---

## Description

[Vento](https://vento.js.org/) is a template language created by the same
creator as Lume (Óscar Otero) and inspired by other popular template engines
like Nunjucks, Liquid or Eta. This plugin allows you to use it to create pages
and layouts.

## Installation

This plugin is installed by default. 🎉

## Creating layouts

Add a file with `.vto` extension in the `_includes` directory. Use the _front
matter_ to set data to the template.

```vento
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

Creating pages is the same as creating layouts; just place the `.vto` file
outside the `_includes` directory.

## vto filter

The Vento plugin also registers the `vto` filter, to render any string value as
a Vento template and output it as HTML. The filter accepts an object with data.
For example:

```html
---
data:
  username: Oscar
text: "Hello {{ username }}"
---

<!-- Render a string -->
<div>{{ text |> vto(data) }}<div>
```

## Configure VSCode

You can use the
[Vento extension for VS Code](https://marketplace.visualstudio.com/items?itemName=oscarotero.vento-syntax)
for syntax highlight and some useful snippets.
