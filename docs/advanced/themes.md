---
title: Creating themes
description: Guide to creating Lume themes
---

Themes are pre-made websites that you can use with your data. Technically, a theme is a plugin that configures the site with other plugins and provide all templates and assets (CSS, JS, etc) needed to build a website.

## Example

Let say we have a simple site with the following file structure:

```txt
├── _config.ts
└── src
    └── _data.yml
    └── index.md
    └── style.css
    └── _includes
        └── layout.vto
```

The site contains a `_data.yml` file with the global data, a single page (`index.md`) and a layout (`_includes/layout.vto`) used to render the pages. It has also a CSS file to apply styles.

The `_config.ts` file configures the site to use the `src` folder as the source root, add the CSS file and use a couple of plugins.

```ts
import lume from "@lumeland/lume";
import basePath from "@lumeland/plugin-base-path";
import lightningcss from "@lumeland/plugin-lightningcss";

const site = lume({
    src: "./src",
});

site.use(basePath());
site.use(lightningcss());
site.add("style.css");

export default site;
```

### Site configuration

To convert this site to a theme, let's move the site configuration into a plugin:

```ts
// mod.ts
import basePath from "@lumeland/plugin-base-path";
import lightningcss from "@lumeland/plugin-lightningcss";

export default function () {
  return (site: Lume.Site) => {
    site.use(basePath());
    site.use(lightningcss());
    site.add("style.css");
  };
}
```

### Remote files

We also need to add the files required to build the site, like templates and CSS file. To do that, we can use the [`remote()` function](../core/11.remote-files.md) that allows to load remote files. In this case they are files located in our package:

```ts
import basePath from "@lumeland/plugin-base-path";
import lightningcss from "@lumeland/plugin-lightningcss";

export default function () {
  return (site: Lume.Site) => {
    site.use(basePath());
    site.use(lightningcss());
    site.add("style.css");

    site.remote("/", import.meta.resolve("./src"), [
      "_includes/**",
      "style.css",
    ]);
  };
}
```

The `site.remote()` function has three arguments:
- The first argument is the destination path (the root of the source folder).
- The second argument is the URL of the origin (the `src` folder).
- The third argument is an array of patterns that will be included as remote files. In this case we are including all files inside the `_includes` folder and the `style.css` file.

The other files (`index.md` and `_data.yml`) can't be added as remote files because we want to make them editable by the users, so these files must exist in the folder in which this theme is being used. To do that, we can create an [archetype](../core/14.archetypes.md).

When Lume installs a theme, it looks automatically for a exported function called `setup`. If found, it's run as an archetype after installing the theme with `npm create lume`:

```ts
import basePath from "@lumeland/plugin-base-path";
import lightningcss from "@lumeland/plugin-lightningcss";

export default function () {
  return (site: Lume.Site) => {
    site.use(basePath());
    site.use(lightningcss());
    site.add("style.css");

    site.remote("/", import.meta.resolve("./src"), [
      "_includes/**",
      "style.css",
    ]);
  };
}

export const setup: Lume.Archetype = function() {
  return {
    url: import.meta.resolve("./src"),
    files: ["/_data.yml", "/index.md"],
  }
}
```

The function returns a file declaration. The `url` is the absolute url of the `src` folder and `files` is an array of patterns to copy. As you can see, it's similar to `site.remote()` but the files will be copied from your `src` folder instead of loaded remotely.

### Package

To publish the theme on NPM, we need to create a package.json file with the main file pointing to our module:

```json
{
  "name": "my-awesome-theme",
  "version": "1.0.0",
  "type": "module",
  "main": "mod.ts",
  "dependencies": {
    "@lumeland/lume": "^4.0.1",
    "@lumeland/plugin-base-path": "^1.0.0",
    "@lumeland/plugin-lightningcss": "^1.0.0"
  }
}
```

In this example, the main file is the `mod.ts` file containing the theme's code. This works fine for local, but since [Node doesn't support TypeScript files](https://nodejs.org/docs/latest-v26.x/api/typescript.html#type-stripping-in-dependencies) from NPM dependencies, you may need to compile it to JavaScript before publishing or just create the file in JavaScript from the begining. Note that only this file must be in JavaScript, the other files in the `src` folder don't have to.

### Testing themes

It's recommended to test the theme before publishing it, to ensure that everything works as expected. To do that, go to a different folder and run this command:

```sh
npm create lume@latest -- --theme ./my-awesome-theme
```

This is the same command to install any theme but instead of an NPM package, we are setting a local path (the directory `./my-awesome-theme` containing our theme).

If everything is correct, the theme should be installed. Check if the `setup` archetype copied the files and the site builds without errors. Once tested, you can publish your theme on NPM so it can be installed by other users.

You can use [this repository](https://github.com/lumeland/theme-boilerplate) as boilerplate which provides a basic configuration and use PNPM.

If you create a theme and want to see it in the [themes section](../../themes.yml), please let me know!
