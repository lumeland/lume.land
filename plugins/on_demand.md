---
title: On demand
description: Plugin to render pages on demand in Deno Deploy
docs: plugins/on_demand.ts/~/Options
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

Note: This plugin only works with [Deno Deploy](https://deno.com/deploy).{.tip}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import onDemand from "lume/plugins/on_demand.ts";

const site = lume();

site.use(onDemand());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/on_demand.ts/~/Options).

## How does it work?

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

When the site is built, this page will be skipped. But a `_routes.json` file
will be generated containing a map with the URL and the associated page file:

<lume-code>

```json{title=_routes.json}
{
  "/": "./index.vto"
}
```

</lume-code>

Finally, in the `serve.ts` file used by Deno Deploy, we have to import and use
the `onDemand` middleware:

<lume-code>

```ts{title=serve.ts}
import site from "./_config.ts";
import Server from "lume/core/server.ts";
import onDemand from "lume/middlewares/on_demand.ts";

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
URL. If the file is in a different path, you can configure it.

And that's all! The `_routes.json` file is regenerated automatically by the
build to ensure it's up to date with your changes.

## Preload modules

Deno Deploy doesn't have support for dynamic imports (modules imported
dynamically with `import("./module-name.ts")`).
[See this issue for more info](https://github.com/denoland/deploy_feedback/issues/1).

If you have on-demand pages created with JavaScript or TypeScript, the plugin
generates not only a `_routes.json` file, but also a `_preload.ts` file. This
file contains the code to preload statically all modules needed to build the
pages on demand. You have to import it in your server.ts so Lume can render
these pages in Deno Deploy:

<lume-code>

```ts{title=serve.ts}
import site from "./_config.ts";
import Server from "lume/core/server.ts";
import onDemand from "lume/middlewares/on_demand.ts";
import preload from "./_preload.ts";

const server = new Server({
  port: 8000,
  root: site.dest(),
});

// Preload the JS/TS modules
preload(site);

server.use(onDemand({ site }));

server.start();

console.log("Listening on http://localhost:8000");
```

</lume-code>

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

Now, the on demand pages will have the `params` key with the search params
values. For example, in a Nunjucks page:

```html
---
layout: layout.vto
ondemand: true
url: /example/
---

Hello {{ params.name }}
```

The URL `/example/?name=Óscar` will return `Hello Òscar`.

## See an example

You can see [a live example of a site](https://lume-ondemand.deno.dev/) with two
pages generated on demand. And
[the repository with the source code](https://github.com/lumeland/test-lume-ondemand).
