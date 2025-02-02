---
title: No cache
description: Middleware to disable the browser cache
tags:
  - middleware
---

## Description

Modify the responses to disable the browser cache. It's used by Lume in the
`--serve` mode to ensure the most fresh version of any file is delivered.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). Create an entry point file (for
example, `serve.ts`) with the following code:

```ts
import Server from "lume/core/server.ts";
import noCache from "lume/middlewares/no_cache.ts";

const server = new Server();

server.use(noCache());

server.start();
```

> [!important]
>
> Don't use this middleware in production unless you have a good reason.
> Disabling the cache will make your site slower.

### Local development

This middleware is used by default by Lume in the `--serve` mode.
