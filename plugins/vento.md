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

## Components

[Lume's components](../docs/core/components.md) are accessible through the
variable `comp`.

```vento
{{ await comp.button({ content: "Click here" }) }}
```

The `await` keyword is optional, Vento adds it automatically if it's missing:

```vento
{{ comp.button({ content: "Click here" }) }}
```

### comp tag

The `comp` special tag allows to use components similar to JSX. This is useful
for composability:

```vento
{{ comp button }}Click here{{ /comp }}
```

For additional properties use an object next to the component name:

```vento
{{ comp button { type: "submit" } }}Click here{{ /comp }}
```

Like with JSX, use a `/` at the end to auto-close the tag:

```vento
{{ comp button { type: "submit", content: "Click here" } /}}
```

Which is equivalent to simply call the function:

```vento
{{ comp.button({ type: "submit", content: "Click here" }) }}
```

This is an example of a composition with different components:

```vento
{{ comp button { type: "submit" } }}
  {{ comp.icon({ name: "arrow-right" }) }}
  Click here
{{ /comp }}
```

## Configure VSCode

You can use the
[Vento extension for VS Code](https://marketplace.visualstudio.com/items?itemName=oscarotero.vento-syntax)
for syntax highlight and some useful snippets.
