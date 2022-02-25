---
title: ParcelCSS
description: Using the ParcelCSS plugin to transform and minify CSS
docs: plugins/parcel_css.ts/~/Options
tags:
  - styles
---

The `ParcelCSS` plugin load and transform your CSS files using
[ParcelCSS](https://github.com/parcel-bundler/parcel-css) processor. This plugin
**is disabled by default** so to enable it you have to import and use it in the
`_config.js` file:

```js
import parcelCSS from "lume/plugins/parcel_css.ts";

site.use(parcelCSS());
```

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
site.use(parcelCSS({
  extensions: [".css"],
  sourceMap: false,
  options: {
    minify: true,
    drafts: {
      nesting: true,
      customMedia: true,
    },
    targets: {
      android: 98,
      chrome: 98,
      edge: 98,
      firefox: 97,
      ios_saf: 15,
      safari: 15,
      opera: 83,
      samsung: 16,
    },
  },
}));
```
