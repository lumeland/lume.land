---
title: YAML
description: Add suppport for YAML to store data and create pages.
docs: plugins/yaml.ts/~/Options
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
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/yaml.ts/~/Options).

```js
import lume from "lume/mod.ts";

// YAML plugin configuration
const yaml = {/* your config here */};

const site = lume({}, { yaml });

export default site;
```

## Description

[YAML](https://en.wikipedia.org/wiki/YAML) is a format to save serialized data.
It's also useful for pages with multiple pieces of text, like landing pages,
guides, directories, etc.

## Creating _data files

This format is useful for shared data, so you can create `_data.yml` or
`_data/*.yml` files to save common variables.

## Creating pages in YAML

This format can be used also to create pages, just add a file with `.yml` or
`.yaml` extension to your site. For example:

```yaml
title: Welcome to my page
layout: layouts/main.njk
intro: |
  This is my first post using lume
  I hope you like it!

sections:
  - title: Design
    image: img/section1.jpg
    text: I design beautiful and accesible websites

  - title: Development
    image: img/section2.jpg
    text: And can write HTML and CSS code!
```

You will need a layout to render this page and generate the HTML:

```html
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    <header>
      <h1>{{ title }}</h1>
      <p>{{ intro }}</p>
    </header>

    {% for section in sections %}
    <section>
      <h2>{{ section.title }}</h2>
      <img src="{{ section.image }}">
      <p>{{ section.text }}</p>
    </section>
    {% endfor %}
  </body>
</html>
```
