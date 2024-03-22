---
title: Installation
description: How to install and update Lume
order: 1
---

As Lume is run by Deno, read the
[Deno installation](https://docs.deno.com/runtime/manual#install-deno)
instructions if you don't have it installed yet.

## Setup Lume

To setup Lume in your project folder, run the following command:

```sh
deno run -Ar https://lume.land
```

This command creates the following files:

<!-- deno-fmt-ignore-start -->

`_config.ts`
: The [Lume configuration file](../configuration/config-file.md),
where you can customize the site build.

`deno.json`
: The
[Deno's configuration file](https://deno.land/manual/getting_started/configuration_file).
It includes the import map and some tasks to run Lume. You can also configure
other features of Deno like TypeScript, formatter, linter, etc.

<!-- deno-fmt-ignore-end -->

Here is an example of these two configuration files:

<lume-code>

```js {title="_config.ts"}
import lume from "lume/mod.ts";

const site = lume();

export default site;
```

```json {title="deno.json"}
{
  "tasks": {
    "lume": "echo \"import 'lume/cli.ts'\" | deno run --unstable -A -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  },
  "imports": {
    "lume/": "https://deno.land/x/lume@v2.0.0/"
  },
  "compilerOptions": {
    "types": [
      "lume/types.ts"
    ]
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

Lume uses Deno task to work, so you need to type always
`deno task lume [...args]`, which is a bit verbose. To avoid typing `deno task`
all the time, you can install the [Lume CLI](https://github.com/lumeland/cli)
script with:

```sh
deno install --allow-run --allow-env --allow-read --name lume --force --reload https://deno.land/x/lume_cli/mod.ts
```

This creates the `lume` command:

- `lume init` will run the command `deno run -Ar https://lume.land` to
  initialize Lume in the current directory.
- `lume upgrade-cli` will upgrade the Lume CLI script to the latest version.
- Any other command will be delegated to `deno task lume [...args]`. For
  example, `lume -s` will run `deno task lume -s`.
- The CLI command has also some useful shorcuts like `--drafts` (to create the
  `LUME_DRAFTS=true` environment variable) and `--debug`, `--info`, `--warning`,
  `--error` and `--critical` to change the `LUME_LOGS` environment variable.

## Update Lume

The task `deno task lume upgrade` (or `lume upgrade` on Lume CLI) upgrades the
Lume version used in your project folder to the latest version.

Use the argument `--dev` to ugrade to the latest development version (the last
commit in the [Github repository](https://github.com/lumeland/lume)). It's
useful to test new features of Lume not yet released.

## Vendoring

If you want to download all remote dependencies of Deno in a local folder, you
can use the `DENO_DIR` environment variable. For example, edit the `lume` task
to define this variable:

```json
{
  "tasks": {
    "lume": "echo \"import 'lume/cli.ts'\" | DENO_DIR=_vendor deno run -A -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

Now, when you run any Lume task, all Deno dependencies will be downloaded into
the `_vendor` folder.

## Visual Studio Code configuration

If you use Visual Studio Code, it's highly recommended to install the
[Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).

## WebStorm configuration

There's a [Deno plugin](https://plugins.jetbrains.com/plugin/14382-deno/) for
WebStorm that you can install if you use this IDE.
