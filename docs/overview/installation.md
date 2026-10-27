---
title: Installation
description: How to install and upgrade Lume
order: 1
---

## Prerequisites

Lume is built with Node v24 LTS or newer, so make sure to have it
[installed](https://nodejs.org/en/download) if you haven't
already done so.

## Setup Lume

To setup Lume in your project folder, run the following command:

```sh
npm create lume
```

This command install Lume and all dependencies and create the following files:

`_config.ts`
: [Lume's configuration file](../configuration/config-file.md),
where you can customize the site build.

`tsconfig.json`
: [TypeScript configuration file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) with some configuration required by Lume. Useful to use TypeScript and TSX to build your site.
