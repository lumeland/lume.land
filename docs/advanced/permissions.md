---
title: Permissions
description: Configure the Deno's permissions for Lume
---

Deno has a permission system that allows to configure the access to different
APIs like environment variables, read or write in the filesystem, net access,
etc. See the
[Deno's permissions manual](https://deno.land/manual/getting_started/permissions)
for more info.

Lume is executed with the `--allow-all` flag, allowing all permissions. This is
because the only way to configure the permissions is via the command line
interface. There's no way to configure the permissions in the Deno's config file
([there's an open issue for this](https://github.com/denoland/deno/issues/12763)).

The Lume task generated in the `deno.json` file use `eval` to run Lume:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "deno eval \"import 'lume/task.ts'\" --",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

The `deno eval` is used to resolve the `lume/task.ts` module with the import
map, allowing to update Lume by editing the `import_map.json` file. But this
command has implicit access to all permissions.

If you are concerned about the permissions granted to Lume and want to customize
them, it's possible by editing the `lume` task:

- Replace `deno eval` with `deno run`, to configure the permissions.
- Replace `lume/task.ts` with `lume/cli.ts`. Because `deno run` doesn't resolve
  the main module with the import map, you have to pass the full url:
  `https://deno.land/x/lume@v1.11.4/cli.ts`.
- The `--unstable` argument may be necessary for some `npm` modules or unstable
  APIs.

This is an example of a Lume task with some permissions configured:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "deno run --unstable --allow-net=localhost:3000 --allow-read=./ --allow-write=./_site https://deno.land/x/lume@v1.11.4/cli.ts",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

It seems this method
[has some issues with NPM modules](https://github.com/denoland/deno/issues/16218)
so for now it only works in Lume v1.11.x {.tip}
