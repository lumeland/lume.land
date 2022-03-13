---
title: ParcelCSS
description: Transform and minify your CSS files with ParcelCSS.
docs: plugins/parcel_css.ts/~/Options
tags:
  - styles
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import parcelCss from "lume/plugins/parcel_css.ts";

const site = lume();

site.use(parcelCss({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/parcel_css.ts/~/Options).

## Description

The `ParcelCSS` plugin load and transform your CSS files using
[ParcelCSS](https://github.com/parcel-bundler/parcel-css) processor.

## Configuration

This plugin accepts a configuration object. The available options are:

- `extensions`: Array with the extensions of the files that this plugin will
  load. By default is `[".css"]`. instead of replacing them.
- `sourceMap`: Set `true` to generate a source map file that will be saved in
  the same place but with the `.map` extension appended. For example, the file
  `my/styles.css` will generate the sourcemap file `my/styles.css.map`.
- `options`: An object with the options for parcel-css.

Example with the default configuration:

```js
import lume from "lume/mod.ts";
import parcelCss, { version } from "lume/plugins/parcel_css.ts";

const site = lume();

site.use(parcelCss({
  extensions: [".css"],
  sourceMap: false,
  options: {
    minify: true,
    drafts: {
      nesting: true,
      customMedia: true,
    },
    targets: {
      android: version(98),
      chrome: version(98),
      edge: version(98),
      firefox: version(97),
      ios_saf: version(15),
      safari: version(15),
      opera: version(83),
      samsung: version(16),
    },
  },
}));

export default site;
```

The `version()` function is provided to convert semver version to single 24-bit
number, used by parcel_css.
[More info](https://github.com/parcel-bundler/parcel-css#from-node) {.tip}
