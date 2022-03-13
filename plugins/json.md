---
title: JSON
description: Add support for JSON to store data and create pages.
docs: plugins/json.ts/~/Options
enabled: true
tags:
  - data_format
---

${toc}

## Installation

This plugin is installed by default. 🎉

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file. See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/json.ts/~/Options).

```js
import lume from "lume/mod.ts";

// JSON plugin configuration
const json = {
  pagesExtensions: [".page.json"],
};

const site = lume({}, { json });

export default site;
```

## Description

This plugins allows to create pages and store data using the JSON format.

### Create pages

Create a file with the extension `.tmpl.json` in your `src` folder. For example:

```json
{
  "title": "Welcome to my page",
  "layout": "layouts/main.njk",
  "content": "This is my first post using lume,\nI hope you like it!"
}
```

### Create data files

Create a file with the name `_data.json` or inside a `_data` directory.
