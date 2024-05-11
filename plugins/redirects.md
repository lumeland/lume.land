---
title: Redirects
description: To create redirections from one page to other
mod: plugins/redirects.ts
tags:
  - utils
  - urls
---

## Description

This plugin allows to create redirections from one page to other. It can output
Netlify and Vercel config files, JSON and HTML pages with `http-equiv="refresh"`
meta tags.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import redirects from "lume/plugins/redirects.ts";

const site = lume();

site.use(redirects());

export default site;
```

## Usage

Let's say you have the following page in your site:

```yml
---
url: /articles/hello/
---
```

At some point, you decide to change the url to simply `/hello/`. All urls to
`/articles/hello/` will be broken and the SEO ranking lost. To avoid that, you
can create a redirection from the old url to the new one, so both links will
work fine. You only have to create the `oldUrl` variable with the previous url:

```yml
---
url: /hello/
oldUrl: /articles/hello/
---
```

Use an array to specify more than one old URL:

```yml
---
url: /hello/
oldUrl:
  - /articles/hello/
  - /articles/older-hello/
---
```

The plugin will generate automatically the redirections from the old page(s) to
the new one. There are 4 different output methods:

- **html:** It's the default value. It creates an html page for each old url
  with a `<meta http-equiv="refresh" content="0; url="...">` tag. This method
  doesn't require any server configuration.
- **json:** To create the `_redirects.json` JSON file with all redirects,
  compatible with the [redirects](../docs/core/server.md#redirects) middleware,
  which works on Deno Deploy.
- **netlify:** To create (or update) a `_redirects` file,
  [compatible with Netlify](https://docs.netlify.com/routing/redirects/).
- **vercel:** To create (or update) the
  [`vercel.json` file with all redirects](https://vercel.com/docs/projects/project-configuration#redirects).

Example:

```js
site.use(redirects({
  output: "netlify",
}));
```
