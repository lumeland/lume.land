---
title: On demand
description: Plugin to render pages on demand in Deno Deploy
mod: plugins/on_demand.ts
tags:
  - utils
---

## Description

This plugin allows to render pages on demand. It can be useful in some
scenarios:

- There are pages with dynamic content that must be generated at the request
  time.
- The site is too big, with thousands of pages, so the build takes too much
  time.

Lume can generate pages on demand for these cases.

> [!important]
>
> This plugin only works with [Deno Deploy](https://deno.com/deploy).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import onDemand from "lume/plugins/on_demand.ts";

const site = lume();

site.use(onDemand(/* Options */));

export default site;
```

## How does it work?

### 1. Mark the ondemand pages

First, you need to configure the pages that must be rendered on demand. This is
done by setting the `ondemand` variable to `true`. For example, let's say we
want to render the home page dynamically:

<lume-code>

```html{title=index.vto}
---
layout: layout.vto
title: This is a title
ondemand: true
---

<h1>{{ title }}</h1>
```

</lume-code>

### 2. The `_routes.json` file

When the site is built, the pages with the `ondemand` variable are skipped and a
`_routes.json` file is generated containing a map with the associated page file
for each URL, for example:

<lume-code>

```json{title=_routes.json}
{
  "/": "./index.vto"
}
```

</lume-code>

### 3. The `_preload.ts` file

If your source folder contains any file with extensions `.ts`, `.tsx`, `.js`,
`.jsx` or `.mjs`, the archive `_preload.ts` is also created. This file is
important if your site is hosted on Deno Deploy.

Deno Deploy only can import dynamically files that are statically analyzable in
the code. The `_preload.ts` file contains code that does nothing but Deno Deploy
can analyze and prepare to execute on demand. You have more info in the
[Deno Deploy's Changelog](https://deno.com/deploy/changelog#statically-analyzable-dynamic-imports).

### 4. The serve file

Finally, we have to configure a HTTP server with the `onDemand` middleware.
Create the file `serve.ts`, that will be used by Deno Deploy with the following
code:

<lume-code>

```ts{title=serve.ts}
import site from "./_config.ts";
import Server from "lume/core/server.ts";
import onDemand from "lume/middlewares/on_demand.ts";
import "./_preload.ts";

const server = new Server({
  port: 8000,
  root: site.dest(),
});

server.use(onDemand({ site }));

server.start();

console.log("Listening on http://localhost:8000");
```

</lume-code>

The middleware needs an instance of our `site` in order to render the pages. We
can import it from the `_config.ts` file. It also automatically loads the
`_routes.json` file in order to know which file needs to be rendered for each
URL.

And that's all! The `_routes.json` file is regenerated automatically by the
build to ensure it's up to date with your changes.

## Using extra data

If you want to use dynamic data, use the option `extraData` which accepts a
function that must return an object with the extra data to be passed to the
page. For example, let's say we want to pass the search parameters of the
request's url:

```ts
import lume from "lume/mod.ts";
import onDemand from "lume/plugins/on_demand.ts";

site.use(onDemand({
  extraData(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    const params = Object.fromEntries(searchParams.entries());

    return {
      params,
    };
  },
}));

export default site;
```

Now, the on-demand pages will have the `params` key with the search params
values. For example, in a Nunjucks page:

```vento
---
layout: layout.vto
ondemand: true
url: /example/
---

Hello {{ params.name }}
```

The URL `/example/?name=Óscar` will return `Hello Óscar`.

## See an example

You can see [a live example of a site](https://lume-ondemand.deno.dev/) with two
pages generated on demand. And
[the repository with the source code](https://github.com/lumeland/test-lume-ondemand).
