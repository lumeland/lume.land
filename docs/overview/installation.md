---
title: Installation
description: How to install and update Lume
order: 1
---

${toc}

As Lume is run by Deno, read the
[Deno installation](https://deno.land/#installation) instructions if you don't
have it installed yet.

## Don't install Lume

**Lume doesn't need to be installed**. The recommended way to use Lume is via
[Deno's tasks](https://deno.land/manual/tools/task_runner) so you can run for
example `deno task lume` in any environment with Deno and it just works.

To setup Lume in your project folder, run the following command:

```sh
deno run -A https://deno.land/x/lume/init.ts
```

This command creates the following files:

- `_config.ts` or `_config.js`: The
  [Lume configuration file](../configuration/config-file.md), where you can
  customize the site build.
- `deno.json`: The
  [Deno's configuration file](https://deno.land/manual/getting_started/configuration_file).
  It includes the path of the import map file and some tasks to run Lume. You
  can also configure other features of Deno like TypeScript, formatter,
  persmissions, etc.
- `import_map.json`: The
  [import map file](https://deno.land/manual/node/import_maps#using-import-maps)
  with the import url of Lume. Here you can add the dependencies of your project
  and update Lume by editing the version number.

This is an example of these three configuration files:

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
    "lume": "deno eval \"import 'lume/task.ts'\" --",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

```json {title="import_map.json"}
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.7.2/"
  }
}
```

</lume-code>

You can run Lume with `deno task build` (to build the site) or `deno task serve`
(to build and start a local server).

To upgrade Lume, just run `deno task lume upgrade`.

## Install Lume globally on your computer

It's also possible to install Lume globally by executing the following command:

```sh
deno run -A https://deno.land/x/lume/install.ts
```

Once installed, you have the `lume` command. To update Lume to the latest
version, use the command:

```sh
lume upgrade --global
```

The command `lume upgrade --dev` installs the latest development version (the
last commit in the [Github repository](https://github.com/lumeland/lume)). It's
useful to test new features of Lume not yet released.

Run `lume init` to create the `_config.js`, `deno.json` and `import_map.json`
files in your project.

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
