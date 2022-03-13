---
title: PostCSS
description: Transform your CSS code with PostCSS.
docs: plugins/postcss.ts/~/Options
tags:
  - styles
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume();

site.use(postcss({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/postcss.ts/~/Options).

## Description

The `PostCSS` plugin load and transform your CSS files using
[PostCSS](https://postcss.org/) processor.

## Configuration

This plugin accepts a configuration object. The available options are:

- `extensions`: Array with the extensions of the files that this plugin will
  load. By default is `[".css"]`.
- `plugins`: Array with the PostCSS plugins that you want to use.
- `keepDefaultPlugins`: Set `true` to append your plugins to the defaults,
  instead of replacing them.
- `sourceMap`: Set `true` to generate the source map that will be inlined in the
  css file. To generate the source map in a different file, set
  `sourceMap: { inline: false }`.
- `includes`: An array of directories to search for the `@import`ed files. By
  default is `_includes`. Set `false` to disable it.

## PostCSS Plugins

PostCSS uses the following plugins by default:

- [postcss-nesting](https://github.com/lumeland/postcss-nesting) to give support
  to nested rules.
- [postcss_autoprefixer](https://deno.land/x/postcss_autoprefixer) to add
  automatically the vendor prefixes.

Use the property `plugins` to replace them. For example, to use the
[font-format-keywords](https://deno.land/x/postcss_font_format_keywords) plugin:

```js
import postcss from "lume/plugins/postcss.ts";
import postcssFontFormatKeywords from "https://deno.land/x/postcss_font_format_keywords/mod.js";

site.use(postcss({
  plugins: [postcssFontFormatKeywords()],
}));
```

This will override the default plugins with yours. If you only want to add more
plugins without remove the defaults, use the `keepDefaultPlugins` option:

```ts
// Add more postcss plugins without override the defaults
site.use(postcss({
  plugins: [postcssFontFormatKeywords()],
  keepDefaultPlugins: true,
}));
```

## Includes

In addition to the default plugins, PostCSS use also
[postcss-import](https://deno.land/x/postcss_import), to inline the local
`@imports` looking in the `_includes` directory.

```css
/* Import the CSS file from _includes/css/reset.css */
@import "css/reset.css";

/* Import the relative CSS file */
@import "./variables.css";
```

For convenience, this plugin won't be removed with your plugins (even if
`keepDefaultPlugins` is set to `false`). But you can change the `_includes`
directory or disable completelly with the `includes` option:

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

## The `postcss` filter

This plugin also register the `postcss` filter so you can transform css code in
the template engines. For example:

```html
{% set css %}
  body::after {
    content: "Hello, the CSS world!";
  }
{% endset %}

<style>
  {{- css | postcss | safe -}}
</style>
```
