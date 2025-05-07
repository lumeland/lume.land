---
title: ESbuild
description: Bundle JavaScript, TypeScript and JSX files using esbuild library.
mod: plugins/esbuild.ts
tags:
  - javascript
  - optimization
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

site.use(esbuild(/* Options */));
site.add("script.ts"); //Add the files to process

export default site;
```

## Configuration

The available options are:

- **extensions**: Array with the extensions of the files that this plugin will
  handle. By default it is `[".js", ".ts", ".jsx", ".tsx"]`.
- **options**: The options to pass to the esbuild library.
  [See the esbuild documentation](https://esbuild.github.io/api/#simple-options).
- **denoConfig**: Options to pass to Deno to resolve the NPM and JSR
  dependencies.

## denoConfig

If you need to specify an import map or compile JSX files, it's recomended to
create a `deno.json` file with the front-end configuration, that can be used by
the plugin and the code editor.

For example, let's say your project has the following structure:

```js
|_ deno.json
|_ _config.ts
|_ app/
  |_ deno.json
  |_ main.tsx
  |_ components/
    |_ button.tsx
    |_ header.tsx
```

The root of your project has the files that you already know: `deno.json` to
configure Deno and `_config.ts` to configure Lume. The `app` folder has the code
that need to be processed by esbuild. But the Deno configuration may be
different (you may want to place there an import map with all npm dependencies,
or configure a different JSX library to frontend, like React or Preact). So we
have another `deno.json` file there.

Now, you have to configure the plugin to load this deno config, that will be
used to resolve the dependencies and compile the JSX files (The plugin uses the
official [esbuild-deno-loader](https://jsr.io/@luca/esbuild-deno-loader) under
the hood).

Because we want to use `main.tsx` as the entry point, only this file needs to be
added. The plugin can will resolve and include all imports.

```js
site.add("app/main.tsx");
site.use(esbuild({
  denoConfig: "app/deno.json",
}));
```

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
