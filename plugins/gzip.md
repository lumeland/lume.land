---
title: Gzip
description: Compress the files using gzip algorithm
mod: plugins/gzip.ts
tags:
  - optimization
---

Gzip is a file format that can be used by web servers and CDNs to compress the
HTTP content.

This plugin creates a precompressed version of your files, for example, in
addition to `/index.html`, it creates a compressed version at `/index.html.gz`.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import gzip from "lume/plugins/gzip.ts";

const site = lume();

site.use(gzip());

export default site;
```

By default only some text-based formats like `.html`, `.css`, `.js`, `.svg`,
`.json`, etc are compressed. Binary files like images or videos are not
compressed because most of them have their own compression. Use the `extensions`
option to configure which extensions do you want to compress:

```js
site.use(gzip({
  extensions: [".html", ".css"],
}));
```

## How to serve precompressed files

If you're on Deno Deploy, you can use the
[precompress](../docs/core/server.md#precompress) middleware that automatically
will serve the `.br` version if it's available and the browser supports it.

Many other web servers have the option to serve precompressed files, for example
[Nginx](https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html),
[Caddy](https://caddyserver.com/docs/caddyfile/directives/file_server#precompressed),
or frameworks like
[Hono](https://hono.dev/docs/getting-started/deno#precompressed),
[Fastify](https://github.com/fastify/fastify-static?tab=readme-ov-file#precompressed),
or [Koa](https://github.com/koajs/static?tab=readme-ov-file#options).
