---
title: Cache Busting
description: Implements server side cache busting
mod: middlewares/expires.ts
tags:
  - middleware
  - optimization
---

## Description

It's a middleware to include the `Expires` header in the response for better
caching.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```ts
import Server from "lume/core/server.ts";
import expires from "lume/middlewares/expires.ts";

const server = new Server();

server.use(expires());

server.start();
```

### Local development

It's not recommended to use this middleware in local development because the
whole point of a local server is to don't cache resources and ensure to serve
the most fresh version.
