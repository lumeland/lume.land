---
title: FFF
description: Converts the data structure to FFF
mod: plugins/fff.ts
tags:
  - data_format
  - utils
---

## Description

[FFF](https://fff.js.org/) is a front matter specification designed to be
framework-agnostic, so you can reuse your data with different static site
generators, like Hexo, Hugo or Lume.

This plugin converts the page data to follow the FFF standard, so if you use
this standard with any other SSG and want to migrate to Lume (or viceversa),
this plugin should ease the migration.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import fff from "lume/plugins/fff.ts";

const site = lume();

site.use(fff(/* Options */));

export default site;
```

## Usage

The plugin can modify the page data using the
[Flavor Transform feature](https://fff.js.org/concepts/flavor-transform.html).

As an example, Lume [Data model](../docs/advanced/the-data-model.md) use the
variable `date` to save the page date. But `date` can have many meanings
(creationg date, last update date, published date, etc). FFF standard defines
three date variables: `created`, `updated` and `published` and it will create
one of these variables from the `date` variable:

```js
site.use(fff({
  date: "published", // Create the variable 'published' from the variable 'date'
}));
```

See [FFF documentation for more info](https://fff.js.org/version/1.2.html).
