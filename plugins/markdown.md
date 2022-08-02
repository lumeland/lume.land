---
title: Markdown
description: Create pages in Markdown format
docs: plugins/markdown.ts/~/Options
enabled: true
tags:
  - template_engine
---

${toc}

## Installation

This plugin is installed by default. 🎉

## Description

[Markdown](https://en.wikipedia.org/wiki/Markdown) is a popular markup language
to write content that is converted to HTML. It is useful for pages with long
text like posts, articles or documentation sites.

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file. See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/markdown.ts/~/Options).

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

### Plugins

Lume uses [markdown-it](https://github.com/markdown-it/markdown-it) as the
markdown parser, with the following plugins enabled:

- [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist) to
  add support for definition lists (`<dl>` tag).
- [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) to add support
  for CSS classes and other attributes using `{}`.

Use the `plugins` option to replace them. For example, to add the
[markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)
plugin:

```ts
import anchor from "https://jspm.dev/markdown-it-anchor";

// Set the markdown plugins
const markdown = {
  plugins: [anchor],
};

const site = lume({}, { markdown });
```

This will override the default plugins with yours. If you only want to add more
plugins without remove the defaults, use the `keepDefaultPlugins` option:

```ts
// Add more markdown plugins without overriding the defaults
const markdown = {
  plugins: [anchor],
  keepDefaultPlugins: true,
};

const site = lume({}, { markdown });
```

You can pass options to your markdown-it plugins (as opposed to the markdown-it
engine itself) like so:

```ts
import anchor from "https://jspm.dev/markdown-it-anchor";
import footnote from "https://jspm.dev/markdown-it-footnote";

// Pass options to markdown-it plugins
const markdown = {
  plugins: [[anchor, { level: 2 }], footnote],
  keepDefaultPlugins: true,
};

const site = lume({}, { markdown });
```

(When an array is passed as an element of `plugins`, its value will be spread
into the `.use()` call on the markdown engine.)

## Creating pages in Markdown

To create a page using _Markdown_, just add a file with `.md` extension to your
site. You can also add extra variables by including a _front matter,_ a block
delimited by two triple-dashed lines with YAML code:

```yaml
---
title: Welcome to my page
layout: layouts/main.njk
---

# Welcome

**This is my first post** using lume
I hope you like it!
```

The Markdown code is stored in the `content` variable:

```html
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```

## md filter

The Markdown plugin also register the `md` filter that renders any string value
as Markdown and output a HTML. The filter also accepts an argument to render the
Markdown in _inline_ mode.

```html
<!-- Render to HTML code -->
<div>{{ text | md }}</div>

<!-- Single line rendering, without the paragraph wrap: -->
<p>{{ text | md(true) }}</p>
```
