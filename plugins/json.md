---
title: JSON
description: Add support for JSON or JSONC to store data and create pages.
mod: plugins/json.ts
enabled: true
tags:
  - data_format
---

## Description

This plugin allows you to create pages and store data using the JSON format. As
of Lume 1.18.0, JSONC (JSON with comments) is also supported.

## Installation

This plugin is installed by default. 🎉

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file.

```js
import lume from "lume/mod.ts";

// JSON plugin configuration
const json = {
  extensions: {
    pages: [".page.json"],
  },
};

const site = lume({}, { json });

export default site;
```

### Create pages

Create a file with the extension `.page.json` or `.page.jsonc` in your `src`
folder. For example:

```json
{
  "title": "Welcome to my page",
  "layout": "layouts/main.vto",
  "content": "This is my first post using lume,\nI hope you like it!"
}
```

### Create data files

Create a file with the name `_data.json` or `_data.jsonc` or inside a `_data`
directory.
