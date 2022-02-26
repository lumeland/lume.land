---
title: Copy static files
description: Configure static files and directories be copied as is.
order: 2
---

Static files are files that don't have to be processed, like images, PDFs,
videos or audios. So it's better (and faster) to copy these files directly to
dest directory with the `copy` method:

```js
// Copy the "img" directory to _site/img
site.copy("img");

// Copy the file to _site/favicon.ico
site.copy("favicon.ico");
```

The path is relative to the source directory of your site (configured in `src`)
and the files and directories are copied as is, maintaining the same directory
structure. If you want to change the output directory, use the second parameter:

```js
// Copy the "img" directory to _site/images
site.copy("img", "images");

// Copy the "static-files/favicons/favicon.ico" to _site/favicon.ico
site.copy("static-files/favicons/favicon.ico", "favicon.ico");

// Copy the content of "assets" directory to the root of your site
site.copy("assets", ".");
```

The method `site.copy()` only accepts files and folders. Patterns like
`img/*.png` are not supported. The files and folders copied are not processed,
even if they have known extensions like `.md`, `.njk`, etc.
