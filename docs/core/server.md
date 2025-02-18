---
title: Server
description: Set up a server for your site.
order: 10
---

Lume includes a `Server` class used to run a HTTP server. You can use this class
to start your own server, for example, to serve the static files in **Deno
Deploy**. Let's see a basic example of a server:

```ts
import Server from "lume/core/server.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.start();

console.log("Listening on http://localhost:8000");
```

This code starts a local server on port `8000` and serves static files from the
`_site` folder.

## Events

You can assign event listeners to the server:

```ts
server.addEventListener("start", () => {
  console.log("Server started successfully");
});
```

## Middleware

To customize how the server handles requests and responses, there's a simple
middleware system with the following signature:

```js
server.use(async (request, next) => {
  // Here you can modify the request before being passed to next middlewares
  const response = await next(request);

  // Here you can modify the response before being returned to the previous middleware
  return response;
});
```

The request and response objects are standard
[`Request`](https://developer.mozilla.org/docs/Web/API/Request) and
[`Response`](https://developer.mozilla.org/docs/Web/API/Response) classes, no
magic here.

Lume provides some middleware for common use cases:

```ts
import Server from "lume/core/server.ts";
import expires from "lume/middlewares/expires.ts";

const server = new Server();

server.use(expires());

server.start();
```

Go to [Plugins/middleware](/plugins/?status=all&middleware=on) for a list of all
middleware plugins provided by Lume.
