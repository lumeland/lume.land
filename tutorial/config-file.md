---
step: 7
title: Create a config file
---

We have been using Lume with the default configuration. But in most cases you
will need to configure the site build to better adapt to your needs. There's the
`_config.ts` file for that purpose.

## Create a _config file

Although it can be created manually Lume provides the `lume init` command to
configure Lume and Deno easily.

After running `lume init`, Lume will ask you some questions:

### Use TypeScript for the configuration file

Type `y` (yes) to create the configuration file in TypeScript (it will create
the file `config.ts`), or `n` (no, by default) to create it in JavaScript.

### Plugins

Then, you can use some plugins provided by Lume. For now, let's skip this step
by pressing `Enter`.

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
    "build": "deno run -A https://deno.land/x/lume@v1.7.2/ci.ts",
    "serve": "deno task build -- -s"
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

To see all available options of the `_config.js` file
[See the config documentation](/docs/configuration/config-file.md) {.tip}

## Learn more

You have learn the basics of Lume.
[Go to the documentation](/docs/overview/about-lume.md) to become a Lume
expert!.
