---
title: Bundler
description: Enabling the bundler plugin
docs: plugins/bundler.ts/~/Options
tags:
  - javascript
---

The plugin Bundler **is disabled by default** so to enable it you have to import
and use it in the `_config.js` file:

```js
import bundler from "lume/plugins/bundler.ts";

site.use(bundler());
```

It process your Javascript and Typescript files using the
[bundler provided by Deno](https://deno.land/manual/tools/bundler).

This plugin works differently depending on the configuration. The available
options are:

- **extensions**: Array with the extensions of the files that this plugin will
  handle. By default is `[".js", ".ts"]`.
- **sourceMap**: Set `true` to generate a source map file that will be saved in
  the same place but with the `.map` extension appended. For example, the file
  `my/script.js` will generate the sourcemap file `my/script.js.map`.
- **options**: The options available in
  [`Deno.EmitOptions`](https://doc.deno.land/builtin/unstable#Deno.EmitOptions)

By default it loads all `.js` and `.ts` files and transpile the Typescript to
Javascript. To use TSX or JSX, change the file extensions:

```js
site.use(bundler({
  extensions: [".tsx", ".ts"], // Transpile all .tsx and .ts files to typescript
}));
```

If you want to bundle the code and generate only one file, you must do the
following:

1. Load only the main files that you want to bundle. These files must be visible
   by Lume but not their imports. You can use `site.ignore()` to ignore the
   other files or save them in a subfolder starting with `_` (for example:
   `_components`).
2. Configure the plugin to bundle the code:

```js
site.use(bundler({
  extensions: [".tsx", ".ts"], // Transpile all .tsx and .ts files to typescript
  options: {
    bundle: "module", // Include all dependencies in the files
  },
}));
```

## Typescript for the browser

When bundling `.ts` files to run in the browser, use a triple slash reference to
include helpful libraries, like `dom` in your scripts. For example,

```ts
/// <reference lib="dom" />

document.getElementById("foo");
```

This will help Deno and your code editor to Bundle into JS appropriately.
