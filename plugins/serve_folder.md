---
title: Serve folder
description: Middleware to add additional folders to the server.
mod: middlewares/serve_folder.ts
tags:
  - middleware
---

## Description

Middleware to add additional folders to the server. Useful to serve more static
files stored in a different place.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```js
import Server from "lume/core/server.ts";
import serve_folder from "lume/middlewares/serve_folder.ts";

const server = new Server();

server.use(serve_folder({
  root: "./other-folder",
}));

// Serve the files in this folder only if they don't exist in the main folder.
server.use(serve_folder({
  root: "./fallback-files",
  after: true,
}));

server.start();
```

### Local development

You can configure Lume's development server to use this middleware in the
`_config.ts` file.

```js
import lume from "lume/mod.ts";
import serve_folder from "lume/middlewares/serve_folder.ts";

const site = lume({
  server: {
    middlewares: [serve_folder({ root: "./other-folder" })],
  },
});

export default site;
```
