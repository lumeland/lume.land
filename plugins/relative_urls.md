---
title: Relative URLs
description: Convert all URLs to relative
tags:
  - urls
---

The `relative_urls` plugin converts all URLs in your HTML documents to relative,
so you can publish the site under different domains and even subdirectories and
all links will continue working. This plugin **is disabled by default** so to
enable it you have to import and use it in the `_config.js` file:

```js
import relativeUrls from "lume/plugins/relative_urls.ts";

site.use(relativeUrls());
```

All internal URLs of your site will be relative. For example:

```html
<!-- /articles/my-first-article/ -->
<a href="/articles/my-second-article/">Go to the second article</a>
```

The `relative_urls` plugin will convert this HTML code to:

```html
<!-- /articles/my-first-article/ -->
<a href="../my-second-article/">Go to the second article</a>
```

This plugin doesn't change only the `<a>` elements, but any element with the
`href` attribute (`link`, `area`) or `src` (`img`, `video`, `audio`, etc).
