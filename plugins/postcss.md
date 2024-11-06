---
title: PostCSS
description: Transform your CSS code with PostCSS.
mod: plugins/postcss.ts
tags:
  - styles
  - optimization
---

## Description

The `PostCSS` plugin loads and transforms your CSS files using the
[PostCSS](https://postcss.org/) processor.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume();

site.use(postcss(/* Options */));

export default site;
```

## PostCSS Plugins

PostCSS has [postcss_autoprefixer](https://deno.land/x/postcss_autoprefixer)
plugin enabled by default to add automatically the vendor prefixes.

Use the property `plugins` add more plugins. For example, to use the
[postcss-nesting](https://www.npmjs.com/package/postcss-nesting) plugin:

```js
import postcss from "lume/plugins/postcss.ts";
import nesting from "npm:postcss-nesting";

site.use(postcss({
  plugins: [nesting()],
}));
```

## Includes

PostCSS plugin uses [postcss-import](https://deno.land/x/postcss_import), to
inline the local `@imports` by looking in the `_includes` directory.

```css
/* Import the CSS file from _includes/css/reset.css */
@import "css/reset.css";

/* Import the relative CSS file */
@import "./variables.css";
```

You can change the `_includes` directory or disable it completely with the
`includes` option:

```ts
// Change the includes folder of CSS to _styles
site.use(postcss({
  includes: "_styles",
}));
```

```ts
// Disable the includes (the local @import's won't be inlined)
site.use(postcss({
  includes: false,
}));
```

## Hooks

This plugin exposes the following hooks:

- `addPostcssPlugin(plugin)` To add additional plugins.
- `postcss(processor)` To modify the processor instance in a low level way.

```js
import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import nano from "npm:cssnano";

const site = lume();

site.use(postcss());

site.hooks.addPostcssPlugin(nano);

export default site;
```

## The `postcss` filter

This plugin also registers the `postcss` filter so you can transform CSS code in
the template engines. For example:

```vento
{{ set css }}
  body::after {
    content: "Hello, the CSS world!";
  }
{{ /set }}

<style>
  {{ css |> postcss }}
</style>
```

## Configure VSCode

You can use the
[Postcss extension for VS Code](https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss)
for syntax highlight.
