---
title: SASS
description: Using the SASS plugin to transform scss files
docs: plugins/sass.ts/~/Options
tags:
  - styles
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";

const site = lume();

site.use(sass({/* your config here */}));

export default site;
```

To see all configuration options, click in the "See available Options in Deno
Doc" button above.

## Description

The `SASS` plugin load and transform your `.scss` files using
[DenoSASS](https://github.com/hironichu/denosass) library. Only `.scss` files
will be processed (`.sass` files
[are not supported yet](https://github.com/hironichu/denosass/issues/3)).

## Configuration

This plugin accepts a configuration object. The available options are:

- `extensions`: Array with the extensions of the files that this plugin will
  load. By default is `[".scss"]`.
- `format`: The output format (expanded or compressed). By default is
  `compressed`.
- `includes`: An array of directories to search for the `@import`ed files. By
  default is `_includes`.
