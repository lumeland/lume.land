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
  uploads: "src:images",
}
```

## Available options

In addition to the common options (see
[fields documentation](../configuration/fields.md#common-field-options) for more
info), this field has the following options:

### uploads

The storage method used to store the file. It's a string with the format
`storage:directory`. For example, if you have a storage registered with the name
`src` and want to save the files in the `images` subdirectory, the value is
`src:images`.
