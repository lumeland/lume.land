---
title: YAML
description: Add support for YAML to store data and create pages.
mod: plugins/yaml.ts
enabled: true
tags:
  - data_format
---

## Description

[YAML](https://en.wikipedia.org/wiki/YAML) is a format to save serialized data.
It's also useful for pages with multiple pieces of text, like landing pages,
guides, directories, etc.

## Installation

This plugin is installed by default. 🎉

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file.

```js
import lume from "lume/mod.ts";

// YAML plugin configuration
const yaml = {/* your config here */};

const site = lume({}, { yaml });

export default site;
```

## Creating _data files

This format is useful for shared data so that you can create `_data.yml` or
`_data/*.yml` files to save common variables.

## Creating pages in YAML

This format can also be used to create pages; just add a file with the `.yml` or
`.yaml` extension to your site. For example:

```yaml
title: Welcome to my page
layout: layouts/main.vto
intro: |
  This is my first post using lume
  I hope you like it!

sections:
  - title: Design
    image: img/section1.jpg
    text: I design beautiful and accessible websites

  - title: Development
    image: img/section2.jpg
    text: And can write HTML and CSS code!
```

You will need a layout to render this page and generate the HTML:

```vento
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    <header>
      <h1>{{ title }}</h1>
      <p>{{ intro }}</p>
    </header>

    {{ for section of sections }}
    <section>
      <h2>{{ section.title }}</h2>
      <img src="{{ section.image }}">
      <p>{{ section.text }}</p>
    </section>
    {{ /for }}
  </body>
</html>
```
