---
step: 7
title: Create a config file
---

We have been using Lume with the default configuration. But most of the time you
will need to configure how the site must be built to better adapt to your needs.
There's the `_config.ts` file for that purpose.

## Create a _config file

The config file is very simple and you can create it manually but Lume provides
the `lume init` command that will create a config file in a interactive way.

After running `lume init`, Lume will ask you some questions:

### Use TypeScript for the configuration file

Type `y` (yes) to create the configuration file in TypeScript (it will create
the file `config.ts`), or `n` (no, by default) to create it in JavaScript.

### Import style

You can import Lume in three different ways.

1. `import lume from "lume/mod.ts"`: This is the default style and the
   recommended. This ensure that the Lume version used in the config file is the
   same as you have installed in the CLI. The downside is that you need a import
   map file if you want to run this script without the Lume CLI.
2. `import lume from "https://deno.land/x/lume/mod.ts"`: Like the first style,
   it ensure that the Lume version used in the config file is the same as you
   have installed in the CLI. And it doesn't need a import map file to run the
   script without the Lume CLI. The downside is the version used without Lume is
   not specific and may vary.
3. `import lume from "https:/deno.land/x/lume@v1.6.2/mod.ts"`: This is the most
   strict way to import lume because it uses a specific version. The downside is
   that if you upgrade lume (with `lume upgrade`) you have to update also the
   version in the _config file.

The first option (selected by default) is recommended for most cases.

### Plugins

Then, you can use some plugins provided by Lume. For now, let's skip this step
by pressing `Enter`.

### Import map

Then Lume will ask you to create a import map file. This can be useful to
configure some IDEs like VS Code but it's not required. See
[Import map configuration](../docs/configuration/import-map.md) for more info.

After completing all steps, Lume will create the `_config.ts` (or `_config.js`
if you choose JavaScript) file in your project folder. Depending on your
choices, the content can vary, but with the default options it should looks like
this:

<lume-code>

```js {title="_config.js"}
import lume from "lume/mod.ts";

const site = lume();

export default site;
```

</lume-code>

To see all available options of the `_config.js` file
[See the config documentation](/docs/configuration/config-file.md) {.tip}

## Learn more

You have learn the basics of Lume.
[Go to the documentation](/docs/overview/about-lume.md) to become a Lume
expert!.
