---
title: Migrate from Eleventy
description: How to migrate your project from Eleventy to Lume.
---
<!-- deno-fmt-ignore-file -->
${toc}

[Eleventy](https://www.11ty.dev/) is a great SSG with a big community. Lume was
inspired in it, so if you have a Eleventy project and want to migrate to Lume
(maybe it's not a good idea), or simply are familiar with Eleventy and want to
see the differences with Lume, this short guide with the most important
differences can help.

## Configuration

- In Eleventy, the configuration file is `.eleventy.js`, in Lume is
  `_config.ts`.
- To [ignore files](https://www.11ty.dev/docs/ignores/), prepend the filename
  with a `.` or `_`, or use `site.ignore("filename")`.
- To add a plugin in Lume: `site.use(plugin())` (in Eleventy is
  `config.addPlugin(plugin)`)
- To copy a file/folder in Lume: `site.copy("img")` (in Eleventy is
  `config.addPassthroughCopy("img")`)
- To add a filter in Lume: `site.filter("name", filterFn)` (in Eleventy is
  `config.addFilter("name", filterFn)`).
- To add a [custom tag](https://www.11ty.dev/docs/custom-tags/) in Lume, use
  `site.helper("name", helperFn, {type: "tag"})`.

## Template languages

- In Lume, `HTML` files are not processed by default.
- There's no support for Handlebars (`.hbs`) and Mustache (`.mustache`) files (but it would be easy to create a plugin for that)
- Instead of `.ejs`, Lume uses `.eta` template engine.

## Site build

- In Lume, there isn't the concept of
  [collections](https://www.11ty.dev/docs/collections/). To get a list of pages,
  use the [search helper](../core/searching.md).
- In Lume, all data files are `_data.*` or `_data/*`. In Eleventy
  [there are different ways to place data](https://www.11ty.dev/docs/data-template-dir/),
  and `_data/*` is only used for global data.
- To paginate in Lume, you have to create a `.tmpl.js` or `.tmpl.ts` file
  exporting a generator ([more info](../core/searching.md#pagination)). There's no way to
  do it using the front matter, like in Eleventy.
- The event `beforeWatch` in Eleventy is named `beforeUpdate` in Lume.

## 11ty plugins

Serverless
: Lume has not yet support for server side rendering (but it's on the
radar).

Image
: There's the
[imagick plugin](../../plugins/imagick.md) for that.

Cache assets
: There isn't any plugin for that.

RSS
: No plugin needed to generate a RSS files in Lume.
[See this example](https://github.com/lumeland/base-blog/blob/master/feed.xml.njk)

Syntax Highlighting
: There's the
[code highlight plugin](../../plugins/code_highlight.md) and [prism plugin](../../plugins/prism.md) for that.

Navigation
: There isn't a plugin for that. But you can (partially) emulate it
using the [search helper](../../plugins/search.md).

Inclusive Language
: There isn't a plugin for that (I'd love it).

## Things that Lume does and Eleventy doesn't

- Process assets (like `css`, `js` or `svg` files).
- Support for `JSX` and `TSX`.
- You can search pages by any criteria, not only tags.
- It's easy to add processors and preprocessors to do arbitrary things like
  manipulate HTML code using DOM apis.
