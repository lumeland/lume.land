---
title: Command line usage
description: Using the command line interface of Lume
order: 2
---

## Setup Lume CLI on your computer

Lume registers the `lume` command in your project that you can run with `npx` or with the NPM script runner.

## Build the site

Run the following to build your website:

```sh
npx lume build
```

This command compiles the source files to HTML and save them into the dest
directory (usually `_site`).

## Start a local server

Typically you will want to start a local server and open the site in your
browser. To do that, add the `--serve` (or `-s`) argument:

```sh
npx lume build -s
```

This command initializes a **local web server** and starts **watching the
changes** of the source files. If you edit any file, Lume will detect this
change, rebuild the site and refresh your browser automatically. The local
server use the port `3000` by default but you can change it with the `--port`
(or `-p`) argument. For example:

```sh
npx lume build -s --port=8000
```

To watch changes without starting a local server, use the `--watch` argument:

```sh
npx lume build --watch
```

## Debug

Use the `--inspect, -i` flag to start an
[inspect server](https://docs.deno.com/runtime/fundamentals/debugging/). Then,
you can open the `chrome://inspect` URL in any Chromium-based browser and add
breakpoints to debug your code:

```sh
npx lume build --inspect
```

The flag `--dry-run` build the site without writting the output in the disk and
return an error if the build generated any error, which is useful for CI
testing:

```sh
npx lume build --dry-run
```

## Help

Run `npx lume -h` to show all available commands and options.
