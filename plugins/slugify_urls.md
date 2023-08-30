---
title: Slugify URLs
description: Slugify all page URLs to remove potentially conflicting characters
docs: plugins/slugify_urls.ts/~/Options
mod: plugins/slugify_urls.ts
tags:
  - urls
---

## Description

The `slugify_urls` plugin converts all URLs in your HTML documents by removing
or replacing potentially conflicting characteres like accents, spaces, etc.

Once enabled, all output paths are **automatically slugified:** the spaces are
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

You can configure the slugifier in your `_config.js` file with the following
options:

```js
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
