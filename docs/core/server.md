---
title: Server
description: Set up a server for your site.
order: 8
---

${toc}

Lume includes a `Server` class used to start a local HTTP server when running
`lume --serve`. You can use this class to start your own server, for example to
serve the static files in **Deno Deploy**. Let's see a basic example of a
server:

```ts
import Server from "https:/deno.land/x/lume/core/server.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.start();

console.log("Listening on http://localhost:8000");
```

This code starts a local server in the port `8000` and serve the static files in
the `_site` folder.

## Events

You can assign event listeners to the server:

```ts
server.addEventListener("start", () => {
  console.log("Server started succesfully");
});
```

## Middlewares

To customize how the server handle the requests and responses, there's a simple
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

Lume provides some middlewares for common use cases:

```ts
import Server from "https:/deno.land/x/lume/core/server.ts";
import expires from "https:/deno.land/x/lume/middlewares/expires.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(expires());

server.start();

console.log("Listening on http://localhost:8000");
```

### basic_auth

Implements the
[basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
method to access to the site:

```js
server.use(basicAuth({
  users: {
    "user": "password",
  },
}));
```

### cache_busting

Cache busting is a way to tell the browser that some static files like CSS
styles or JavaScript code have changed, in order to use the new version instead
of the locally cached version. It consist of including the number version in the
file path, for example `/styles.css` becomes to `/v234/styles.css`.
[More info](https://www.keycdn.com/support/what-is-cache-busting).

This middleware implements cache busting, so all requests with paths starting
with `/v{numbers}` will remove this part so the real file will be served.

### expires

It's a middleware to include the `Expires` header to the response for better
caching. See the
[available options in Deno Doc](https://doc.deno.land/https://deno.land/x/lume/middlewares/expires.ts/~/Options).

### logger

To show in the console the HTTP requests/responses served. It's used by Lume in
the `--serve` mode.

### no_cache

Modify the responses to disable the browser cache. It's used by Lume in the
`--serve` mode.

### not_found

To show a not-found page on 404 errors. Optionally can create a directoryIndex
for folders. It's used by Lume in the `--serve` mode. See the
[available options in Deno Doc](https://doc.deno.land/https://deno.land/x/lume/middlewares/not_found.ts/~/Options).

### on_demand

To build and serve dynamic pages on demand. See the
[available options in Deno Doc](https://doc.deno.land/https://deno.land/x/lume/middlewares/on_demand.ts/~/Options).

### redirects

Middleware to configure a list of redirects of some paths. Example:

```js
server.use(redirects({
  redirects: {
    "/from/": "/to/",
    "/from2/": "/to2/",

    // Use an object to configure the status code. (301 by default)
    "/from3/": {
      to: "/to2/",
      code: 302,
    },
  },
}));
```

### reload

To implement a live-reload in the browser after file changes. It's used by Lume
in the `--serve` mode. See the
[available options in Deno Doc](https://doc.deno.land/https://deno.land/x/lume/middlewares/reload.ts/~/Options).
