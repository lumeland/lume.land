---
title: Uploads
description: Setup folders to upload files by the CMS
order: 6
---

Uploads are LumeCMS primitives to configure folders where upload, edit or remove
files. It allows to explore these files in the interface and even preview the
content.

To define a upload element in LumeCMS you need 2 things:

- The upload name. For example: "Images".
- The storage used to read and write the content.

Use the `cms.upload()` function to setup an upload folder:

```ts
cms.upload("images", "src:images");
```

In the example above, we have defined the `images` upload folder, pointing to
the `images` folder in the `src` storage.

You can include a short description that will be visible in the UI with the
format `name: description`. For example:

```ts
cms.upload(
  "images: Here you can manage all images of your posts",
  "src:images",
);
```
