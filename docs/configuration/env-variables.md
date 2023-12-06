---
title: Environment variables
description: Available environment variables to configure Lume
order: 7
---

Lume has the following environment variables that you can use with
`deno task lume`:

`LUME_DRAFTS` : All pages with the variable `draft: true` are ignored by Lume.
With this variable you can configure Lume to export the draft variables too.
Useful for development environments.

```
LUME_DRAFTS=true deno task lume
```

`LUME_LOG` : Lume uses the following log levels: `DEBUG`, `INFO`, `WARNING`,
`ERROR` and `CRITICAL`. By default is `INFO`, you can change it with this
environment variable to have more or less details of the build process. For
example, to only show critical errors, hiding everything else:

```
LUME_LOG=critical deno task lume
```
