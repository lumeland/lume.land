---
title: Lightning CSS
description: Transform and minify your CSS files with Lightning CSS.
mod: plugins/lightningcss.ts
tags:
  - styles
  - optimization
---

## Description

The `lightningcss` plugin bundles your CSS files using the
[Lightning CSS](https://github.com/parcel-bundler/lightningcss) processor
(previously known as Parcel CSS).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import lightningCss from "lume/plugins/lightningcss.ts";

const site = lume();

site.use(lightningCss(/* Options */));

export default site;
```

## Configuration

This plugin accepts a configuration object. The available options are:

- `extensions`: Array with the extensions of the files that this plugin will
  load. By default is `[".css"]`. instead of replacing them.
- `options`: An object with the options for lightning-css.
- `includes`: The directory to search for the `@import`ed files. By default it
  is `"_includes"`. Set `false` to disable it.

Example with the default configuration:

```js
import lume from "lume/mod.ts";
import lightningCss, { version } from "lume/plugins/lightningcss.ts";

const site = lume();

site.use(lightningCss({
  extensions: [".css"],
  includes: "_includes",
  options: {
    minify: true,
    drafts: {
      nesting: true,
      customMedia: true,
    },
    targets: {
      android: version(100),
      chrome: version(100),
      edge: version(100),
      firefox: version(100),
      ios_saf: version(16),
      safari: version(16),
      opera: version(100),
      samsung: version(19),
    },
  },
}));

export default site;
```

> [!tip]
>
> The `version()` function is provided to convert a semver version to single
> 24-bit number as used by lightningcss.
> [More info](https://github.com/parcel-bundler/lightningcss#from-node)
