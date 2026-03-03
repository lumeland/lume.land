---
title: Rich text
description: Field to store HTML content
---

The field of type `rich-text` is used to store HTML code. It uses a
[Tiptap editor](https://tiptap.dev/) in the UI with a limited number of HTML
tags. If you need advanced HTML code, use the [`markdown` field](./markdown.md)
since it allows any HTML code mixed with markdown.

## Example

```ts
{
  name: "content",
  type: "rich-text",
}
```

## Available options

In addition to the common options (see
[fields documentation](./index.md#common-field-options) for more info), this
field has the following options:

### upload

The name or array of names with the
[upload entities](../configuration/uploads.md) used to upload files or get files
from. By default it's disabled.

### relativePath

Use this option to store the links to uploaded files as a relative path to the
document. This option only affects how the path is written in the actual source,
end users will not notice it when editing the document.

```js
{
  name: "content",
  type: "rich-text",
  upload: "images",
  relativePath: true
}
```
