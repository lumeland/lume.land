---
title: WWW
description: Middleware to redirect from/to www subdomain.
mod: middlewares/www.ts
tags:
  - middleware
---

## Description

This middleware redirects from `www.` domains to naked (non-www domain) or vice
versa.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```js
import Server from "lume/core/server.ts";
import www from "lume/middlewares/www.ts";

const server = new Server();

server.use(www({
  add: false, // false to remove, true to add it.
}));

server.start();
```
