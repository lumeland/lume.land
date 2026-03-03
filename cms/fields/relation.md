---
title: Relation
description: Field to pick one document of an collection
---

The field of type `relation` is used to create a relation to a document from a
collection. It display a `<select>` in the UI.

## Example

```ts
{
  name: "user",
  type: "relation",
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

## Demo

Let's say we have a collection of countries with the following files:

```
/en-spain.json
/pt-portugal.json
/fr-france.json
/it-italy.json
```

We can configure the collection to extract the name and store the code as a
flag:

```js
cms.collection({
  name: "countries",
  documentLabel: (filename) => {
    const [code, name] = filename.replace(".json", "").split("-");
    return {
      label: name,
      flags: { code },
    };
  },
  // ...more options
});
```

Now we can use the relation field in other documents or collections:

```js
cms.collection({
  name: "users",
  store: "src:users/*.md",
  fields: [
    "name: text",
    {
      name: "country",
      type: "relation",
      collection: "countries",
      option: ({ label, flags }) => { label, value: flags.code }
    }
  ]
});
```

This field will show a selector to pick one of the countries and use the `code`
flag as the value (`en` for Spain, `pt` for Portugal, etc).
