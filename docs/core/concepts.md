---
title: General concepts
description: About different types of files, plugins and extensions.
order: 1
---

The way Lume works is simple: it reads files in your `src` directory,
processes the content, and saves the final files into the `dest` folder.

There are different types of files:

## Page files

A page file is a file that is loaded, processed and saved to the `dest` folder,
generating one or more pages. In Lume, there are two different types of pages:

### Regular pages

These are files intended to generate HTML pages. Let's take `my-page.md` as an
example:

1. Load the content of the file.
2. Change the output file from `/my-page.md` to `/my-page/index.html`.
3. Run preprocessors
4. Render the page content and layouts
5. Run processors
6. Save the output file as `/my-page/index.html`.

By default, Lume interprets the following formats as regular page files, so they
are loaded, processed and exported to the `dest` folder: `.md`, `.markdown`, `.vto`,
`.page.json`, `.page.js`, `.page.ts` and `.yaml`. Use `site.loadPages()` to add
additional extensions:

```ts
// To load pages with the extension .foo
// Example: /my-page.foo => /my-page/index.html
site.loadPages([".foo"]);
```

> [!note]
>
> If you're using any plugin to provide support for a new template engine, like
> [pug](../../plugins/pug.md) or [eta](../../plugins/eta.md), then you don't need to
> run `site.loadPages()` because the plugin does it for you.

### Asset pages

These are pages intended to output assets, like `.css` files, `.js` or images. They
are very similar to regular pages but with a couple of differences. Let's take
`my-styles.css` as an example:

1. Load the content of the file.
2. Run preprocessors
3. Run processors
4. Save the output file as `/my-styles.css`.

Lume doesn't load any assets by default. Use the function `site.loadAssets()` to
configure Lume to load some extensions as page assets. For example:

```ts
// Load .css files
site.loadAssets([".css"]);
```

For assets that require special handling, such as binary files (e.g., `.webp`),
you need to specify the loader when calling `site.loadAssets()`. If no loader is
specified, Lume defaults to using the text loader.

```ts
// Load binary files
site.loadAssets([".webp"], binaryLoader);
```

> [!note]
>
> If you're using any plugin to process assets, like
> [postcss](../../plugins/postcss.md), [esbuild](../../plugins/esbuild.md) or
> [svgo](../../plugins/svgo.md), then you don't need to run `site.loadAssets()` because
> the plugin does it for you.

## Data files

Data files are files saved as `_data.*` or in `_data/` directories and
contain data shared with the page files. The following files are interpreted as
data files: `_data.yaml`, `_data.ts`, `_data.js`, `_data.json`. If you want to
load additional data formats, use `site.loadData()` function:

```ts
// Load .toml files
site.loadData([".toml"], tomlLoader);
```

## Static files

These are files that are exported to the `dest` folder but don't need to be
processed, so Lume doesn't load the content, but only copies them. They are copied
as-is using the `site.copy()` function.
[See more about copy](../configuration/copy-static-files.md).

```ts
// Copy all files from the "/static/" directory
site.copy("static");

// Copy .pdf files
site.copy([".pdf"]);
```

## Includes

These are files loaded by pages, for example, the layouts or templates. By
default, they are placed in the `_includes` folder, but you can configure it in
the [config file](../configuration/config-file.md#includes).

## Components

By default, these are saved in the `_components` folder and store reusable pieces of
code that you can use in your templates.

## Plugins

Everything in Lume is a plugin. Even the support of core formats like `.md`,
`.yaml`, `.json` etc is provided by some
[plugins that **enabled by default**](../../../plugins/index.yml?status=enabled)
