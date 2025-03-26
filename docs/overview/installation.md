---
title: Installation
description: How to install and upgrade Lume
order: 1
---

## Prerequisites

Lume is built with Deno, so make sure to have it
[installed](https://docs.deno.com/runtime/manual#install-deno) if you haven't
already done so.

## Setup Lume

To setup Lume in your project folder, run the following command:

```sh
deno run -A https://lume.land/init.ts
```

This command creates the following files:

<!-- deno-fmt-ignore-start -->

`_config.ts`
: [Lume's configuration file](../configuration/config-file.md),
where you can customize the site build.

`deno.json`
: [Deno's configuration file](https://docs.deno.com/runtime/manual/getting_started/configuration_file/).
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
    "lume": "echo \"import 'lume/cli.ts'\" | deno run -A -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  },
  "imports": {
    "lume/": "https://deno.land/x/lume@v3.0.0/"
  },
  "unstable": ["temporal"],
  "compilerOptions": {
    "types": [
      "lume/types.ts"
    ]
  }
}
```

</lume-code>

Now you can use
[Deno's tasks](https://docs.deno.com/runtime/manual/tools/task_runner/) to run
Lume in any environment. The command `deno task lume` runs Lume and you can add
additional arguments. For example, `deno task lume -s` runs Lume, opens a local
web server, and starts watching the changes.

The tasks `build` (to build the website) and `serve` (to build and start a local
server) are just shortcuts to the main `lume` task with additional arguments.
Run `deno task lume -h` to see all commands and options.

## Upgrade Lume

The task `deno task lume upgrade` upgrades the Lume version used in your project
folder to the latest version.

Use the argument `--dev` to upgrade to the latest development version (the most
recent commit in the [GitHub repository](https://github.com/lumeland/lume)).
It's useful to test new, unreleased Lume features.

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

Now when you run any Lume task, all Deno dependencies will be downloaded into
the `_vendor` folder.

## Visual Studio Code configuration

If you use Visual Studio Code, it's highly recommended to install the
[Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).

## WebStorm configuration

There's a [Deno plugin](https://plugins.jetbrains.com/plugin/14382-deno/) for
WebStorm that you can install if you use this IDE.
