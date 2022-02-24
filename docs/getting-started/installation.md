---
title: Installation
description: Installing Lume
order: 1
---

**Lume** requires Deno (v1.18.1 or newer) being installed on your computer. Read
the [Deno installation](https://deno.land/#installation) instructions if you
don't have it yet.

## Install Lume on your computer

The easiest way to install Lume is by executing the following command:

```sh
deno run -A https://deno.land/x/lume/install.ts
```

Now you have the `lume` command.\
Once installed, you can update Lume to the latest version by running:

```sh
lume upgrade
```

Note: If you get an error upgrading from an old versions of Lume, just install
it again.

Use the command `lume upgrade --dev` to install the latest development version
(the last commit in the [Github repository](https://github.com/lumeland/lume)).
It's useful to test new features of Lume before released.

## Execute it without install

The `ci.ts` file works exactly like the `lume` command but without installation.
It's useful for CI environments:

```sh
deno run -A https://deno.land/x/lume/ci.ts
```
