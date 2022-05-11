---
title: Eta
description: Use the template engine Eta to build pages.
docs: plugins/eta.ts/~/Options
tags:
  - template_engine
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import eta from "lume/plugins/eta.ts";

const site = lume();

site.use(eta({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/eta.ts/~/Options).

## Description

[Eta](https://eta.js.org/) is a JavaScript template engine with a syntax very
similar to EJS but with
[some differences](https://eta.js.org/docs/about/eta-vs-ejs). This plugin allows
to use this template engine to create pages and layouts.

## Creating layouts

Add a file with `.eta` extension in the `_includes` directory. Use the `layout`
page variable to use this layout.

```html
---
title: Welcome to my page
intro: This is my first post using lume, I hope you like it!
---

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
