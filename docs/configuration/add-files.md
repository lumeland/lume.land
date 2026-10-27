---
title: Add files
description: Configure what files and directories are added.
order: 3
oldUrl: docs/configuration/copy-static-files/
---

When you run Lume with the default configuration, only the files with the
extensions `.md`, `.vto`, `.page.js`, `.page.ts` and `.page.json` are processed
and transformed to HTML pages. Files with different extensions are simply
ignored.

If you want to include other files to complement the HTML pages like CSS or JS
files, images, videos, audios, etc you have to add them explicitly with the
`add()` function:

```js
// Add all files in the "img" directory
site.add("img");

// Add the favicon file
site.add("favicon.ico");
```

The path is relative to the source directory of your site (configured in `src`),
and the files and directories are copied maintaining the same directory
structure. Use the second argument to rename the file or directory:

```js
// Add the "img" directory as "images"
site.add("img", "images");

// Add the "static-files/favicons/favicon.ico" as "favicon.ico"
site.add("static-files/favicons/favicon.ico", "favicon.ico");

// Add the content of the "assets" directory to the root folder
site.add("assets", ".");
```

> [!note]
>
> It is not possible to copy files outside the `src` directory. For example
> `site.add("../folder");` is not allowed. There are some reasons for this:
>
> - It makes the watcher more complicated because it has to watch different
>   folders.
> - It's insecure, because it reads files outside of the current directory.
> - It can break the build, because the `src` folder can be changed at any time
>   (`deno task build --src=other-folder`) which could change the resolution of
>   this folder.

## Ignored files

Note that the ignore settings explained in [Ignore files](./ignore-files.md) are
applied when adding files, including files starting with `_` and `.`. for
example:

```js
// Ignore a subfolder
site.ignore("/files/pictures/");

// Add the /files/ folder.
// The subfolder /files/pictures/ is ignored,
// in addition to all files starting with . and _
site.add("/files/");
```

If you need to add a file starting with `.` or `_`, you have to add it
explicitly:

```js
// Add an underscored file
site.add("_headers");
```

## Add by file extension

Another way to select files is by the extension. Use an array with the
extensions of the files that you want to add:

```js
// Add some image files
site.add([".jpg", ".gif", ".png"]);
```

This will add all files with the extensions `.jpg`, `.gif` and `.png`, keeping
the original file structure. For example, the file `/img/pictures/image.jpg`
will be copied into `_site/img/pictures/image.jpg`.

## Add remote files

It's possible to add remote files passing a URL in the first argument:

```js
site.add("https://example.com/common-styles.css", "styles.css");
```

In this example, the file will be downloaded and saved as `styles.css`.

## Add NPM and GitHub files

NPM and GitHub are also supported using the `npm:` and `gh:` specifiers:

```js
// NPM file
site.add("npm:normalize.css", "/styles/normalize.css");

// GitHub file
site.add(
  "gh:sindresorhus/modern-normalize/modern-normalize.css",
  "/styles/normalize.css",
);
```

Internally, Lume uses jsDelivr to download the files. In this example,
`npm:normalize.css` is transformed to
`https://cdn.jsdelivr.net/npm/normalize.css`. Note that only one file is
downloaded, not all package files.

If you want to download some or all files of a NPM package or GitHub tag, use a
glob pattern:

```js
// NPM package
site.add("npm:normalize.css/**", "/styles/normalize");
```

This code downloads all files from the `normalize.css` package in the
`/styles/normalize` directory. You can use semantic versions and more advanced
patterns. For example, to download only the CSS files from the `^8.0` version:

```js
site.add("npm:normalize.css@^8.0/**/*.css", "/styles/normalize");
```

If your files are from an NPM package installed locally, you can use the file URL (note that you don't need the `npm:` prefix):

```js
// Get the file:// url of the package
const normalizeUrl = import.meta.resolve("normalize.css");

// Add the file to your site
site.add(normalizeUrl, "/styles/normalize");
```

## Customize the destination

For more fine-tuning of the file destination, you can provide a function in the
second argument that accepts the original file path and returns the destination
path:

```js
// Add all files in the static directory but ensure they are lower case
site.add("static", (file) => file.toLowerCase());

// Move all images into the /img/ directory
site.add([".jpg", ".gif", ".png"], (file) => "/img" + file);
```

## Copy files

When a file is added with `site.add()`, its content can be changed during the
build. For example, if you're using a plugin to process the CSS code like
[Postcss](../../plugins/postcss.md), the CSS files added with `site.add()` will
be processed by the plugin. If you want to prevent that, use the `site.copy()`
function.

The signature of `site.copy()` is exactly the same as `site.add()`. The only
difference is the files are copied as is. Like `site.add()`, copying from NPM
and GitHub is also supported.

```js
site.use(postcss());
site.add("style.css"); // This file is processed by Postcss
site.copy("other-style.css"); // This file is copied as is
```
