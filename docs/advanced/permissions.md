---
title: Permissions
description: Configure the Deno's permissions for Lume
---

Deno has a permission system that allows to configure the access to different
APIs like environment variables, read or write in the filesystem, net access,
etc. See the
[Deno's permissions manual](https://deno.land/manual/getting_started/permissions)
for more info.

Lume is executed by default with the `-A` flag (or `--allow-all`), allowing all
permissions. The Lume task generated in the `deno.json` file use the following
script to run Lume:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "echo \"import 'lume/cli.ts'\" | deno run --unstable -A -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

This scripts echo the `import 'lume/cli.ts'` code and then it. This allows to
resolve the `lume/cli.ts` module with the import map, so it's possible to update
Lume just editing the `import_map.json` file.

If you are concerned about the permissions granted to Lume and want to customize
them, it's possible by replacing `-A` flag with your desired permissions flags
in the `lume` task. For example:

This is an example of a Lume task with some permissions configured:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "echo \"import 'lume/cli.ts'\" | deno run --unstable --allow-net --allow-read=./ --allow-write=./_site -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

It seems this method
[has some issues with NPM modules](https://github.com/denoland/deno/issues/16218)
so for now it only works in Lume v1.11.x {.tip}
