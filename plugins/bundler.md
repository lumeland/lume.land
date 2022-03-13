---
title: Bundler
description: Bundle the JavaScript, TypeScript and JSX files using the bundler provided by `Deno.emit()`.
docs: plugins/bundler.ts/~/Options
tags:
  - javascript
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import bundler from "lume/plugins/bundler.ts";

const site = lume();

site.use(bundler({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/bundler.ts/~/Options).

## Description

This plugin process your JavaScript and TypeScript files using the
[bundler provided by Deno](https://deno.land/manual/tools/bundler).

It works differently depending on the configuration. The available options are:

- **extensions**: Array with the extensions of the files that this plugin will
  handle. By default is `[".js", ".ts"]`.
- **sourceMap**: Set `true` to generate a source map file that will be saved in
  the same place but with the `.map` extension appended. For example, the file
  `my/script.js` will generate the sourcemap file `my/script.js.map`.
- **options**: The options available in
  [`Deno.EmitOptions`](https://doc.deno.land/deno/unstable/~/Deno.EmitOptions)

### Transpile

By default it loads all `.js` and `.ts` files and transpile the TypeScript to
JavaScript. To use TSX or JSX, change the file extensions:

```js
site.use(bundler({
  extensions: [".tsx", ".ts"], // Transpile all .tsx and .ts files to typescript
}));
```

### Bundle

If you want to bundle the code and generate only one file, you must do the
following:

1. Load only the main files that you want to bundle. These files must be visible
   by Lume but not their imports. You can use `site.ignore()` to ignore the
   other files or save them in a subfolder starting with `_`.
2. Set the `bundle` emit option to "module" or "classic":

```js
site
  .ignore("./my_modules") // Ignore the imported files
  .use(bundler({
    options: { bundle: "module" },
  }));
```

## TypeScript for the browser

When bundling `.ts` files to run in the browser, use a triple slash reference to
include helpful libraries, like `dom` in your scripts. For example,

```ts
/// <reference lib="dom" />

document.getElementById("foo");
```

This will help Deno and your code editor to Bundle into JS appropriately.
