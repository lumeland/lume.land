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
generating one or more pages. For example, a `.md` file (markdown) is a page
file, because it's loaded, rendered and saved as html file.

But pages not only export `html` files: `css`, `js`, `svg` files can be pages.
For example, you can create a `.js` page file to generate a `.css` file. Or
another example: if you enable a plugin like [postcss](../../plugins/postcss.md)
to load `.css` files, process and save them into `dest` folder, this convert
`.css` files as "Pages".

By default lume interprets the following formats as page files, so they are
loaded, processed and exported to `dest` folder: `.md`, `.njk`, `.tmpl.json`,
`.tmpl.js`, `.tmpl.ts` and `.yaml`.

## Data files

Data files are the files saved as `_data.*` or in a `_data/` directory. Like
pages, they are loaded but don't generate pages but are used by the page files
to access to interesting data. The following files are interpreted as data
files: `_data.yaml`, `_data.ts`, `_data.js`, `_data.json`.

## Static files

They are files that are exportedt to the `dest` folder but don't need to be
processed. They are copied as is using the `site.copy()` function.

## Includes

Are files that are loaded by the pages, for example the layouts or templates.
They used to be in the `_includes` folder but not always. Components could be
included in this group too.

## Plugins

Everything in Lume is a plugin. Even the support of core formats like `.md`,
`.yaml`, `.json` etc is provided by some
[plugins that **enabled by default**](../../../plugins/index.yml?status=enabled)

## Extensions

The extension of the files determine if they are a page file or a data file. If
a file has an unknown extension or not extension at all, it will be ignored.
Even popular extensions like `.css`, `.js`, `.png` etc are not loaded by
default. You have to use a plugin or configure lume to load and process them.
