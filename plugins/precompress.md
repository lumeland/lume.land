---
title: Precompress
description: Middleware to serve precompressed files (in Brotli or Gzip).
mod: middlewares/precompress.ts
tags:
  - middleware
  - optimization
---

## Description

This middleware search and serve for precompressed versions of the files (in
Brotli or Gzip). For example, `index.html.br` or `index.html.gz` instead of
index.html. See [Brotli](./brotli.md) and [Gzip](./gzip.md) plugins to know how
to create the precompressed files.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```ts
import Server from "lume/core/server.ts";
import precompress from "lume/middlewares/precompress.ts";

const server = new Server();

server.use(precompress());

server.start();
```

### Local development

You can configure Lume's development server to use this middleware in the
`_config.ts` file:

```js
import lume from "lume/mod.ts";
import precompress from "lume/middlewares/precompress.ts";

const site = lume({
  server: {
    middlewares: [precompress()],
  },
});

export default site;
```
