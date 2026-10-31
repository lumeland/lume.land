---
title: Expires
description: Middleware to add the Expires header to HTTP responses
category: middleware
---

## Description

Middleware to set the `Expires` header in the response for better caching.

## Installation

This middeware must be used with the
[Lume's HTTP Server](../docs/core/16.server.md):

```ts
import Server from "@lumeland/core/server.ts";
import expires from "@lumeland/plugin-expires";

const server = new Server();

server.use(expires());

server.start();
```

### Local development

It's not recommended to use this middleware in local development because the
whole point of a local server is to not cache resources and to ensure serving
the most fresh version of your content.
