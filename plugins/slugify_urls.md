---
title: Slugify URLs
description: Slugify all page URLs to remove potentially conflicting characters
mod: plugins/slugify_urls.ts
tags:
  - urls
---

## Description

The `slugify_urls` plugin converts all URLs in your pages and files by removing
or replacing potentially conflicting characteres like accents, spaces, etc.

Once enabled, the output paths are **automatically slugified:** the spaces are
replaced with `-`, characters like `ñ` or `á` are replaced by ASCII equivalents
(`n` and `a`), and converted to lower case:

```txt
/posts/My First Post.md  =>  /posts/my-first-post/index.html
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";

const site = lume();

site.use(slugifyUrls());

export default site;
```

## Configuration

By default, **only HTML pages are slugified**. If you want to apply the plugin
to other files, like jpg images, use the `extensions` option:

```js
site.use(slugifyUrls({
  extensions: [".html", ".jpg"],
}));
```

Or set a `*` to slugify all files:

```js
site.use(slugifyUrls({
  extensions: "*",
}));
```

### Slugify options

You can configure the slugifier with the following options:

```js
/* Default options */

site.use(slugifyUrls({
  lowercase: true, // Converts all characters to lowercase
  alphanumeric: true, // Replace non-alphanumeric characters with their equivalent. Example: ñ to n.
  separator: "-", // Character used as separator for words
  stopWords: ["and", "or", "the"], // A list of words not included in the slug
  replace: { // An object with individual character replacements
    "Ð": "D", // eth
    "ð": "d",
    "Đ": "D", // crossed D
    "đ": "d",
    "ø": "o",
    "ß": "ss",
    "æ": "ae",
    "œ": "oe",
}));
```
