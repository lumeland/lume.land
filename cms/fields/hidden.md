---
title: Hidden
description: Field to store invisible values
---

The field of type `hidden` is used to store values but without being visible by
the user in the UI. It generates a `<input type="hidden">` in the UI.

## Example

```ts
{
  name: "layout",
  type: "hidden",
  value: "layouts/base.vto",
}
```

## Available options

This field only uses the `type`, `name` and `value` options
[from the common options](../configuration/fields.md#common-field-options). All
other options are ignored.
