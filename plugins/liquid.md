---
title: Liquid
description: Using the template engine Liquid to create pages and layouts
docs: plugins/liquid.ts/~/Options
tags:
  - template_engine
---

[Liquid](https://liquidjs.com/) is a simple, expressive and safe template
engine. This format is **disabled by default**, so you have to enable it in the
`_config.js` file:

```js
import liquid from "lume/plugins/liquid.ts";

site.use(liquid());
```

## Creating layouts

Add a file with `.liquid` extension in the `_includes` directory. Use the _front
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

Creating pages is the same as creating layouts, just place the `.liquid` file
outside the `_includes` directory.

## `liquid` filter

The Liquid plugin also register the `liquid` filter, to render any string value
as a Liquid template and output a HTML. The filter accepts an object with data.

```html
---
data:
  username: Oscar
text: "Hello {{ username }}"
---

<!-- Render a string -->
<div>{{ text | liquid: data }}<div>
```

## Configuration

This plugin accepts a configuration object. The available options are:

- `extensions`: Array with the extensions of the files that this plugin will
  load. By default is `[".liquid"]`.
- `includes`: To configure a different directory to search for the layouts and
  templates. By default is `_includes`.
- `options`: A object with options to configure Liquid. See
  [LiquidOptions](https://liquidjs.com/api/interfaces/liquid_options_.liquidoptions.html)
  for more info.
