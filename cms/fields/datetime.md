---
title: Datetime
description: Field to store date time values
---

The field of type `datetime` is used to store date values. It display a
`<input type="datetime-local">` in the UI.

## Example

```ts
{
  name: "published",
  type: "datetime",
}
```

Set a default value to store automatically the current datetime when creating a
new document:

```ts
{
  name: "created_at",
  type: "datetime",
  init(field) {
    field.value = new Date();
  }
}
```

## Available options

This field only has
[the common options](../configuration/fields.md#common-field-options).
