---
title: Copy static files
description: Configure what files and directories are copied as is.
order: 3
---

Static files are files that don't have to be processed, like images, PDFs,
videos or audio. So it's better (and faster) to copy these files directly to the
`dest` directory with the `copy()` method:

```js
// Copy the "img" directory to _site/img
site.copy("img");

// Copy the file to _site/favicon.ico
site.copy("favicon.ico");
```

The path is relative to the source directory of your site (configured in `src`),
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

> [!note]
>
> It is not possible to copy files outside the `src` directory. For example
> `site.copy("../folder");` is not allowed. There are some reasons for this:
>
> - It makes the watcher more complicated because it has to watch different
>   folders.
> - It's insecure, because it reads files outside of the current directory.
> - It can break the build, because the `src` folder can be changed at any time
>   (`deno task build --src=other-folder`) which could change the resolution of
>   this folder.

## Ignored files

Note that the ignore settings explained in [Ignore files](./ignore-files.md) are
applied when copying static files, including files starting with `_` and `.`.
for example:

```js
// Ignore a subfolder
site.ignore("/files/pictures/");

// Copy the /files/ folder.
// Note that the /files/pictures/ folder is ignored,
// in addition to all files starting with . and _
site.copy("/files/");
```

If you need to copy a file starting with `.` or `_`, you have to configure it
explicitly:

```js
// Copy an underscored file
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
will be copied into `_site/img/pictures/image.jpg` location.

## Customize the destination

For more fine-tuning of the file destination, you can provide a function in the
second argument that accepts the original file path and must return the
destination path:

```js
// Copy all files in the static directory but ensure they are lower case
site.copy("static", (file) => file.toLowerCase());

// Copy all images in the /img/ directory
site.copy([".jpg", ".gif", ".png"], (file) => "/img" + file);
```

> [!warning]
>
> The copied files are not processed, even if they have known extensions like
> `.md`, `.vto`, etc.

## Copy remaining files

Sometimes it's not possible to know in advance all files that must be copied,
because they can be stored in any folder or can have any extension. For example,
imagine you have a website with articles, and every article is stored in it's
folder that can contain static files of any extension:

```txt
|_ articles/
    |_ article-1/
    |   |_ index.md
    |   |_ picture.jpg
    |   |_ document.pdf
    |   |_ foo32.gif
    |_ article-2/
        |_ index.md
        |_ journey.mp4
        |_ download.zip
```

We cannot do `site.copy("articles")`, because the `index.md` files are inside
these folders and wouldn't be processed (they would be treated as static files).
We can select the files by extension with
`site.copy([".jpg", ".pdf", ".gif", ".mp4", ".zip"])` but every time a file with
a new extension is uploaded to our site, we have to remember to update the
`_config` file.

For these use cases, there's the `copyRemainingFiles()` function that basically
says: when you find a file and don't know what to do with it, copy it. To setup
this behavior, just add the following line to your _config file:

```ts
site.copyRemainingFiles();
```

It's possible to include a function in the first argument to filter which files
must be copied. For example, if we only want to copy the remaining files inside
the `/articles/` folder:

```ts
site.copyRemainingFiles(
  (path: string) => path.startsWith("/articles/"),
);
```

If the filter returns a string instead of a boolean, it will be used to rename
the file. For example, let's say we want to ensure all files are in lower case:

```ts
site.copyRemainingFiles(
  (path: string) => path.startsWith("/articles/") ? path.toLowerCase() : false,
);
```
