---
title: SASS
description: Using the SASS plugin to transform scss files
docs: plugins/sass.ts/~/Options
tags:
  - styles
---

The `SASS` plugin load and transform your `.scss` files using
[DenoSASS](https://github.com/hironichu/denosass) library. Only `.scss` files
will be processed (`.sass` files
[are not supported yet](https://github.com/hironichu/denosass/issues/3)). This
plugin **is disabled by default** so to enable it you have to import and use it
in the `_config.js` file:

```js
import sass from "lume/plugins/sass.ts";

site.use(sass());
```

## Configuration

This plugin accepts a configuration object. The available options are:

- `extensions`: Array with the extensions of the files that this plugin will
  load. By default is `[".scss"]`.
- `format`: The output format (expanded or compressed). By default is
  `compressed`.
- `includes`: An array of directories to search for the `@import`ed files. By
  default is `_includes`.
