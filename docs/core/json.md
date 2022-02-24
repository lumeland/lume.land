---
title: JSON
description: Using the JSON plugin to allow using JSON for data
docs: plugins/json.ts
order: 3
---

JSON files are useful to store data not written by humans (for example APIs).
This format is enabled as default so you can create `.json` files to store data
or create pages.

## Creating _data files

Create `_data.json` or `_data/*.json` files to save common variables.

## Creating pages in JSON

It's possible to create pages using JSON format. To do that, create a file with
the extension `.tmpl.json` (the `.tmpl` subextension is required to
differentiate these pages from other json files that you can include in your
site).

```json
{
  "title": "Welcome to my page",
  "layout": "layouts/main.njk",
  "content": "This is my first post using lume,\nI hope you like it!"
}
```

## Configure the JSON plugin

In `_config.ts`, the second argument of `lume()` is used to configure the
plugins that are enabled by default (like this!). Use it to configure the JSON
plugin.

For example, to use a different extension than `.tmpl.json` to generate pages,
edit the `pageExtensions` property:

```ts
import lume from "lume/mod.ts";

// JSON plugin configuration
const json = {
  pagesExtensions: [".page.json"],
};

// Apply the plugin config
const site = lume({}, { json });
```
