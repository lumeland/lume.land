---
title: General concepts
description: About different types of files, plugins and extensions.
order: 1
---

${toc}

The way Lume works is simple: it just read files in your `src` directory,
process the content and save the final files into the `dest` folder.

There are different types of files:

## Page files

A page file is a file that is loaded, processed and saved to the `dest` folder
generating one or more pages. In Lume there are two different types of pages:

### Regular pages

Are files intended to generate HTML pages. Let's take `my-page.md` as an
example:

- Load the content of the file.
- Replace the extension `.md` with `.html`. If `prettyUrls` is enabled, append
  `/index` to the file name.
- (Pre)process the page, render the markdown and apply the layout (if defined).
- Save the output file as `/my-page/index.html`.

By default Lume interprets the following formats as regular page files, so they
are loaded, processed and exported to `dest` folder: `.md`, `.njk`,
`.tmpl.json`, `.tmpl.js`, `.tmpl.ts` and `.yaml`. Use `site.loadPages()` to add
additional extensions:

```ts
// To load pages with the extension .foo
// Example: /my-page.foo => /my-page/index.html
site.loadPages([".foo"]);
```

If you're using any plugin to provide support for a new template engine, like
[pug](../../plugins/pug.md) or [eta](../../plugins/eta.md), don't need to run
`site.loadPages()` because the plugin does it for you. {.tip}

### Asset pages

Are pages intended to output assets, like `.css` files, `.js` or images. They
are very similar to regular pages but with a couple of differences. Let's take
`my-styles.css` as an example:

- Load the content of the file.
- Unlike regular pages, the original extension **isn't replaced** and
  `prettyUrls` configuration **doesn't apply.**
- (Pre)process the page, **but layouts and template engines are not used.**
- Save the output file as `/my-styles.css`.

Lume doesn't load any asset by default. Use the function `site.loadAssets()` to
configure Lume to load some extensions as page assets. For example:

```ts
// Load .css files
site.loadAssets([".css"]);
```

If you're using any plugin to process assets, like
[postcss](../../plugins/postcss.md), [esbuild](../../plugins/esbuild.md) or
[svgo](../../plugins/svgo.md), don't need to run `site.loadAssets()` because the
plugin does it for you. {.tip}

## Data files

Data files are the files saved as `_data.*` or in `_data/` directories and
contain data shared to the page files. The following files are interpreted as
data files: `_data.yaml`, `_data.ts`, `_data.js`, `_data.json`. If you want to
load additional data formats, use `site.loadData()` function:

```ts
// Load .toml files
site.loadData([".toml"], tomlLoader);
```

## Static files

They are files that are exported to the `dest` folder but don't need to be
processed, so Lume doesn't load the content, only copy them. They are copied as
is using the `site.copy()` function.
[See more about copy](../configuration/copy-static-files.md).

```ts
// Copy all files from the "/static/" directory
site.copy("static");

// Copy .pdf files
site.copy([".pdf"]);
```

## Includes

Are files loaded by the pages, for example the layouts or templates. By default,
they are placed in the `_includes` folder but you can configure it.

```ts
// Save the layouts files of nunjucks in the "/njk/" directory
site.includes([".njk"], "/njk/");
```

## Components

By default are saved in the `_components` folder and store reusable pieces of
code that you can use in your templates. You can load additional components with
`site.loadComponents()` function. [See more about components](./components.md)

```ts
// Load jsx components
site.loadComponents([".jsx"], jsxLoader, jsxRenderer);
```

## Plugins

Everything in Lume is a plugin. Even the support of core formats like `.md`,
`.yaml`, `.json` etc is provided by some
[plugins that **enabled by default**](../../../plugins/index.yml?status=enabled)
