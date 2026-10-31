---
title: Installation
description: How to install and upgrade Lume
order: 1
---

## Prerequisites

Lume requires Node v24 LTS or newer, so make sure to have it
[installed](https://nodejs.org/en/download) if you haven't
already done so.

## Setup Lume

To create a Lume project faster, run the following command:

<lume-code>

```sh {title="npm"}
npm create lume
```

```sh {title="pnpm"}
pnpm create lume
```

```sh {title="yarn"}
yarn create lume
```

</lume-code>

This command installs Lume and create the following files:

`_config.ts`
: [Lume's configuration file](../configuration/config-file.md),
where you can customize the site build.

`package.json`
: The NPM dependencies and a couple of scripts: `serve` (to start a development server) and `build` (to build the site for production).

`tsconfig.json`
: [TypeScript configuration file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) with some configuration required by Lume. Useful to use TypeScript and TSX to build your site.

`index.md`
: A markdown file with a simple "hello world" that servers as a demonstration.
