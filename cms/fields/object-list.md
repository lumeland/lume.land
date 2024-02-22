---
title: Object list
description: Field to store a list of object elements
---

The field of type `object-list` is used to store a list of objects with the same
structure. For example, if in your page you have the following structure:

```yml
authors:
  - name: Óscar
    surname: Otero
  - name: Laura
    surname: Rubio
```

Use a `object-list` field to allow to add, remove and reorder these elements in
the CMS:

```ts
{
  name: "authors",
  type: "object-list",
  fields: [
    "name: text",
    "surname: text",
  ]
}
```

## Available options

This field only accept the options `name`, `type`, `label` and `description`
[from the common options](../configuration/fields.md#common-field-options). It
also accept the following extra options:

### fields

A list of fields that must be included in the object. It can be a string with a
`name:type` format or an object if you need extra options.
