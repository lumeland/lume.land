---
title: Object
description: Field to group other fields under a name
---

The field of type `object` is used to group other fields under the same name.
For example, if in your page you have the following structure:

```yml
header:
  title: This is the title
  subtitle: This is the subtitle
```

Use a `object` field to group the title and subtitle in the CMS:

```ts
{
  name: "header",
  type: "object",
  fields: [
    "title: string",
    "subtitle: string",
  ],
}
```

## Available options

This field only accept the options `name`, `type`, `label` and `description`
[from the common options](../configuration/fields.md#common-field-options). It
also accept the following extra options:

### fields

A list of fields that must be included in the object. It can be a string with a
`name:type` format or an object if you need extra options.
