---
title: General concepts
description: How Lume works?
order: 1
---

The way Lume works is very simple: it just read files in your `src` directory,
process the content and save the final files into the `dest` folder.

The file extension of the files determine if they are loaded and how to process
them. By default **only the following extensions are enabled**:

- **Page formats:** All files with the following extensions will be loaded to
  generate HTML pages: `.md`, `.njk`, `.tmpl.json`, `.tmpl.js`, `.tmpl.ts`,
  `.yaml`

- **Data formats:** The following files will be loaded to get data that will be
  used by other pages or layouts: `_data.yaml`, `_data.ts`, `_data.js`,
  `_data.json`

This means that files with a different extension will be ignored by Lume. If you
want to use other extensions (like `.css` or `.jpg`), **you must enable them.**
To do that, there are different choices:

- If you only want to **copy files or folders as they are** without any change,
  the best way is using `site.copy()`.
  [More info about copy static files](../getting-started/config-file.md#copy-static-files).
- If you want to process the content, **they must loaded**
  ([more info about loaders](../core/loaders.md)). There are three types of
  loaders, depending on the purpose of the format:
  - To load files that **generate HTML pages**, use `site.loadPages()`.
  - To load **assets files** (like `.css` or `.js`), use `site.loadAssets()`.
  - To load files with **shared data,** use `site.loadData()`.
- In most cases, **there's a plugin for that,** so see the Plugins section for
  more info.

## Plugins

Everything in Lume is a plugin. Even the support of core formats like `.md`,
`.yaml`, `.json` etc is provided by the following plugins that are **enabled by
default:**

- [Markdown](markdown.md)
- [JSON](json.md)
- [Modules](modules.md)
- [Nunjucks](nunjucks.md)
- [YAML](yaml.md)

There are a couple of additional plugins, **enabled by default** to provide
common features:

- [Url](url.md)
- [Search](searching.md)
- [Pagination](pagination.md)
