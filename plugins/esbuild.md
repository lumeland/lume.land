---
title: ESbuild
description: Bundle JavaScript, TypeScript and JSX files using esbuild library.
docs: plugins/esbuild.ts/~/Options
tags:
  - javascript
---

## Description

The plugin `esbuild` processes your JavaScript and TypeScript files using
[esbuild bundler](https://esbuild.github.io/).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";

const site = lume();

site.use(esbuild());

export default site;
```

## Configuration

The available options are:

- **extensions**: Array with the extensions of the files that this plugin will
  handle. By default it is `[".js", ".ts"]`.
- **options**: The options to pass to the esbuild library.
  [See the esbuild documentation](https://esbuild.github.io/api/#simple-options).

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

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/esbuild.ts/~/Options).

## Hooks

This plugin exposes the following hooks:

- `addEsbuildPlugin(plugin)` To add additional plugins.

```js
import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";
import coffeescript from "npm:esbuild-coffeescript";

const site = lume();

site.use(esbuild());

site.hooks.addEsbuildPlugin(coffeescript);

export default site;
```
