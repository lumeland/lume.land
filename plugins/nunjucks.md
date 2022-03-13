---
title: Nunjucks
description: Use the template engine Nunjucks to create pages and layouts.
docs: plugins/nunjucks.ts/~/Options
enabled: true
tags:
  - template_engine
---

${toc}

## Installation

This plugin is installed by default. 🎉

## Description

[Nunjucks](https://mozilla.github.io/nunjucks/) is powerful template language
created by Mozilla and inspired by **ninja2**. This plugins allows to use it to
create pages and layouts.

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file. See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/nunjucks.ts/~/Options).

For example, let's
[configure nunjucks](https://mozilla.github.io/nunjucks/api.html#configure) and
change the default folder of the `_includes`:

```ts
// Nunjucks plugin configuration
const nunjucks = {
  includes: "_layouts",
  options: {
    throwOnUndefined: true,
  },
};

// Apply the plugin config
const site = lume({}, { nunjucks });
```

Now, Lume will search the `.njk` templates in the directory `_layouts` instead
of `_includes`.

## Creating layouts

Add a file with `.njk` extension in the `_includes` directory. Use the _front
matter_ to set data to the template.

```html
---
title: Welcome to my page
intro: This is my first post using lume, I hope you like it!
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

Creating pages is the same as creating layouts, just place the `.njk` file
outside the `_includes` directory.

## njk filter

The Nunjucks plugin also register the `njk` filter, to render any string value
as a Nunjucks template and output a HTML. The filter accepts an object with
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
