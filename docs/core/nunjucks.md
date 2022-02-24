---
title: Nunjucks
description: Using the template engine Nunjucks for pages and layouts
docs: plugins/nunjucks.ts
order: 5
---

[Nunjucks](https://mozilla.github.io/nunjucks/) is powerful template language
created by Mozilla and inspired by **ninja2**. This format is **enabled by
default** and you can use it to create layouts and pages.

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

## Configure the Nunjucks plugin

In `_config.ts`, the second argument of `lume()` is used to configure the
plugins that are enabled by default (like this!). Use it to configure the
nunjucks plugin.

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
