---
title: Feed
description: Generate a RSS or JSON Feed automatically for your site
mod: plugins/feed.ts
tags:
  - nav
  - utils
---

## Description

This plugin generates RSS or JSON feeds automatically with any page collection
(like posts, articles, events, etc).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts";

const site = lume();

site.use(feed({
  output: ["/posts.rss", "/posts.json"],
  query: "type=post",
  info: {
    title: "=site.title",
    description: "=site.description",
  },
  items: {
    title: "=title",
    description: "=excerpt",
  },
}));

export default site;
```

## Configuration

Internally, this plugin uses [Search](./search.md) to search and return the
pages, so you have to provide a query to search the pages and optionally the
sort and limit parameters.

You need to configure also the generic data of the feed (in the `info` key) and
the info of the items (in the `items` key). This is an example with all
available options:

```js
site.use(feed({
  output: ["/posts.rss", "/posts.json"], // The file or files that must be generated
  query: "type=post", // Select only pages of type=post
  sort: "date=desc", // To sort by date in descending order
  limit: 10, // To show only the 10 first results
  info: {
    title: "My blog", // The feed title
    description: "Where I put my thoughts", // The feed subtitle
    published: new Date(), // The publishing date
    lang: "en", // The language of the feed
    hubs: undefined, // The WebSub hubs for the feed
    generator: true, // Set `true` to automatically generate the "Lume {version}"
    authorName: "Óscar Otero", // The author of the site
    authorUrl: "https://oscarotero.com", // The URL of the author
  },
  items: {
    title: "=title", // The title of every item
    description: "=excerpt", // The description of every item
    published: "=date", // The publishing date of every item
    updated: undefined, // The last update of every item
    content: "=children", // The content of every item
    lang: "=lang", // The language of every item
    image: "=cover", // The image of the item
    authorName: "=author.name", // The author of the article
    authorUrl: "=author.url", // The URL of the author
  },
}));
```

The options `info` and `items` use the
[same aliases as `metas` plugin](./metas.md): any value starting with `=`
represents a variable name that will be used to extract this info. For example,
the description of the items has the value `=excerpt`, which means every item
will use the value of the variable `excerpt` for the description.

It's also possible to extract the info using CSS selectors. For example, let's
say we want to generate a RSS with the same content as the div `.post-content`.
We just have to start the value of the code with `$`:

```ts
site.use(feed({
  // general config
  info: {
    // info config
  },
  items: {
    title: "=title",
    description: "=excerpt",
    published: "=date",
    content: "$.post-content", // Use the content of .post-content element
    lang: "=lang",
  },
}));
```

It's also possible to define fallbacks for every value. For example:
`=title || $h1 || Default title` will try to get the value from the `title`
variable, if it doesn't exist, get the value from the `h1` CSS selector, and if
it doesn't exist, use the `Default title` value.

If you want to create more than one feed, just use the plugin once per feed:

```ts
site.use(feed({
  output: "/posts.rss",
  // Posts feed configuration
}));

site.use(feed({
  output: "/articles.rss",
  // Articles feed configuration
}));
```

## Dynamic configuration

Sometimes you want to generate feeds based on data you don't know in advance.
For example, let's say you want to create a RSS feed per tag of your blog. In
these cases you can use a function that returns an array of configurations
dynamically:

```ts
site.use(feed(() => {
  // Get all tags used in the site
  const tags = site.search.values("tag");

  // Return a configuration object per tag:
  return tags.map((tag) => {
    return {
      output: `/tag/${tag}.xml`,
      query: tag,
      info: {
        title: `Posts with the tag "${tag}"`,
      },
    };
  });
}));
```
