---
title: Cache Busting
description: Implements server side cache busting
mod: middlewares/cache_busting.ts
tags:
  - middleware
  - optimization
---

## Description

Cache busting is a way to tell the browser that some static files like CSS
styles or JavaScript code have changed, in order to use the new version instead
of the locally cached version. It consists of including the number version in
the file path. For example `/styles.css` becomes `/v234/styles.css`.
[More info](https://www.keycdn.com/support/what-is-cache-busting).

This middleware implements cache busting, so all requests with paths starting
with `/v{numbers}` will remove this part so the real file will be served.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```ts
import Server from "lume/core/server.ts";
import cacheBusting from "lume/middlewares/cache_busting.ts";

const server = new Server();

server.use(cacheBusting());

server.start();
```

### Local development

You can configure Lume's development server to use this middleware in the
`_config.ts` file:

```js
import lume from "lume/mod.ts";
import cacheBusting from "lume/middlewares/cache_busting.ts";

const site = lume({
  server: {
    middlewares: [cacheBusting()],
  },
});

export default site;
```
