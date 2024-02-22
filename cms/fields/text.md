---
title: Text
description: Field to store short string values
---

The field of type `text` is used to store a string value. It creates a
`<input type="text">` element in the UI.

## Example

```ts
{
  name: "title",
  type: "text",
  attributes: {
    required: true,
    maxlength: 200
  }
}
```

## Available options

In addition to the common options (see
[fields documentation](../configuration/fields.md#common-field-options) for more
info), this field has the following options:

### options

A list of predefined values to suggest to the user for this input. Technically,
it creates a `<datalist>` element with the options. Each option can be a string
or an object with `label` and `value` properties. Example:

```ts
{
  name: "name",
  type: "text",
  options: [
    "Óscar",
    "Laura",
  ]
}
```
