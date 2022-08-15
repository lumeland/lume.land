---
title: Command line usage
description: Using the command line interface of Lume
order: 2
---

${toc}

The following examples assume that you are using Lume as a Deno's task.

The commands for the globally installed Lume are the same but removing the
`deno task` part. For example `deno task lume --serve` becomes to
`lume --serve`.

## Build the site

To build your website, simply run:

```sh
deno task lume
```

This command will compile your documents to HTML and save them into the dest
directory (usually `_site`).

You have also the `deno task build` task as an alias.{.tip}

### Start a local server

Typically you will want to see the site in your browser so to start a local
server with your site, add the `--serve` (or `-s`) argument:

```sh
deno task lume --serve
```

You have also the `deno task serve` task as an alias.{.tip}

This command init a **local web server** and starts **watching the changes** of
your site. So if you edit anything, Lume will rebuild the site and reload
automatically your browser with the new changes. The local server use the port
`3000` by default but you can change it with the `--port` argument. For example:

```sh
deno task lume --serve --port=8000
```

To watch changes without starting a local server, use the `--watch` argument:

```sh
deno task lume --watch
```

## Other commands

There are other useful commands like:

- `deno task lume -V`: to show the current version.
- `deno task lume run <SCRIPT>`: to run a custom script.
- `deno task lume vendor`: to download the Lume vendors in the `_vendor`
  directory. See [Deno docs](https://deno.land/manual/tools/vendor).
