---
title: Redirects
description: To create redirections from one page to another
mod: plugins/redirects.ts
tags:
  - utils
  - urls
---

## Description

This plugin allows you to create redirections from one page to another. It can
output Netlify and Vercel config files, JSON and HTML pages with
`http-equiv="refresh"` meta tags.

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

At some point, you decide to change the URL to simply `/hello/`. All URLs to
`/articles/hello/` will be broken and the SEO ranking lost. To avoid that, you
can create a redirection from the old URL to the new one, so both links will
work fine. You only have to create the `oldUrl` variable with the previous URL:

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

- **html:** It's the default value. It creates an html page for each old URL
  with a `<meta http-equiv="refresh" content="0; url="...">` tag. This method
  doesn't require any server configuration. The generated pages have the
  variable `isRedirect=true`.
- **json:** To create the `_redirects.json` JSON file with all redirects,
  compatible with the [redirects](../plugins/redirects-middleware.md) middleware
  which works on Deno Deploy.
- **netlify:** To create (or update) the `_redirects` file,
  [compatible with Netlify](https://docs.netlify.com/routing/redirects/).
- **vercel:** To create (or update) the
  [`vercel.json` file with all redirects](https://vercel.com/docs/projects/project-configuration#redirects).

Example:

```js
site.use(redirects({
  output: "netlify",
}));
```
