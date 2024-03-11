---
title: Choose list
description: Field to store a list of different object elements
---

The field of type `choose-list` is used to store a list of objects of different
types. For example, if in your page you have the following structure:

```yml
blocks:
  - type: title
    text: This is the title
  - type: content
    body: This is the content
```

Use a `choose-list` field to allow to add, remove and reorder these elements in
the CMS:

```ts
{
  name: "blocks",
  type: "choose-list",
  fields: [
    {
      name: "title",
      type: "object",
      fields: [
        "text: text"
      ]
    },
    {
      name: "content",
      type: "object",
      fields: [
        "body: markdown"
      ]
    },
  ]
}
```

## Available options

This field only accept the options `name`, `type`, `label` and `description`
[from the common options](../configuration/fields.md#common-field-options). It
also accept the following extra options:

### fields

A list of different fields (`object` fields in most cases) that are available to
be choosen. The `name` of the field is used to store the `type` property of
every item.
