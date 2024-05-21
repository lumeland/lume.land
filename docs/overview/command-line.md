---
title: Command line usage
description: Using the command line interface of Lume
order: 2
---

The following examples assume that you are using Lume as a Deno task.

If you have [Lume CLI](https://deno.land/x/lume_cli) installed, the commands are
similar but removing the `deno task` part. For example `deno task lume --serve`
becomes `lume --serve`.

## Build the site

Run the following to build your website:

```sh
deno task lume
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
```

To watch changes without starting a local server, use the `--watch` argument:

```sh
deno task lume --watch
```

## Help

Run `deno task lume -h` to show all available commands and options.
