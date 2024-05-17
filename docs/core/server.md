---
title: Server
description: Set up a server for your site.
order: 8
---

Lume includes a `Server` class used to run a HTTP server. You can use this class
to start your own server, for example, to serve the static files in **Deno
Deploy**. Let's see a basic example of a server:

```ts
import Server from "https:/deno.land/x/lume/core/server.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.start();

console.log("Listening on http://localhost:8000");
```

This code starts a local server on the port `8000` and serves the static files
in the `_site` folder.

## Events

You can assign event listeners to the server:

```ts
server.addEventListener("start", () => {
  console.log("Server started successfully");
});
```

## Middlewares

To customize how the server handles the requests and responses, there's a simple
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
of the locally cached version. It consists of including the number version in
the file path. For example `/styles.css` becomes `/v234/styles.css`.
[More info](https://www.keycdn.com/support/what-is-cache-busting).

This middleware implements cache busting, so all requests with paths starting
with `/v{numbers}` will remove this part so the real file will be served.

### expires

It's a middleware to include the `Expires` header in the response for better
caching. See the
[available options in Deno Doc](https://doc.deno.land/https://deno.land/x/lume/middlewares/expires.ts/~/Options).

### logger

To show in the console the HTTP requests/responses served. It's used by Lume in
the `--serve` mode.

### no_cache

Modify the responses to disable the browser cache. It's used by Lume in the
`--serve` mode.

### not_found

To show a not-found page on 404 errors. Optionally it can create a
directoryIndex for folders. It's used by Lume in the `--serve` mode. See the
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

### serve_folder

Middleware to add additional folders to the server. Useful to serve more static
files stored in a different place.

```js
server.use(serve_folder({
  root: "./other-folder",
}));

// Serve the files in this folder only if they don't exist in the main folder.
server.use(serve_folder({
  root: "./fallback-files",
  after: true,
}));
```

### reload

To implement a live-reload in the browser after file changes. It's used by Lume
in the `--serve` mode. See the
[available options in Deno Doc](https://doc.deno.land/https://deno.land/x/lume/middlewares/reload.ts/~/Options).

### shutdown

Useful to show a page while your site is shutted down. All request to HTML pages
returns the content of the `/503.html` file and the `503` status code. It also
sends the `Retry-After` header.

```js
server.use(shutdown({
  page: "/maintenance.html", // The page to show. /503.html by default.
  retryAfter: 60 * 60, // The Retry-After header content in seconds. 24 hours by default.
}));
```

### www

This middleware redirects from `www.` domains to non-www domain (or viceversa).

```js
server.use(www({
  add: false, // false to remove, true to add it.
}));
```

See the
[available options in Deno Doc](https://doc.deno.land/https://deno.land/x/lume/middlewares/www.ts/~/Options).
