---
title: Loaders and engines
description: How to add custom loaders and template engines to Lume.
order: 14
---

${toc}

Loaders are functions that read and return the content of files. There are
different loaders for different formats, like `json`, `yaml`, JavaScript modules
or plain text.

## Creating a loader

Creating a custom loader is really easy, you only have to create a function that
reads the content of a file and return an object with that content.

Let's say you want to add support for `toml` format, using the
[encoding/toml](https://deno.land/std/encoding#toml) Deno std module:

```js
import { parse } from "https://deno.land/std/encoding/toml.ts";

async function tomlLoader(path) {
  const content = await Deno.readTextFile(path);
  return parse(content);
}
```

## Register a data loader

If you want to use the TOML loader to load data files, use the `site.loadData()`
method in the `_config.ts` file:

```js
site.loadData([".toml"], tomlLoader);
```

Now you can use the TOML format to save data files (`_data.toml` or
`_data/*.toml`).

## Register a page loader

To generate pages using TOML format, use the `loadPages` function:

```js
site.loadPages([".toml"], tomlLoader);
```

Now, any `*.toml` file in your site will be loaded and used to render a page.
For example, the file `/about-us.toml` would be loaded and saved as
`/about-us/index.html`.

You could have realized that `loadPage()` is intended to generate `.html` pages.
So the `.toml` extension is removed and replaced by `.html` (or `/index.html`
for pretty urls).

You may want to load TOML files, process them and export as `.toml` files, not
`.html` files. To do that, you can use `loadAssets()`:

```js
site.loadAssets([".toml"], tomlLoader);
```

Now, the `*.toml` files are loaded and saved as `toml`. The function
`loadAssets` is useful to load assets files, like `css`, `js`, `svg`, that you
want to transform (bundle, minify...) and save them keeping the same extension,
instead of renaming to `html`.

**Note:** you can't use the same extension to generate pages and assets, so a
way to have support for both is adding a subextension (like `tmpl`) for pages.
Example:

```js
// Use *.html.toml extension for pages
site.loadPages([".html.toml"], tomlLoader);

// And any other *.toml files for assets
site.loadAssets([".toml"], tomlLoader);
```

This is the same strategy used for JavaScript/TypeScript modules (`*.tmpl.js`
for pages and `*.js` for JavaScript assets).

The `textLoader` is used by default if you don't pass any loader. For example:
`site.loadPages([".html"])` or `site.loadAssets([".css", ".js"])`. {.tip}

## Template engines

Lume supports several template engines to render your pages, like Nunjucks, Pug
or Eta. It's easy to extend this support for more template engines: you only
need to create a class extending the
[`Engine` interface](https://doc.deno.land/https://deno.land/x/lume/core.ts/~/Engine).
Let's see an example using
[handlebars](https://github.com/handlebars-lang/handlebars.js):

```ts
import HandlebarsJS from "https://dev.jspm.io/handlebars@4.7.6";
import { Data, Engine } from "lume/core.ts";

export default class HandlebarsEngine implements Engine {
  /** Render the content (sync or async) */
  render(content: string, data: Data): string {
    return this.renderSync(content, data, filename);
  }

  /** Render sync (used only for components) */
  renderSync(content: string, data: Data): string {
    const template = HandlebarsJS.compile(content);
    return template(data);
  }

  /** Register helpers */
  addHelper() {}

  /** Delete cache */
  deleteCache() {}
}
```

To use this template engine pass it as third argument of the `loadPages`
function:

```ts
import textLoader from "lume/loaders/text.ts";
import HandlebarsEngine from "./handlebars-engine.ts";

site.loadPages([".hbs"], textLoader, new HandlebarsEngine(site));
```

Now, all files with the `.hbs` extension will be loaded using the `textLoader`
and rendered using the Handlebars engine.

This is a very basic implementation only for example. You can see the code of
the available template engines in Lume for real examples. {.tip}
