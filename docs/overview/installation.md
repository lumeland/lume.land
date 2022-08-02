---
title: Installation
description: How to install and update Lume
order: 1
---

${toc}

**Lume** requires Deno. Read the
[Deno installation](https://deno.land/#installation) instructions if you don't
have it yet.

## Install Lume on your computer

The easiest way to install Lume is by executing the following command:

```sh
deno run -A https://deno.land/x/lume/install.ts
```

Once installed, you will have the `lume` command.

## Upgrade to the latest version

To update Lume to the latest version, use the command:

```sh
lume upgrade
```

If you get an error upgrading from an old versions of Lume, just reinstall it.
{.tip}

Use the command `lume upgrade --dev` to install the latest development version
(the last commit in the [Github repository](https://github.com/lumeland/lume)).
It's useful to test new features of Lume before released.

## Execute it without install

The `ci.ts` file works exactly like the `lume` command but without installation.
It's useful for CI environments:

```sh
deno run -A https://deno.land/x/lume/ci.ts
```

## Install Lume as a Deno task

The command `lume init` creates a
[configuration file](../configuration/config-file.md) and a `deno.json` file
with some [deno tasks](https://deno.land/manual/tools/task_runner). This allows
to run Lume in any environment with `deno task build` (to build the site) or
`deno task serve` (to build and start a local server). Deno tasks is already an
unstable feature but as soon as is stabilized, it will be **the recommended way
to run Lume.**

If you don't have `lume` installed in your computer, you can run:

```sh
deno run -A https://deno.land/x/lume/init.ts
```
