---
title: Shutdown
description: Middleware to show a shutdown page.
mod: middlewares/shutdown.ts
tags:
  - middleware
---

## Description

This middleware is useful to show a page while your site is shut down. All
request to HTML pages returns the content of the `/503.html` file and the `503`
status code. Other files like CSS and JavaScript code is served (because it can
be used by the shutdown page). It also sends the `Retry-After` header.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```js
import Server from "lume/core/server.ts";
import shutdown from "lume/middlewares/shutdown.ts";

const server = new Server();

server.use(shutdown({
  // The page to show. /503.html by default.
  page: "/maintenance.html",

  // The Retry-After header content in seconds. 24 hours by default.
  retryAfter: 60 * 60,
}));

server.start();
```

### Local development

You can configure Lume's development server to use this middleware in the
`_config.ts` file.

```js
import lume from "lume/mod.ts";
import shutdown from "lume/middlewares/shutdown.ts";

const site = lume({
  server: {
    middlewares: [shutdown()],
  },
});

export default site;
```
