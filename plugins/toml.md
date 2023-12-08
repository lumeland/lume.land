---
title: TOML
description: Add support for TOML to store data and create pages.
mod: plugins/toml.ts
enabled: false
tags:
  - data_format
---

## Description

This plugin allows you to create pages and store data using the
[TOML format](https://toml.io/).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import toml from "lume/plugins/toml.ts";

const site = lume();

site.use(toml());

export default site;
```

### Create pages

Create a file with the extension `.page.toml` in your `src` folder. For example:

```toml
title = "Welcome to my page"
layout = "layouts/main.vto"
content = "This is my first post using lume,\nI hope you like it!"
```

### Create data files

Create a file with the name `_data.toml` or inside a `_data` directory.
