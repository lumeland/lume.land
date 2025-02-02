---
title: Logger
description: Log HTTP request/responses in the console
tags:
  - middleware
---

## Description

This middleware shows in the console the HTTP requests/responses served. It's
used by Lume in the `--serve` mode.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). Create an entry point file (for
example, `serve.ts`) with the following code:

```ts
import Server from "lume/core/server.ts";
import logger from "lume/middlewares/logger.ts";

const server = new Server();

server.use(logger());

server.start();
```

### Local development

This middleware is used by default by Lume in the `--serve` mode.
