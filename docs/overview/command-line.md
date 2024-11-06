---
title: Command line usage
description: Using the command line interface of Lume
order: 2
---

## Setup Lume CLI on your computer

Lume uses [Deno tasks](https://docs.deno.com/runtime/reference/cli/task_runner/)
to work, so you only have to type `deno task lume [...args]` to run any lume
command.

Some people can find this a bit verbose, so if you don't want to type
`deno task ...` all the time, you can install the
[Lume CLI](https://github.com/lumeland/cli) script with:

```sh
deno install --allow-run --allow-env --allow-read --name lume --force --reload --global https://deno.land/x/lume_cli/mod.ts
```

This script creates the `lume` command with the following subcommands:

- `lume init` runs the command `deno run -A https://lume.land/init.ts` to
  initialize Lume in the current directory.
- `lume upgrade` upgrades the version of Lume, LumeCMS and any known theme to
  the latest version.
- `lume upgrade-cli` upgrades Lume CLI to the latest version.
- Any other command will be delegated to `deno task lume [...args]`. For
  example, `lume -s` is equivalent to running `deno task lume -s`.
- The CLI command has also some useful shortcuts like `--drafts` (to create the
  `LUME_DRAFTS=true` environment variable) and `--debug`, `--info`, `--warning`,
  `--error` and `--critical` to change the `LUME_LOGS` environment variable.

## Build the site

Run the following to build your website:

```sh
deno task lume

# or with Lume CLI
lume
```

This command compiles your documents to HTML and save them into the dest
directory (usually `_site`).

> [!tip]
>
> There's the `deno task build` task as an alias.

## Start a local server

Typically you will want to open the site in your browser so you can start a
local server by adding the `--serve` (or `-s`) argument:

```sh
deno task lume --serve

# or with Lume CLI
lume --serve
```

> [!tip]
>
> There's the `deno task serve` task as an alias.

This command initializes a **local web server** and starts **watching changes**
of your site. So after changing anything, Lume will rebuild the site and reload
your browser automatically with the new changes. The local server use the port
`3000` by default but you can change it with the `--port` argument. For example:

```sh
deno task lume --serve --port=8000

# or with Lume CLI
lume --serve --port=8000
```

To watch changes without starting a local server, use the `--watch` argument:

```sh
deno task lume --watch

# or with Lume CLI
lume --watch
```

## Help

Run `deno task lume -h` to show all available commands and options.
