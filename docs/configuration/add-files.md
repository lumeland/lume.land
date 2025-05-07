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
`add()` method:

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
// Add the "img" directory and rename it to "images"
site.add("img", "images");

// Add the "static-files/favicons/favicon.ico" renamed to "favicon.ico"
site.add("static-files/favicons/favicon.ico", "favicon.ico");

// Add content of "assets" directory to the root of your site
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

Another way to select files is by extension. Use an array with the extensions of
the files that you want to add:

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

NPM is also supported:

```js
site.add("npm:normalize.css", "/styles/normalize.css");
```

Internally, this uses jsDelivr to download the file. In this example,
`npm:normalize.css` is transformed to
`https://cdn.jsdelivr.net/npm/normalize.css`. Note that only one file is
downloaded, not all package files.

## Customize the destination

For more fine-tuning of the file destination, you can provide a function in the
second argument that accepts the original file path and returns the destination
path:

```js
// Add all files in the static directory but ensure they are lower case
site.add("static", (file) => file.toLowerCase());

// Add all images in the /img/ directory
site.add([".jpg", ".gif", ".png"], (file) => "/img" + file);
```
