---
title: Loaders and engines
description: How to add custom loaders and template engines to Lume.
order: 14
---

Loaders are functions that read and return the content of files. There are
different loaders for different formats, like `json`, `yaml`, JavaScript modules
or plain text.

## Creating a loader

Creating a custom loader is really easy: you just have to create a function that
reads the content of a file and then returns
[a data object](../advanced/the-data-model.md).

Let's say you want to add support for the `toml` format, using the
[toml Deno std module](https://deno.land/std/toml/mod.ts):

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
For example, the file `/about-us.toml` will be loaded and saved as
`/about-us/index.html`. You can also
[pass a (custom) template engine](#template-engines) that will be used for
rendering it.

As `loadPages()` is intended to generate `.html` pages, the given extension
(here `.toml`) is removed and replaced by `.html` (or `/index.html` for pretty
urls).

## Template engines

Lume supports several template engines to render your pages, such as Vento,
Nunjucks, Pug or Eta. It's easy to extend this support for more template
engines: you only need to create a class implementing the `Lume.Engine`
interface. Let's see an example using
[handlebars](https://github.com/handlebars-lang/handlebars.js):

```ts
import HandlebarsJS from "https://dev.jspm.io/handlebars@4.7.6";

export default class HandlebarsEngine implements Lume.Engine {
  /** Render the content */
  render(content: string, data: Record<string, unknown>, filename: string) {
    const template = HandlebarsJS.compile(content);
    return template(data);
  }

  /** Register helpers */
  addHelper() {}

  /** Delete cache */
  deleteCache() {}
}
```

To use this template engine, pass it in the options argument of the `loadPages`
function:

```ts
import textLoader from "lume/core/loaders/text.ts";
import HandlebarsEngine from "./handlebars-engine.ts";

site.loadPages([".hbs"], {
  loader: textLoader,
  engine: new HandlebarsEngine(site),
});
```

Now, all files with the `.hbs` extension will be loaded with the `textLoader`
loader and rendered using the Handlebars engine.

> [!note]
>
> This is a very basic implementation only for illustration purposes. You can
> see the code of the available template engines in Lume for real examples.
