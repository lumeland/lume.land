---
title: Redirects
description: To create redirections from one page to other
tags:
  - utils
  - urls
---

## Description

This plugin allows to create redirections from one page to other. It's
compatible with different configurations methods like Netlify, Vercel, JSON or
HTML pages with `http-equiv="refresh"` meta tags.

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
url: /articles/hi/
---

# Welcome!
```

At some point, you decide to change the url to simply `/hi/`. All urls to the
`/articles/hi/` will be broken and the SEO ranking lost. To avoid that, you can
create a redirection from the old url to the new one, so both links will work
fine. To do that, you only have to create the `oldUrl` variable with the
previous url:

```yml
---
url: /hi/
oldUrl: /articles/hi/
---

# Welcome!
```

It's also possible to define several old urls with an array, if you changed the
page url several times:

```yml
---
url: /hi/
oldUrl:
  - /articles/hi/
  - /articles/older-url/
---

# Welcome!
```

The plugin will generate automatically the redirections from the old page(s) to
the new one. There are 4 different methods that you can configure with the
`output` variable:

- **html:** It's the default value. It creates an html page for each old url
  with a `<meta http-equiv="refresh" content="0; url=...">` tag to redirect to
  the new url.
- **json:** To create the `_redirects.json` JSON file with all redirects,
  compatible with the [redirects](../docs/core/server.md#redirects) middleware.
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
