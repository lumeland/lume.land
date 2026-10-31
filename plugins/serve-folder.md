---
title: Serve folder
description: Middleware to add additional folders to the server.
category: middleware
oldUrl: /plugins/serve_folder/
---

## Description

Middleware to add additional folders to the server. Useful to serve more static
files stored in a different place.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/16.server.md):

```js
import Server from "@lumeland/core/server.ts";
import serve_folder from "@lumeland/plugin-serve-folder";

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
import lume from "@lumeland/lume";
import serve_folder from "@lumeland/plugin-serve-folder";

const site = lume({
  server: {
    middlewares: [serve_folder({ root: "./other-folder" })],
  },
});

export default site;
```
