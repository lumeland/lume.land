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

If you get an error upgrading from an old versions of Lume, just install it
again. { .tip }

Use the command `lume upgrade --dev` to install the latest development version
(the last commit in the [Github repository](https://github.com/lumeland/lume)).
It's useful to test new features of Lume before released.

## Execute it without install

The `ci.ts` file works exactly like the `lume` command but without installation.
It's useful for CI environments:

```sh
deno run -A https://deno.land/x/lume/ci.ts
```

## Docker image

There's a docker image at
[oscarotero/lume](https://hub.docker.com/r/oscarotero/lume) that you can use for
some CI environments.
