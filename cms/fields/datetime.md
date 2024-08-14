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

## Available options

In addition to the common options (see
[fields documentation](../configuration/fields.md#common-field-options) for more
info), this field has the following options:

### mode

To define the field mode to change the default behavior. The available modes
are:

- `create`. This mode prefills the input with the current time if it's empty.
  It's used to add automatically the creation date of a page.
- `update`. This mode prefills the input with the current time overriding the
  previous value if exists. It's used to add automatically the update date of a
  page.

```ts
{
  name: "last_update",
  type: "datetime",
  mode: "update"
}
```
