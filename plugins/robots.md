---
title: Robots
description: Plugin to create the robots.txt file automatically
mod: plugins/robots.ts
tags:
  - utils
  - optimization
---

## Description

This plugin allows to create the [robots.txt](http://www.robotstxt.org/) file
automatically, used to configure which search engines (and other bots like AI
data scrappers) have access to the website.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import robots from "lume/plugins/robots.ts";

const site = lume();

site.use(robots(/* Options */));

export default site;
```

## Usage

The plugin accepts an array with a list of bots allowed and disallowed. For
example:

```js
// Explicit allow access to Google and Bing
site.use(robots({
  allow: ["Googlebot", "Bingbot"],
}));
```

Note that this configuration only give explicit permission to those bots, but
doesn't prevent other bots to scan the site. If you only want to give
permissions to these bots, add the `*` value to `disallow`:

```js
// Give access only to Google and Bing
site.use(robots({
  allow: ["Googlebot", "Bingbot"],
  disallow: "*",
}));
```

### Advanced options

The `rule` option contains an array of rules for more specific configuration.
For example:

```js
// Deny access to the /admin folder to all user agents
site.use(robots({
  rules: [
    {
      userAgent: "*",
      disallow: "/admin",
    },
  ],
}));
```

## More info

You can see a
[complete list of bots at Dark Visitors](https://darkvisitors.com/agents).
