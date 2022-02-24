---
title: YAML
description: Using YAML for data and pages
docs: plugins/yaml.ts
order: 6
---

[YAML](https://en.wikipedia.org/wiki/YAML) is format to save serialized data.
It's **enabled by default** and is useful for pages with multiple pieces of
text, like landing pages, guides, directories, etc.

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

## Configure the Nunjucks plugin

In `_config.ts`, the second argument of `lume()` is used to configure the
plugins that are enabled by default (like this!). Use it to configure the YAML
plugin.

For example, by default, the extensions `.yaml` and `.yml` are loaded. But if we
want to load only `.yaml` files:

```ts
// YAML plugin configuration
const yaml = {
  extensions: [".yaml"],
};

// Apply the plugin config
const site = lume({}, { yaml });
```
