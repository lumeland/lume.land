---
title: Nunjucks
description: Use the Nunjucks template engine to create pages and layouts.
mod: plugins/nunjucks.ts
enabled: true
tags:
  - template_engine
---

## Description

[Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful template language
created by Mozilla and inspired by **ninja2**. This plugin allows you to use it
to create pages and layouts.

## Installation

This plugin is installed by default. 🎉

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file.

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
