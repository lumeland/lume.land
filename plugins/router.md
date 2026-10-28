---
title: Router
description: Middleware to provide a simple server-side router.
category: middleware
---

## Description

This middleware implements a simple router using the
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
standard. The first argument of the router handler is an object with all
captured variables in the path, and the `request` instance:

```js
const router = new Router();

router.get("/search/:id", ({ id, request }) => {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  return new Response(`Searching by ${query} in the file ${id}`);
});
```

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/16.server.md):

```js
import Server from "@lumeland/core/server.ts";
import Router from "@lumeland/plugin-router";

// Create the router
const router = new Router();

router.get("/hello/:name", ({ name }) => {
  return new Response(`Hello ${name}!`);
});

// Create the server and use the router:
const server = new Server();
server.use(router.middleware());

server.start();
```

### Local development

You can configure Lume's development server to use this middleware in the
`_config.ts` file. Let's say you have a `my-router.ts` file that exports a
`Router` instance:

```js
import lume from "@lumeland/lume";
import myRouter from "./my-router.ts";

const site = lume({
  server: {
    middlewares: [myRouter.middleware()],
  },
});

export default site;
```
