---
title: Check URLs
description: Automatically check the URLs of your site to detect broken links
tags:
  - urls
  - optimization
---

## Description

This plugin check your internal and optionally external links in your website
and warns when a broken link is found.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import checkUrls from "lume/plugins/check_urls.ts";

const site = lume();

site.use(checkUrls(/* Options */));

export default site;
```

## Default checking

The default configuration will check all your internal links and warns you when
a broken link is found. This plugin is compatible with
[redirects](./redirects.md): when a link to a non-existing page is found, but it
redirects to an existing page, the url is considered valid.

## Strict mode

There's a mode for a more _strict_ detection:

```js
site.use(checkUrls({
  strict: true,
}));
```

In the _strict_ mode the **redirects are not allowed,** all links must go to the
final page. This also affects to the trailing slashes: for example `/about-me`
is invalid but `/about-me/` is valid.

## External URLs

By default, the plugin only checks internal links. But you can configure it to
check links to external domains:

```js
site.use(checkUrls({
  external: true,
}));
```

> [!warning]
>
> This option can make the build slower, specially if you have many external
> links, so probably it's a good idea to enable it only occasionally.

## Output

By default, the broken links found are shown in the console. Use the `output`
option to export the list of broken links to a JSON file:

```js
site.use(checkUrls({
  external: true,
  output: "_broken_links.json",
}));
```

Or use a function for a custom output:

```js
site.use(checkUrls({
  external: true,
  output: (brokenLinks) => {
    console.log(`${brokenLinks.size} broken links found!`);
  },
}));
```

The `brokenLinks` argument is of type `Map<string, Set<string>>`: the map keys
are the broken links found, and the `Set<string>` the pages where every broken
link has found.
