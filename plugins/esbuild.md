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

export default site;
```

## Configuration

The available options are:

- **extensions**: Array with the extensions of the files that this plugin will
  handle. By default it is `[".js", ".ts"]`.
- **options**: The options to pass to the esbuild library.
  [See the esbuild documentation](https://esbuild.github.io/api/#simple-options).
- **esm**: Options to pass to requests to `esm.sh`.

Example with the default options:

```js
site.use(esbuild({
  extensions: [".ts", ".js"],
  options: {
    plugins: [],
    bundle: true,
    format: "esm",
    minify: true,
    keepNames: true,
    platform: "browser",
    target: "esnext",
    treeShaking: true,
    outdir: "./",
    outbase: ".",
  },
}));
```

## ESM

This plugin converts any module imported from `npm:` or `jsr:` to `esm.sh`. For
example, the following code:

```js
import classNames from "npm:classnames";
import { concat } from "jsr:@std/bytes/concat";
```

is converted to:

```js
import classNames from "https://esm.sh/classnames";
import { concat } from "https://esm.sh/classnames/jsr/@std/bytes/concat";
```

You can use the `esm` key to add parameters to some packages. See the
[esm.sh docs](https://esm.sh/#docs) for more info.

For example, let's say you are using
[react-table](https://www.npmjs.com/package/react-table) in your code, that is a
CJS package.

```js
import { useTable } from "npm:react-table";
```

ESM.sh not always can resolve modules from CJS to ESM, so you may get an error
like `react-table not provide an export named useTable`. You can specify the
export names to this package with the `cjsExports` parameter:

```js
site.use(esbuild({
  extensions: [".jsx"],
  esm: {
    cjsExports: {
      "react-table": ["useTable"],
    },
  },
}));
```

The available options for `esm` are:

- `cjsExports`: To specify the modules exported by a CJS package.
- `dev`: To include the `?dev` flag to all packages. Example:
  ```js
  site.use(esbuild({
    esm: {
      dev: true,
    },
  }));
  ```
- `deps`: To specify the dependencies of a specific package.
  ```js
  site.use(esbuild({
    esm: {
      deps: {
        swr: "react@17.0.2",
      },
    },
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
