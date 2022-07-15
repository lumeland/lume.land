---
title: Metas
docs: plugins/metas.ts/~/Options
description: Add automatically `<meta>` tags for SEO and social networks.
tags:
  - html
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import metas from "lume/plugins/metas.ts";

const site = lume();

site.use(metas());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/netlify_cms.ts/~/Options).

## Description

This plugin generate `<meta>` tags in your HTML pages for Open graph, Twitter
cards, Schema.org and SEO purposes. The data must be defined in the `metas`
keyword of every page and the supported values are:

- `title`: The title of the page, article, post, etc.
- `description`: Page description.
- `site`: The name of the site.
- `lang`: The language of the page.
- `keywords`: An array of keywords.
- `image`: The main image of the page, article, post, etc.
- `icon`: The logotype or icon of the site.
- `twitter`: The twitter username.
- `color`: The color theme of the website.
- `generator`: The sofware that generate the page (Lume v1.x). It can be a
  boolean or a string with a custom value.

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

mergedKeys:
  metas: object
```

</lume-code>

The `mergeKeys` value allows to override some values of `metas` in your pages.
See [Merged Keys documentation](../docs/core/merged-keys.md) for more info.
{.tip}

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
  <header>
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Oscar's blog">
    <meta property="og:locale" content="en">
    <meta property="og:title" content="Hello world">
    <meta property="og:description" content="My first post">
    <meta property="og:url" content="http://example.com/">
    <meta property="og:image" content="/hello-world.png">
    <meta name="twitter:title" content="Hello world">
    <meta name="twitter:description" content="My first post">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="/hello-wold.png">
    <meta name="twitter:site" content="@misteroom">
    <meta itemprop="name" content="Hello world">
    <meta itemprop="description" content="My first post">
    <meta itemprop="image" content="/hello-world.png">
    <meta name="description" content="My first post">
    <meta name="generator" content="Lume v1.10.1">
  </header>
  <body>
    <p>This is my first post</p>
  </body>
</html>
```

</lume-code>
