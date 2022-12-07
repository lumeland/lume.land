---
title: Terser
description: Minify JavaScript files with Terser.
docs: plugins/terser.ts/~/Options
tags:
  - javascript
---

## Description

The Terser plugin minifies `.js` files using the
[Terser minifier](https://terser.org/).

To get around compatibility issues of using NodeJS software in Deno, it uses the
browser version.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import terser from "lume/plugins/terser.ts";

const site = lume();

site.use(terser());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/terser.ts/~/Options).

## Usage

It assumes that the files to be minified are modules, and so the `module`
option, as well as the `compress` and `mangle` options, are by default set to
`true`. You can override this by passing an object with the desired Terser
options in an `options` object in the `use` function:

```js
import terser from "lume/plugins/terser.ts";

site.use(terser({
  options: {
    module: false,
  },
}));
```

Other minification options can also be set, but those relating to the filesystem
cannot. Minified files are given the same name as the input file in the same
directory structure. Note too that options apply to all files; you cannot use
different options for some files and not for others.

## The `terser` filter

In addition to the JavaScript loader and processor, this plugin also registers
the `terser` filter so you can transform JavaScript code in the template
engines. For example:

```html
{% set js %}
  console.log("Hello, the JavaScript world!");
{% endset %}

<script type="module">
  {{- js | terser | safe -}}
</script>
```
