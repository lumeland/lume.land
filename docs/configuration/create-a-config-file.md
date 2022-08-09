---
title: Create a config file
order: 1
---

**Lume** has a default behaviour that is enough for simple cases, but if you
want to copy or process additional files, use plugins or change some default
settings, you must create a configuration file.

The configuration file is a `_config.ts` or `_config.js`, saved in the site's
root directory.

## Create a _config file

Although it can be created manually Lume provides the `lume init` command to
configure Lume and Deno easily.

After running `lume init`, Lume will ask you a couple of questions:

- **Use TypeScript for the configuration file:** Type `y` (yes) to create the
  configuration file in TypeScript (it will create the file `config.ts`), or `n`
  (no, by default) to create it in JavaScript.

- **Plugins**: Then, you can use some plugins provided by Lume. This is a
  convenient way to import and use plugins.

Once the command finish you will see 3 new files:

- The `_config.js` or `_config.ts` file (it depends on your choice of using
  TypeScript or not) is the Lume configuration file where you can customize how
  your site is build.
- `import_map.json`. This is the file with the information about how to resolve
  the imported modules
  ([more info at Deno documentation](https://deno.land/manual/node/import_maps#using-import-maps)).
  It contains the `lume/` entry to allow to import Lume in the `_config.js` file
  as `lume/mod.ts` instead of using the full url. You may want to add other
  entries with your dependencies.
- `deno.json`. This is the file to configure some options for Deno
  ([more info at deno.land](https://deno.land/manual/getting_started/configuration_file)).
  It has the `importMap` key to configure Deno to use the `import_map.json` file
  just created. It also contains a couple of tasks to run Lume with
  `deno task build` and `deno task serve` (useful for environments without Lume
  installed as CLI).

This is an example of these three configuration files:

<lume-code>

```js {title="_config.js"}
import lume from "lume/mod.ts";

const site = lume();

export default site;
```

```json {title="deno.json"}
{
  "importMap": "import_map.json",
  "tasks": {
    "build": "deno task lume",
    "serve": "deno task lume -s",
    "lume": "deno eval \"import 'lume/task.ts'\" --"
  }
}
```

```json {title="import_map.json"}
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.7.2/"
  }
}
```

</lume-code>
