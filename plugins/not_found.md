---
title: Not found
description: Middleware to show the a custom page on 404 errors.
mod: middlewares/not_found.ts
tags:
  - middleware
---

## Description

This middleware shows a not-found page on 404 errors. Optionally it can create a
directoryIndex for folders.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```ts
import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";

const server = new Server();

server.use(notFound({
  page404: "/404.html", // Default value
}));

server.start();
```

### Local development

This middleware is used by default by Lume in the `--serve` mode with the
[value of the `page404` option](../docs/configuration/config-file.md#page404).
