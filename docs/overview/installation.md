---
title: Installation
description: How to install and update Lume
order: 1
---

As Lume is run by Deno, read the
[Deno installation](https://deno.land/#installation) instructions if you don't
have it installed yet.

## Setup Lume

To setup Lume in your project folder, run the following command:

```sh
deno run -Ar https://deno.land/x/lume/init.ts
```

This command creates the following files:

- `_config.ts` or `_config.js`: The
  [Lume configuration file](../configuration/config-file.md), where you can
  customize the site build.
- `deno.json`: The
  [Deno's configuration file](https://deno.land/manual/getting_started/configuration_file).
  It includes the path of the import map file and some tasks to run Lume. You
  can also configure other features of Deno like TypeScript, formatter, linter,
  etc.
- `import_map.json`: The
  [import map file](https://deno.land/manual/node/import_maps#using-import-maps)
  with the import URL of Lume. Here you can add the dependencies of your project
  and update Lume by editing the version number.

Here is an example of these three configuration files:

<lume-code>

```js {title="_config.js"}
import lume from "lume/mod.ts";

const site = lume();

export default site;
```

```json {title="deno.json"}
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "echo \"import 'lume/cli.ts'\" | deno run --unstable -A -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

```json {title="import_map.json"}
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.11.4/"
  }
}
```

</lume-code>

Now you can use [Deno's tasks](https://deno.land/manual/tools/task_runner) to
run Lume in any environment. The command `deno task lume` runs Lume and you can
add additional arguments. For example `deno task lume -s` runs Lume, open a
local web server and start watching the changes.

The tasks `build` (to build the website) and `serve` (to build and start a local
server) are just shortcuts to the main `lume` task with additional arguments.

Run `deno task lume -h` to see the instructions.

## Setup Lume CLI on your computer

Due Lume uses Deno task to work, you need to type always
`deno task lume [...args]`, which is a bit verbose. To avoid typing `deno task`
all the time, you can install the [Lume CLI](https://github.com/lumeland/cli)
script with:

```
deno install --allow-run --name lume --force --reload https://deno.land/x/lume_cli/mod.ts
```

This creates the `lume` command:

- `lume init` will run the command
  `deno run -Ar https://deno.land/x/lume/init.ts` to initialize Lume in the
  current directory.
- `lume upgrade-cli` will upgrade the Lume CLI script to the latest version.
- Any other command will be delegated to `deno task lume [...args]`. For
  example, `lume -s` will run `deno task lume -s`.

## Update Lume

The task `deno task lume upgrade` (or `lume upgrade` on Lume CLI) upgrades the
Lume version used in your project folder to the latest version.

Use the argument `--dev` to ugrade to the latest development version (the last
commit in the [Github repository](https://github.com/lumeland/lume)). It's
useful to test new features of Lume not yet released.

## Visual Studio Code configuration

If you use Visual Studio Code, it's highly recommended to install the
[Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).

There are other extensions that you may want to install, depending on the
template engine you want to use. For example
[Nunjucks](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks),
[Liquid](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid),
[Eta](https://marketplace.visualstudio.com/items?itemName=shadowtime2000.eta-vscode),
[postcss](https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss),
etc.
