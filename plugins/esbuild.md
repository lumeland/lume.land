---
title: ESbuild
description: Enabling the esbuild plugin
docs: plugins/esbuild.ts/~/Options
tags:
  - javascript
---

The plugin `esbuild` **is disabled by default** so to enable it you have to
import and use it in the `_config.js` file:

```js
import esbuild from "lume/plugins/esbuild.ts";

site.use(esbuild());
```

It process your Javascript and Typescript files using
[esbuild bundler](https://esbuild.github.io/).

The available options are:

- **extensions**: Array with the extensions of the files that this plugin will
  handle. By default is `[".js", ".ts"]`.
- **options**: The options to pass to esbuild library.
  [See the esbuild documentation](https://esbuild.github.io/api/#simple-options)

Example with the default options:

```js
site.use(esbuild({
  extensions: [".ts", ".js"],
  options: {
    bundle: true,
    format: "esm",
    minify: true,
    keepNames: true,
    platform: "browser",
    target: "esnext",
    incremental: true,
    treeShaking: true,
  },
}));
```
