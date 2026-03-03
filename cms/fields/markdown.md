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

In addition to the common options (see
[fields documentation](./index.md#common-field-options) for more info), this
field has the following options:

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

### snippets

An array of custom snippets to insert in the code. Each snippet has a label and
a value. The value can contain the `{$}` placeholder that will be replaced by
the currently selected text.

```js
{
  name: "content",
  type: "markdown",
  snippets: [
    {
      label: "copyright",
      value: "© Acme Inc, 2025"
    },
    {
      label: "Keyboard input",
      value: "<kbd>{$}</kbd>"
    },
  ]
}
```

### relativePath

Use this option to store the links to uploaded files as a relative path to the
document. This option only affects how the path is written in the actual source,
end users will not notice it when editing the document.

```js
{
  name: "content",
  type: "markdown",
  upload: "images",
  relativePath: true
}
```
