---
title: Redirect Activity Streams 2.0
description: Middleware to create redirections to any AS2 bridge
# mod: plugins/redirect_as2.ts
tags:
  - middleware
---

## Description

This middleware redirects all Activity Stream requests to any server like
[Hatsu](https://hatsu.cli.rs/) or [Bridgy Fed](https://fed.brid.gy/).

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

You have to provide the `rewriteUrl` option with a function that return the URL
for the redirection. The middleware has two helpers: `bridgyFed` and `hatsu`.

Create an entry point file (for example, `serve.ts`) with the following code:

```ts
import Server from "lume/core/server.ts";
import redirectAS2, { bridgyFed } from "lume/middlewares/redirect_as2.ts";

const server = new Server();

const rewriteUrl = bridgyFed();

server.use(redirectAS2({ rewriteUrl }));

server.start();
```
