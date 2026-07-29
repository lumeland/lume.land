---
title: Command line usage
description: Using the command line interface of Lume
order: 2
---

## Setup Lume CLI on your computer

Lume uses [Deno tasks](https://docs.deno.com/runtime/reference/cli/task_runner/)
to run it, so you only have to type `deno task lume [...args]` to run any Lume
command.

Some people can find this a bit verbose, so if you don't want to type
`deno task ...` all the time, you can install the
[Lume CLI](https://github.com/lumeland/cli) script with:

```sh
deno install --allow-run --allow-env --allow-read --name lume --force --reload --global https://deno.land/x/lume_cli/mod.ts
```

This script creates the `lume` command with the following subcommands:

- `lume init` is a shortcut for `deno run -A https://lume.land/init.ts` to
  initialize Lume in the current directory.
- `lume upgrade` upgrades the version of Lume, LumeCMS and any known theme to
  the latest version.
- `lume upgrade-cli` upgrades Lume CLI to the latest version.
- Any other command is delegated to `deno task lume [...args]`. For example,
  `lume -s` is equivalent to running `deno task lume -s`.
- The CLI command has also some useful shortcuts like `--drafts` (to create the
  `LUME_DRAFTS=true` environment variable) and `--debug`, `--info`, `--warning`,
  `--error` and `--critical` to change the `LUME_LOGS` environment variable.

Because Lume CLI is optional, in the documentation we will use the long syntax
(`deno task lume ...`) that works everywere.

## Build the site

Run the following to build your website:

```sh
deno task lume
```

This command compiles the source files to HTML and save them into the dest
directory (usually `_site`).

> [!tip]
>
> There's the `deno task build` task as an alias.

## Start a local server

Typically you will want to start a local server and open the site in your
browser. To do that, add the `--serve` (or `-s`) argument:

```sh
deno task lume -s
```

> [!tip]
>
> There's the `deno task serve` task as an alias.

This command initializes a **local web server** and starts **watching the
changes** of the source files. If you edit any file, Lume will detect this
change, rebuild the site and refresh your browser automatically. The local
server use the port `3000` by default but you can change it with the `--port`
(or `-p`) argument. For example:

```sh
deno task lume -s --port=8000
```

To watch changes without starting a local server, use the `--watch` argument:

```sh
deno task lume --watch
```

## Debug

Use the `--inspect, -i` flag to start an
[inspect server](https://docs.deno.com/runtime/fundamentals/debugging/). Then,
you can open the `chrome://inspect` URL in any Chromium-based browser and add
breakpoints to debug your code:

```sh
deno task serve --inspect
```

The flag `--dry-run` build the site without writting the output in the disk and return an error if the build generated any error, which is useful for CI testing:

```sh
deno task build --dry-run
```

## Help

Run `deno task lume -h` to show all available commands and options.
