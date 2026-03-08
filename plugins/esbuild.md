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

## denoConfig

If you need to specify an import map or compile JSX files, it's recomended to
create a `deno.json` file with the front-end configuration, that can be used by
the plugin and the code editor.

For example, let's say your project has the following structure:

```txt
├── deno.json
├── _config.ts
└── app
    ├── deno.json
    ├── main.tsx
    └── components
        ├── button.tsx
        └── header.tsx
```

In the root we have the files that you already know: `deno.json` to configure
Deno and `_config.ts` to configure Lume. The `app` folder has the code that need
to be processed by esbuild. Because the Deno configuration may be different (you
may need a different import map with all npm dependencies, or use another JSX
library in frontend, like React or Preact), we have another `deno.json` file in
that folder.

Let's configure the plugin to load this deno config, that will be used to
resolve the dependencies and compile the JSX files (The plugin uses the official
[esbuild-deno-loader](https://jsr.io/@luca/esbuild-deno-loader) under the hood).

Because we want to use `main.tsx` as the entry point, only this file needs to be
added.

```js
// The entry point
site.add("app/main.tsx");

// Esbuild with a different deno.json configuration
site.use(esbuild({
  denoConfig: "app/deno.json",
}));
```
