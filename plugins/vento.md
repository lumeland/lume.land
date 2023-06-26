---
title: Vento
description: Use the Vento template engine to create pages and layouts.
docs: plugins/vento.ts/~/Options
enabled: false
tags:
  - template_engine
---

## Description

[Vento](https://oscarotero.github.io/vento/) is a template language created by
the same creator as Lume (Óscar Otero) and inspired by other popular template
engines like Nunjucks, Liquid or Eta. This plugin allows you to use it to create
pages and layouts.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import vento from "lume/plugins/vento.ts";

const site = lume();

site.use(vento());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/vento.ts/~/Options).

## Creating layouts

Add a file with `.vto` extension in the `_includes` directory. Use the _front
matter_ to set data to the template.

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

Creating pages is the same as creating layouts; just place the `.vto` file
outside the `_includes` directory.
