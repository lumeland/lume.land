---
title: Redirects (middleware)
description: Middleware to returns redirections for some URLs.
mod: middlewares/redirects.ts
tags:
  - middleware
---

## Description

This middleware returns a redirection when the request URL is included in the
list of URLs provided. It's compatible with the JSON output method of
[the Redirects plugin](./redirects.md).

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```js
import Server from "lume/core/server.ts";
import redirects from "lume/middlewares/redirects.ts";

const server = new Server();

server.use(redirects({
  redirects: {
    "/from/": "/to/",
    "/from2/": "/to2/",

    // Use an object to configure the status code. (301 by default)
    "/from3/": {
      to: "/to2/",
      code: 302,
    },
  },
  strict: false, // configure whether distinguish the trailing slash or not (true by default)
}));

server.start();
```

### Local development

You can configure Lume's development server to use this middleware in the
`_config.ts` file.

```js
import lume from "lume/mod.ts";
import redirects from "lume/middlewares/redirects.ts";
import myRedirections from "./my-redirections.json" with { type: "json" };

const site = lume({
  server: {
    middlewares: [redirects({ redirects: myRedirections })],
  },
});

export default site;
```
