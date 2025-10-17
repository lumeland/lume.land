---
title: Relation list
description: Field to pick one or more document of an collection
---

The field of type `relation-list` it's a version of [`relation`](./relation.md)
that allows to select multiple values.

## Example

```ts
{
  name: "user",
  type: "relation-list",
  collection: "users",
  option: ({ label, flags }) => ({ label, value: flags.id })
}
```

## Available options

In addition to the common options (see
[fields documentation](./index.md#common-field-options) for more info), this
field has the following options:

### collection

The collection name used to fetch the options.

### option

A function to run per document that returns the label and value used in the
interface.
