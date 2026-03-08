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
[Lightning CSS](https://github.com/parcel-bundler/lightningcss) processor.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import lightningCss from "lume/plugins/lightningcss.ts";

const site = lume();

site.use(lightningCss(/* Options */));
site.add("style.css"); //Add the entry point(s)

export default site;
```

## Configuration

Example with the default configuration:

```js
import lume from "lume/mod.ts";
import lightningCss, { version } from "lume/plugins/lightningcss.ts";
import { version } from "lume/core/utils/browsers.ts";

const site = lume();

site.use(lightningCss({
  includes: "_includes",
  options: {
    minify: true,
    drafts: {
      customMedia: true,
    },
    targets: {
      android: version([100, 0]),
      chrome: version([100, 0]),
      edge: version([100, 0]),
      firefox: version([100, 0]),
      ios_saf: version([18, 4]),
      safari: version([16, 0]),
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
