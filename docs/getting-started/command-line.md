---
title: Command line usage
description: Using Lume on the command line
order: 2
---

These examples assume that you have installed Lume as the `lume` executable:

## Build the site

To build your website, simply run:

```sh
lume
```

This command will compile your documents to HTML and save them into the dest
directory (usually `_site`).

Typically you will want to see the site in your browser so to start a local
server with your site, add the `--serve` (or `-s`) argument:

```sh
lume --serve
```

This command init a **local web server** and starts **watching the changes** of
your site. So if you edit anything, Lume will rebuild the site and reload
automatically your browser with the new changes. The local server use the port
`3000` by default but you can change it with the `--port` argument. For example:

```sh
lume --serve --port=8000
```

If you don't want to start a local server but want to watch the changes, use the
`--watch` (or `-w`) argument:

```sh
lume --watch
```

## Create a config file

Lume don't need a config file to work, but is required to change the default
behavior like adding plugins, ignore files, etc. The
[config file](config-file.md) is very simple and you can create it by yourself,
but for convenience you can use the following command.

```sh
lume init
```

This will create a config file for you, after some questions. It also can
configure [VS Code](https://code.visualstudio.com/) if you use this code editor
with the
[Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).

## Other commands

There are other useful commands like:

- `lume -V`: to show the current version.
- `lume upgrade`: to upgrade Lume to the latest version.
- `lume run`: to run a custom script.

To see all available commands and arguments, run `lume --help`.

## Passing arguments to Deno

Deno CLI has some options that can be interesting for your site build. For
example,
[Node.js compatiblity mode](https://deno.land/manual/npm_nodejs/compatibility_mode)
with `--compat` flag,
[a configuration file](https://deno.land/manual/getting_started/configuration_file)
with `--config=<FILE>` or a
[import map file](https://deno.land/manual@v1.16.1/linking_to_external_code/import_maps)
with `--import-map=<FILE>`.

Lume CLI runs Deno CLI with some arguments predefined, but you can customize
them including the Deno arguments after `--`. For example, if you want to run
Lume with a custom import map and Node compatibility:

```
lume -- --import-map=import_map.json --compat
```
