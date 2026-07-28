---
title: ePUB
description: Output a .epub file with the site
mod: plugins/epub.ts
category: compress
---

## Description

This plugin converts the site to [EPUB](https://www.w3.org/publishing/epub3/),
the standard format for ebooks. Specifically, it's responsible for:

- Creating the `container.xml`, `encryption.xml`, `mimetype`, and `content.opf`
  manifest files.
- Creating the `toc.ncx` file with the book structure (using the
  [nav plugin](https://lume.land/plugins/nav/) under the hood).
- Converting the code and change the extension of all `.html` pages to `.xhtml`.
- Compressing all files and create the `book.epub` file in the `dest` folder.

## Installation

Import this plugin in your `_config.ts` file to use it. The plugin needs the
`metadata` configuration with the info of your book that will be used to create
the `content.opf` manifest file:

```js
import lume from "lume/mod.ts";
import epub from "lume/plugins/epub.ts";

const site = lume({
  prettyUrls: false, // prettyUrls don't make sense for ebooks
});

site.use(epub({
  // Book metadata
  metadata: {
    identifier: "unique identifier of your book",
    cover: "/images/cover.png",
    title: "My awesome book",
    subtitle: "History of my life",
    creator: ["Óscar Otero"],
    publisher: "Lume editions",
    language: "en-US",
    date: new Date("2026-01-31T12:18:28Z"),
  },
}));

export default site;
```

## Output uncompressed

Technically, the ePUB format is a zip file but with the `.epub` extension. So
you can uncompress the epub with any unzip utility and inspect the content. For
convenience, the plugin provides the `outputUncompressed` option to save also
the uncompressed pages for inspection:

```js
site.use(epub({
  outputUncompressed: true, // Output the uncompressed files
}));
```
