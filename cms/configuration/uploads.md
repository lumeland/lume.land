---
title: Uploads
description: Setup folders to upload files by the CMS
order: 6
---

Uploads are LumeCMS primitives to configure folders where upload, edit or remove
files. It allows to explore these files in the interface and even preview the
content.

To define an upload element in LumeCMS you need 2 things:

- The upload name. For example: "Images".
- The storage used to read and write the content.

Use the `cms.upload()` function to setup an upload folder:

```ts
cms.upload("images", "src:images");
```

In the example above, we have defined the `images` upload folder, pointing to
the `images` folder in the `src` storage.

## Extra options

For additional options, use an object like this:

```ts
cms.upload({
  name: "images",
  description: "Here you can manage all images of your posts",
  store: "src:images",
});
```

In addition to `name`, `description` and `store`, uploads have the following
options:

### label

The visible name of this upload option in the menu. If it's not defined, the
`name` value is used.

```ts
cms.upload({
  name: "images",
  label: "Posts' images",
  description: "Here you can manage all images of your posts",
  store: "src:images",
});
```

### publicPath

Used if the public path of the image (once the site is built) is not the same as
the image in the source folder. For example, if the files are saved in `/assets`
but they are moved to the root folder:

```ts
cms.upload({
  name: "images",
  store: "src:images",
  publicPath: "/",
});
```

With this configuration, the file `/assets/favicon.ico` will has the public path
`/favicon.ico`.

### listed

Set to `false` to don't list this upload entry in the CMS homepage.

```ts
cms.upload({
  name: "images",
  store: "src:images",
  listed: false, // Hide from the main menu.
});
```

### documentLabel

This function customize the document's labels. The label is the visible name of
every document that is used in the list of files. It works in the same way as [the same option of collections](./collections.md#documentlabel).

### create, edit, rename & delete

Useful if you don't want to create, edit and/or delete items in the uploads.

```ts
cms.upload({
  name: "images",
  store: "src:images",
  // Don't allow the user to create, edit, rename or delete images
  create: false,
  delete: false,
  edit: false,
  rename: false,
});
```
