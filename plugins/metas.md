---
title: Metas
description: Automatically add `<meta>` tags for SEO and social networks.
mod: plugins/metas.ts
tags:
  - html
---

## Description

This plugin generates `<meta>` tags in your HTML pages for Open graph, Twitter
cards, Schema.org, and SEO purposes. The data must be defined in the `metas`
keyword of every page and the supported values are:

- `type`: The page type (by default is `website`).
- `site`: The name of the site.
- `title`: The title of the page, article, post, etc.
- `lang`: The language of the page.
- `description`: Page description.
- `image`: The main image of the page, article, post, etc.
- `icon`: The logotype or icon of the site.
- `keywords`: An array of keywords.
- `twitter`: The twitter username.
- `color`: The color theme of the website.
- `robots`: Configuration for search engines (a boolean to enable/disable or a
  string with a custom value).
- `generator`: The software that generated the page (Lume v1.x). It can be true
  to autogenerate or a string with a custom value.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import metas from "lume/plugins/metas.ts";

const site = lume();

site.use(metas(/* Options */));

export default site;
```

## Usage

In a data file (like `/_data.yml`) in the root of your project, add the default
values.

<lume-code>

```yml {title="/_data.yml"}
metas:
  site: Oscar's blog
  twitter: "@misteroom"
  icon: /img/icon.png
  lang: en
  generator: true
```

</lume-code>

You can complete the meta values with the specific values for every page. For
example:

<lume-code>

```md {title="/posts/hello-world.md"}
---
metas:
  title: Hello world
  description: My first post
  image: /hello-world.png
---

This is my first post
```

</lume-code>

The output HTML page will include the `<meta>` tags with the result of merging
the default values with the specific page values. It should be something similar
to:

```html
<html>
  <head>
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Oscar's blog">
    <meta property="og:locale" content="en">
    <meta property="og:title" content="Hello world">
    <meta property="og:description" content="My first post">
    <meta property="og:url" content="http://example.com/">
    <meta property="og:image" content="http://example.com/hello-world.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@misteroom">
    <meta itemprop="name" content="Hello world">
    <meta itemprop="description" content="My first post">
    <meta itemprop="image" content="http://example.com/hello-world.png">
    <meta name="description" content="My first post">
    <meta name="generator" content="Lume v1.10.1">
  </head>
  <body>
    <p>This is my first post</p>
  </body>
</html>
```

## Field aliases

Field aliases allow to use an existing value in the metas. Aliases start with
`=` following by the field name:

```yml
title: This is the title

metas:
  title: "=title" # Alias to the title value
```

It's also possible to use dots for subvalues:

```yml
title: This is the title
intro:
  text: Page description
metas:
  title: "=title"
  description: "=intro.text"
```

As of Lume 1.17.0 is possible to use CSS selectors using the `$` prefix:

```yml
metas:
  title: "$ h1" # Use the content of the first <h1> element
```
