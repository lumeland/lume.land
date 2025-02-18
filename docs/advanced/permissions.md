---
title: Permissions
description: Configure the Deno's permissions for Lume
---

Deno has a permission system that allows configuring access to different APIs
like environment variables, filesystem reads or writes, net access, etc. See the
[Deno permissions manual](https://docs.deno.com/runtime/manual/basics/permissions/)
for more info.

Lume is executed by default with the `-A` flag (or `--allow-all`), allowing all
permissions. The Lume task generated in the `deno.json` file uses the following
script to run Lume:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "echo \"import 'lume/cli.ts'\" | deno run -A -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

This scripts echoes `import 'lume/cli.ts'` and then executes it. This allows
resolving the `lume/cli.ts` module with the import map, so it's possible to
update Lume just by editing the `import_map.json` file.

If you are concerned about the permissions granted to Lume and want to customize
them, it's possible by replacing `-A` flag with your desired permission flags in
the `lume` task. For example:

This is an example of a Lume task with some permissions configured:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "echo \"import 'lume/cli.ts'\" | deno run --allow-net --allow-read=./ --allow-write=./_site -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```
