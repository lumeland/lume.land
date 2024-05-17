---
title: File
description: Field to upload and store files
---

The field of type `file` is used to upload and store files. It display a
`<input type="file">` in the UI.

## Example

```ts
{
  name: "image",
  type: "file",
  uploads: "uploads",
}
```

## Available options

In addition to the common options (see
[fields documentation](../configuration/fields.md#common-field-options) for more
info), this field has the following options:

### uploads

The name of the
[upload method used to store the file](../configuration/uploads.md). It's a
string with the format `upload_name:directory`. For example, if you have an
Upload registered with the name `images` and want to save the files in the
`posts` subdirectory, the value is `images:posts`.

If it's not provided, the **first upload** value registered will be used. For
example:

```ts
// Register the "images" upload
cms.upload("images", "src:images");

cms.document("homepage", "src:index.yml", [
  "title: text",
  "content: markdown",
  "cover: file", // The `images` upload is used by default
]);
```
