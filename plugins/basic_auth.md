---
title: Basic Auth
description: Implements HTTP Basic Authentication
mod: middlewares/basic_auth.ts
tags:
  - middleware
---

## Description

Middleware to protect the access to the site with
[basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/server.md). To use it in production, you need
a host running a Deno server, like [Deno Deploy](https://deno.com/deploy).

Create an entry point file (for example, `serve.ts`) with the following code:

```ts
import Server from "lume/core/server.ts";
import basicAuth from "lume/middlewares/basic_auth.ts";

const server = new Server();

server.use(basicAuth({
  users: {
    user1: "password1",
    user2: "password2",
  },
}));

server.start();
```

> [!important]
>
> For security, it's not recommended to have the users and passwords hardcoded
> in your code. It's recommended to use environment variables, for example:
>
> ```js
> const user = Deno.env.get("AUTH_USERNAME");
> const password = Deno.env.get("AUTH_PASSWORD");
>
> server.use(basicAuth({
>   users: {
>     [user]: password,
>   },
> }));
> ```

### Local development

You can configure Lume's development server to use this middleware in the
`_config.ts` file:

```js
import lume from "lume/mod.ts";
import basicAuth from "lume/middlewares/basic_auth.ts";

const site = lume({
  server: {
    middlewares: [
      basicAuth({
        users: { demo: "1234" },
      }),
    ],
  },
});

export default site;
```
