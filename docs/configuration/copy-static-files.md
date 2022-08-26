---
title: Copy static files
description: Configure what files and directories are copied as is.
order: 3
---

Static files are files that don't have to be processed, like images, PDFs,
videos or audios. So it's better (and faster) to copy these files directly to
the `dest` directory with the `copy()` method:

```js
// Copy the "img" directory to _site/img
site.copy("img");

// Copy the file to _site/favicon.ico
site.copy("favicon.ico");
```

The path is relative to the source directory of your site (configured in `src`)
and the files and directories are copied as is, maintaining the same directory
structure. Use the second argument to change the output directory:

```js
// Copy the "img" directory to _site/images
site.copy("img", "images");

// Copy the "static-files/favicons/favicon.ico" to _site/favicon.ico
site.copy("static-files/favicons/favicon.ico", "favicon.ico");

// Copy the content of "assets" directory to the root of your site
site.copy("assets", ".");
```

## Ignored files

Note that the ignore settings explained in [Ignore files](./ignore-files.md) are
applied when copy static files, including files starting with `_` and `.`. for
example:

```js
// Ignore a subfolder
site.ignore("/files/pictures/");

// Copy the /files/ folder.
// Note that the /files/pictures/ folder is ignored,
// in addition to all files starting with . and _
site.copy("/files/");
```

If you need to copy a file starting with `.` or `_`, you have to configure it
explicity:

```js
// Copy a underscored file
site.copy("_headers");
```

## Copy by file extension

An additional way to select files is by extension. Use an array with the
extensions of the files that you want to copy:

```js
// Copy all image files
site.copy([".jpg", ".gif", ".png"]);
```

This will copy all files with the extensions `.jpg`, `.gif` and `.png`, keeping
the original file structure. For example, the file `/img/pictures/image.jpg`
will be copied in to `_site/img/pictures/image.jpg` folder.

## Customize the destination

For more fine tuning about the file destination, you can provide a function in
the second argument that accept the original file path and must return the
destination path:

```js
// Copy all files in the static directory but ensure they are lower case
site.copy("static", (file) => file.toLowerCase());

// Copy all images in the /img/ directory
site.copy([".jpg", ".gif", ".png"], (file) => "/img" + file);
```

The copied files are not processed, even if they have known extensions like
`.md`, `.njk`, etc. {.tip}
