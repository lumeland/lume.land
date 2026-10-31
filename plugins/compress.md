---
title: Compress
description: Compress files using Brotli or Gzip
category: compress
oldUrl:
  - /plugins/brotli/
  - /plugins/gzip/
  - /plugins/precompress/
---

This plugin creates a precompressed version of your files. For example, in
addition to `/index.html`, it creates a compressed version at `/index.html.br` (for Brotli) or `/index.html.gz` (for Gzip).

Brotli is a lossless data compression algorithm developed by Google and
primarily used by web servers and CDNs to compress the HTTP content. It's used
as an alternative to gzip on the web as it provides better overall compression.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import compress from "@lumeland/compress";

const site = lume();

site.use(compress({
  format: "brotli", // by default is gzip
}));

export default site;
```

By default, only some text-based formats like `.html`, `.css`, `.js`, `.svg`,
`.json`, etc are compressed. Binary files like images or videos are not
compressed because most of them have their own compression. Use the `extensions`
option to configure which extensions do you want to compress:

```js
site.use(
  compress({
    extensions: [".html", ".css"],
  }),
);
```

## How to serve precompressed files

Many other web servers have the option to serve precompressed files, for example
[Caddy](https://caddyserver.com/docs/caddyfile/directives/file_server#precompressed),
or frameworks like
[Hono](https://hono.dev/docs/getting-started/deno#precompressed),
[Fastify](https://github.com/fastify/fastify-static?tab=readme-ov-file#precompressed),
or [Koa](https://github.com/koajs/static?tab=readme-ov-file#options).

This plugin also provides a middleware that you can use to serve files with Lume's server:

```ts
import Server from "@lumeland/core/server.ts";
import precompress from "@lumeland/plugin-compress/middleware.ts";

const server = new Server();

server.use(precompress());

server.start();
```
