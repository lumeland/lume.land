---
title: List
description: Field to store a list of string elements
---

The field of type `list` is used to store a list of strings. For example, if in
your page you have the following structure:

```yml
ingredients:
  - 4 potatoes
  - 6 egg
  - salt
  - onion (optional)
```

Use a `list` field to allow to add, remove and reorder these elements in the
CMS:

```ts
{
  name: "ingredients",
  type: "list",
}
```

See [Object list](./object-list.md) if you need to store a list of objects.

## Available options

This field only accept the options `name`, `type`, `label` and `description`
[from the common options](../configuration/fields.md#common-field-options). It
also accepts the following options:

### options

A list of predefined values to suggest to the user for this input. Technically,
it creates a `<datalist>` element with the options. Each option can be a string
or an object with `label` and `value` properties. Example:

```ts
{
  name: "ingredients",
  type: "list",
  options: [
    "potatoes",
    "eggs",
    "salt",
  ]
}
```
