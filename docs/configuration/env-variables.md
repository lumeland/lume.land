---
title: Environment variables
description: Available environment variables to configure Lume
order: 7
---

Lume has the following environment variables that you can use with
`deno task lume`:

<!-- deno-fmt-ignore-start -->
`LUME_DRAFTS`
: All pages with the variable `draft: true` are ignored by Lume.
  With this variable you can configure Lume to process draft pages too,
  which is useful for development environments.

  ```
  LUME_DRAFTS=true deno task lume
  ```

`LUME_LOGS`
: Lume uses the following log levels: `DEBUG`, `INFO`, `WARNING`,
  `ERROR` and `CRITICAL`. By default, it is `INFO`, but you can change it with this
  environment variable to have more or less details of the build process. For
  example, to only show critical errors, hiding everything else:

  ```
  LUME_LOGS=critical deno task lume
  ```

`LUME_NOCACHE`
: Lume has a cache for [remote files](../core/remote-files.md),
  so they are downloaded only once. Use this environment variable to disable it.

  ```
  LUME_NOCACHE=true deno task lume
  ```
