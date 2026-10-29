---
title: Migrate to Lume 4
description: Guide to migrate your project from Lume 3 to Lume 4
---

Lume 4 runs on Node, so make sure you have installed the version 24 or newer in your computer. See [Node documentation](https://nodejs.org/en/download) for more info.

Lume is published on NPM under the [`@lumeland` organization](https://www.npmjs.com/org/lumeland):

- The main package is [`@lumeland/lume`](https://www.npmjs.com/package/@lumeland/lume).
- Plugins have the name format `@lumeland/plugin-*` (for example [@lumeland/plugin-esbuild](https://www.npmjs.com/package/@lumeland/plugin-esbuild)).
- The standalone CMS is [`@lumeland/cms`](https://www.npmjs.com/package/@lumeland/cms), and to use it with Lume you need the plugin [`@lumeland/plugin-cms`](https://www.npmjs.com/package/@lumeland/plugin-cms).

For example, the typical `_config.ts` file in Lume 3:

```ts
// Lume 3 (Deno)
import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";

const site = lume();

site.use(basePath());

export default site;
```

Will become as follows in Lume 4:

```ts
// Lume 4 (Node)
import lume from "@lumeland/lume";
import basePath from "@lumeland/plugin-base-path";

const site = lume();

site.use(basePath());

export default site;
```

## Command line interface

Lume 4 registers the `lume` binary command in NPM. The `build` and `serve` tasks in Deno are now NPM scripts. Make sure you have this in your `package.json`:

```json
{
    "scripts": {
        "serve": "lume build -s",
        "build": "lume build"
    }
}
```

Now you can run `npm run serve` and `npm run build` to server and build the site. With other package managers like `pnpm` or `yarn` is even shorter: `pnpm serve` and `pnpm build`.

## Automatic migration

The way to setup Lume 3 for new projects was using the init script `deno run -A https://lume.land/init.ts`. The equivalent script in Lume 4 is `npm create lume`. You can specify the project folder in the first argument. For example `npm create lume .` will create a new project in the current folder.

The script detects if the folder already contains a Lume project and will ask you to migrate it to Node. If you confirm this action, it will create the files `package.json` and `tsconfig.json` and will install all dependencies detected in the `deno.json` and `_config.ts` files.

Note that this migration may not be complete. Depending on your site and configuration, maybe you need additional changes in your code. The script doesn't remove the Deno files (like `deno.json`), just create the new files so once your site is completely migrated, you will need to remove these files by yourself.

