---
title: Markdown
description: Create pages in Markdown format
mod: plugins/markdown.ts
enabled: true
tags:
  - template_engine
---

## Description

[Markdown](https://en.wikipedia.org/wiki/Markdown) is a popular markup language
for writing content that is converted to HTML. It is useful for pages with long
text like posts, articles, or documentation sites.

## Installation

This plugin is installed by default. 🎉

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file.

```js
import lume from "lume/mod.ts";

// Markdown plugin configuration
const markdown = {};

const site = lume({}, { markdown });

export default site;
```

Use the `options` property to change the
[markdown-it settings](https://github.com/markdown-it/markdown-it#usage-examples):

```ts
// Change markdown-it configuration
const markdown = {
  options: {
    breaks: false,
    xhtmlOut: true,
  },
};

const site = lume({}, { markdown });
```

Additionally, you can use [hooks](#hooks) to add additional plugins and rules.

### Plugins

Lume uses [markdown-it](https://github.com/markdown-it/markdown-it) as the
markdown parser, with the following plugins enabled:

- [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist) to
  add support for definition lists (`<dl>` tag).
- [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) to add support
  for CSS classes and other attributes using `{}`.

You can find
[more plugins in NPM](https://www.npmjs.com/search?q=markdown-it-plugin) that
you can use with the `plugins` option. For example, to add the
[markdown-it-emoji](https://www.npmjs.com/package/markdown-it-emoji) plugin:

```ts
import emoji from "npm:markdown-it-emoji";

// Set the markdown plugins
const markdown = {
  plugins: [emoji],
};

const site = lume({}, { markdown });
```

You can pass options to your markdown-it plugins using an array with
`[plugin, options]` signature. Example:

```ts
import anchor from "npm:markdown-it-anchor";
import footnote from "npm:markdown-it-footnote";

// Pass options to markdown-it plugins
const markdown = {
  plugins: [
    [anchor, { level: 2 }],
    footnote,
  ],
};

const site = lume({}, { markdown });
```

### Lume markdown plugins

The repository
[lume_markdown_plugins](https://deno.land/x/lume_markdown_plugins) contain a
collection of plugins specially adapted to Lume, with useful features like
extract the title from the markdown or generate a table of contents.

## Hooks

This plugin exposes the following hooks:

- `addMarkdownItPlugin(plugin, options)` To add additional plugins.
- `addMarkdownItRule(name, rule)` To add additional rules.

```js
import lume from "lume/mod.ts";
import anchor from "npm:markdown-it-anchor";
import footnote from "npm:markdown-it-footnote";

const site = lume();

site.hooks.addMarkdownItPlugin(anchor, { level: 2 });
site.hooks.addMarkdownItPlugin(footnote);

export default site;
```

## Creating pages in Markdown

To create a page using _Markdown_, just add a file with `.md` extension to your
site. You can also add extra variables by including a _front matter,_ a block
delimited by two triple-dashed lines with YAML code:

```yaml
---
title: Welcome to my page
layout: layouts/main.vto
---

# Welcome

**This is my first post** using Lume.
I hope you like it!
```

The Markdown code is stored in the `content` variable:

```vento
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    {{ content }}
  </body>
</html>
```

## md filter

The Markdown plugin also registers the `md` filter that renders any string value
as Markdown and outputs an HTML fragment. The filter also accepts an argument to
render the Markdown in _inline_ mode.

```vento
<!-- Render to HTML code -->
<div>{{ text |> md }}</div>

<!-- Single line rendering, without the paragraph wrap: -->
<p>{{ text |> md(true) }}</p>
```
