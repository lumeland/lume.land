---
title: Markdown
description: Field to store markdown content
---

The field of type `markdown` is used to store markdown code. It display a
[codemirror editor](https://codemirror.net/) in the UI.

## Example

```ts
{
  name: "content",
  type: "markdown",
}
```

## Available options

This field only has
[the common options](../configuration/fields.md#common-field-options).

### upload

The name or array of names with the
[upload entities](../configuration/uploads.md) used to upload files or get files
from. If it's not defined, all uploads options will be used.

```js
{
  name: "content",
  type: "markdown",
  upload: "images"
}
```

Set to `false` to disable this option:

```js
{
  name: "content",
  type: "markdown",
  upload: false
}
```
