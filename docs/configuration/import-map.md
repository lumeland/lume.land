---
title: Deno & Import map
description: Configure deno and a Import map for your site
order: 6
---

${toc}

In JavaScript, the modules are imported using their urls. For example:

```js
import moduleName from "./module-file.js";
```

But this behavior can be changed with import maps. See
[Deno documentation of import maps for more info](https://deno.land/manual/linking_to_external_code/import_maps).

In Lume, the import map is injected automatically if it's not specified. This is
the reason why in the `_config.ts` file you can import Lume modules without
expecifying the full path:

```js
import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
```

## Creating an import map file

Instead of letting Lume to add an import map dynamically, you may want to have
your own import map file in order to add additional imports. To create a import
map file, run the command `lume import-map`. Then you will see 2 new files:

- `import_map.json`. This is the Lume's default import map with the Lume
  imports. You can edit this file to include your own imports.
- `deno.json`. It's detected and used automatically by Deno to configure things
  like the TypeScript compiler, formatter or linter. It also contains the
  location of the import map file to use. See
  [more info in Deno docs](https://deno.land/manual/getting_started/configuration_file).

## Deno configuration file

The `deno.json` file created by Lume is similar to this:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "build": "deno run -A https://deno.land/x/lume@v1.7.0/ci.ts",
    "serve": "deno task build -- -s"
  }
}
```

- The `importMap` key contains the path of the import map file used by Deno.
  This means the next time you run the `lume` command, this file will be used.
- The `tasks` key contains the tasks `build` and `serve`. This allows to run
  Lume without the `lume` command, with `deno task build` and `deno task serve`.

Deno supports `deno.json` and `deno.jsonc` extensions, but Lume only supports
`deno.json`. {.tip}

If you use VS Code with the Deno extension installed, this file will be detected
and used automatically. {.tip}
