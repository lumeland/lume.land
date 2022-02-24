---
title: Loaders and engines
description: Small guide on adding custom loaders to Lume
order: 14
---

Loaders are functions that read and return the content of files. There are
different loaders for different formats, like `json`, `yaml`, JavaScript modules
or plain text. Creating a custom loader is really easy, you only have to create
a function that reads the content of a file and return an object with that
content.

Let's say you want to add support for `toml` format, using the
[encoding/toml](https://deno.land/std/encoding#toml) Deno std module:

```js
import { parse } from "https://deno.land/std/encoding/toml.ts";

async function tomlLoader(path) {
  const content = await Deno.readTextFile(path);
  return parse(content);
}
```

If you want to use this loader to build your site, just register it in the
`_config.js` file, specifying the file extensions to apply:

```js
site.loadData([".toml"], tomlLoader);
```

Now you can use the TOML format to save data files (`_data.toml` or
`_data/*.toml`).

To use this format to generate pages, use the `loadPages` function:

```js
site.loadPages([".toml"], tomlLoader);
```

Now, any `*.toml` file in your site will be loaded and used to render a page.
For example, the file `/about-us.toml` will be loaded and saved as
`/about-us/index.html` (unless you configure a different name using the `url`
value.

Instead of HTML pages, you may want to use this loader to load TOML files,
process them and save with the same extension (like `filename.toml` instead of
`filename/index.html`). To do that, you must register it with `loadAssets`:

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

## Loading plain text

To load text files but without parsing the content, you don't need to pass any
loader because the text loader is used by default:

```js
// Load html pages
site.loadPages([".html"]);

// Load js and css files
site.loadAssets([".css", ".js"]);
```

## Template engines

Lume supports several template engines to render your pages, like Nunjucks, Pug
or Eta. It's easy to extend this support for more template engines: you only
need to create a class extending the
[`Engine` interface](https://doc.deno.land/https/deno.land/x/lume/core.ts#Engine).
Let's see an example using
[handlebars](https://github.com/handlebars-lang/handlebars.js):

```ts
import HandlebarsJS from "https://dev.jspm.io/handlebars@4.7.6";
import { Data, Engine } from "lume/core.ts";

export default class HandlebarsEngine implements Engine {
  /** Render the content */
  render(content: string, data: Data): string {
    const template = HandlebarsJS.compile(content);
    return template(data);
  }

  /** Register helpers */
  addHelper() {}
}
```

To use this template engine you have to set as third argument of the `loadPages`
function:

```ts
import textLoader from "lume/loaders/text.ts";
import HandlebarsEngine from "./handlebars-engine.ts";

site.loadPages([".hbs"], textLoader, new HandlebarsEngine(site));
```

Now, all files with the `.hbs` extension will be loaded using the `textLoader`
and rendered using the Handlebars engine.

**Note:** this is a very basic implementation only as a example. You can see the
code of the available template engines in Lume for real examples.
