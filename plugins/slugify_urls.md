---
title: Slugify URLs
description: Slugify all page urls to remove conflict characters
docs: plugins/slugify_urls.ts/~/Options
tags:
  - urls
---

The `slugify_urls` plugin converts all URLs in your HTML documents removing or
replacing conflictive characteres like accents, spaces, etc. This plugin **is
disabled by default** so to enable it you have to import and use it in the
`_config.js` file:

```js
import slugifyUrls from "lume/plugins/slugify_urls.ts";

site.use(slugifyUrls());

export default site;
```

Once enabled, all output paths are **automatically slugified:** the spaces are
replaced with `-`, characters like `ñ` or `á` are replaced by ASCII equivalents
(`n` and `a`) and converted to lower case:

```txt
/posts/My First Post.md  =>  /posts/my-first-post/index.html
```

You can configure the slugifier in your `_config.js` file with the following
options:

```js
import slugifyUrls from "lume/plugins/slugify_urls.ts";

site.use(slugifyUrls({
  lowercase: true, // Converts all characters to lowercase
  alphanumeric: true, // Replace non alphanumeric characters for the equivalent. Example: ñ to n.
  separator: "-", // Character used as separator for words
  replace: { // An object with individual characters replacements
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
