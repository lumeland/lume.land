---
title: Options
description: Configure LumeCMS instance
order: 0
---

LumeCMS instantation accepts an object with some configuration options:

```js
import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS({
  /* Options */
});
```

The available options are:

## Basic options

### root

This is the root directory of the site you want to edit. Lume automatically set
this value to the `src` folder. It's used to file system storage
[when it's defined as a string](./storage.md#file-system).

> [!note]
>
> If you do not specify a `root` option, the CMS will use `Deno.cwd()` to get
> the current working directory. Some Deno platforms (like Netlify
> edge-functions) do not support Deno file system access and will fatally error
> when `Deno.cwd()` is executed. Provide an empty string `""` as the root option
> to avoid this.

### basePath

The public base path of the CMS. Lume automatically set this value to `/admin`.

## site

This is an object to configure the CMS website. You can assign a name, a
description, URL and a body, that will be visible in the homepage:

```js
import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS({
  site: {
    name: "My blog CMS",
    description: "Here I can edit the content of my blog",
    url: "https://myblog.com",
    body: `
    <p>Long text, for instructions or other content that you want to make it visible in the homepage</p>
    `,
  },
});
```

## data

It's where you can pass arbitrary data to use later inside the fields. Lume
automatically insert the `lume` instance. More info at
[Fields configuration](../fields/index.md#the-init-function)

## extraHead

A string that you can use to include extra HTML code in the CMS. Useful to
customize the appearance:

```js
const cms = lumeCMS({
  extraHead: `
<style>
  body {
    color: pink;
  }
</style>
  `,
});
```

## staticFolders

If you want to customize the CMS using the `extraHead` to load additional CSS or
JavaScript files, use this option to serve these extra files from a folder. This
option accepts an object whose keys are the prefixes and the values the folders
where the files are stored.

In the following example, we defined the static folder `custom` pointing to the
folder `./my-custom-stuff`, so the file `/admin/custom/styles.css` is resolved
to `./my-custom-stuff/styles.css`.

```js
const cms = lumeCMS({
  extraHead: '<link rel="stylesheet" href="/admin/custom/styles.css">',
  staticFolders: {
    custom: "./my-custom-stuff",
  },
});
```

This option is also useful if you want to
[register custom fields](../fields/custom_fields.md).

## previewURL

A function to return the preview URL for a file. For example, if we know that
the file `/posts/hello-world.md` produces the URL `/posts/hello-world/`, we can
display this URL in the preview panel when the file is being edited.

Lume set this option automatically but it can be useful if you're using the CMS
without Lume.

```js
const cms = lumeCMS({
  previewUrl(path: string) {
    if (path === "/index.md") return "/";
    if (path === "/about.md") return "/about/";
  }
});
```

## sourcePath

It's the opposite to previewURL: return the source file for a specific URL. This
allows to generate URLs like `/admin/?edit=/posts/hello-world/` and the CMS
opens the form to edit the source file of the URL.

Lume set this option automatically but it can be useful if you're using the CMS
without Lume.

```js
const cms = lumeCMS({
  sourcePath(url: string) {
    if (url === "/") return "/index.md";
    if (url === "/about/") return "/about.md";
  }
});
```
