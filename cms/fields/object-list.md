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

## Store arrays without keys

Let's say you have a document with a list of objects, for example:

```yml
- name: Óscar
  surname: Otero
- name: Laura
  surname: Rubio
```

This document doesn't have a key to store this list. To configure LumeCMS to
store the data in this way, use `[]` as the field name:

```ts
{
  name: "[]",
  type: "object-list",
  fields: [
    "name: text",
    "surname: text",
  ]
}
```

This is special name to make LumeCMS to don't create the key but store directly
the array of content.

## Available options

This field only accept the options `name`, `type`, `label` and `description`
[from the common options](../configuration/fields.md#common-field-options). It
also accept the following extra options:

### fields

A list of fields that must be included in the object. It can be a string with a
`name:type` format or an object if you need extra options.
