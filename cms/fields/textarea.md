---
title: Textarea
description: Field to store long string values
---

The field of type `textarea` is used to store multiline string value. It creates
a `<textarea>` element in the UI.

## Example

```ts
{
  name: "description",
  type: "textarea",
  attributes: {
    maxlength: 1500
  }
}
```

## Available options

This field only has
[the common options](../configuration/fields.md#common-field-options).
