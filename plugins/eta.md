---
title: Eta
description: Use the template engine Eta to build pages.
mod: plugins/eta.ts
tags:
  - template_engine
---

## Description

[Eta](https://eta.js.org/) is a JavaScript template engine with a syntax very
similar to EJS. This plugin allows using this template engine to create pages
and layouts.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import eta from "lume/plugins/eta.ts";

const site = lume();

site.use(eta(/* Options */));

export default site;
```

## Creating layouts

Add a file with `.eta` extension in the `_includes` directory. Use the `layout`
page variable to specify this layout.

```html
--- title: Welcome to my page intro: This is my first post using lume, I hope
you like it! ---

<html>
  <head>
    <title><%= title %></title>
  </head>

  <body>
    <%~ await includeFile("partials/nav.eta") %>

    <p><%= title %></p>
  </body>
</html>
```

Note that the paths passed to `includeFile()` function are always relative to
`_includes` directory.

## Creating pages

Creating pages is the same as creating layouts, just place the `.eta` file
outside the `_includes` directory.

## Configure VSCode

You can use the
[Eta extension for VS Code](https://marketplace.visualstudio.com/items?itemName=shadowtime2000.eta-vscode)
for syntax highlight and some useful snippets.
