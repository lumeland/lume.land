---
title: Fields
description: List of all fields available by default.
order: 4
---

Fields define the data type and interface used for the entries inside
[documents](documents.md) and [collections](collections.md).

All fields must have a name and a type.

- `name`: The name of the variable used to store the value in the document.
- `type`: The data format and interface used in the CMS frontend.

Let's say we have the following markdown document:

```yml
---
title: Happy new year
date: 2024-01-01 00:00:00
---

I hope you have a **great 2024**.
```

This document has three fields:

- The `title` which is a plain text.
- The `date` which is a date time.
- The `content` which is a markdown content.

To configure LumeCMS to edit this page:

```ts
cms.document("happy-2024", "src:happy-2024.yml", [
  {
    name: "title",
    type: "text",
  },
  {
    name: "date",
    type: "datetime",
  },
  {
    name: "content",
    type: "markdown",
  },
]);
```

Now you can modify the content of this file in the CMS, and every field will
have an interface according to the field type.

If you only need name and type, you can use a string with the `name:type` format
for brevity. For example, the previous example can be simplified as:

```ts
cms.document("happy-2024", "src:happy-2024.yml", [
  "title: text",
  "date: datetime",
  "content: markdown",
]);
```

The string notation allow to define a value as required with an exclamation
mark:

```ts
cms.document("happy-2024", "src:happy-2024.yml", [
  "title: text!", // This value is required
  "date: datetime",
  "content: markdown",
]);
```

## Common field options

Fields can have other options to validate or customize some aspects. The
following options are available in all fields:

<!-- deno-fmt-ignore-start -->
name (required)
: Used for the variable name where the value is stored.

type (required)
: The field type. Every field type has a different UI and can transform the value before save it.

label
: The visible name in the UI. If it's not defined, the `name` option will be used.

description
: An optional description that will be visible next to the label in the UI.

value
: The default value of this field if it's not defined. It's used to create new documents in a collection with some predefined values.

attributes
: An object with extra attributes to pass to the input in the UI. This allows to set HTML validation attributes like `required`, `min`, `max`, `maxlength`, `pattern`, etc.

init
: A function that will be invoked before showing this field in the front-end. It allows to change the field configuration dynamically. More info below.

<!-- deno-fmt-ignore-end -->

This is an example of fields with some extra options:

```ts
[
  {
    name: "title",
    type: "text",
    label: "Title of the page",
    description: "It will be visible in the browser tab",
    attributes: {
      required: true,
      maxlength: 100,
    },
  },
  {
    name: "date",
    type: "datetime",
    label: "Created date",
    value: new Date(),
    description: "Set a future date if you want to publish it later",
    attributes: {
      placeholder: "For example: 2024-01-01 00:00:01",
    },
  },
  {
    name: "content",
    type: "markdown",
    label: "Page content",
    value: "Write **markdown** code here",
    description:
      `<a target="_blank" href="https://www.markdownguide.org">More info about markdown syntax</a>`,
  },
];
```

## The `init` function

The `init` function allows to dynamically change the configuration of any field
everytime it is used. Let's see the following example:

```js
{
  name: "password",
  type: "text",
  init(field) {
    field.value = generateRandomPassword();
  }
}
```

Here we have defined a `text` field to store a password. The default value is
generated dynamically everytime this field is used in a collection or document.

The second argument of the `init` function is an object with the CMS content
(all collections, documents, uploads, etc). This object also contains the
[data](./options.md#data) variable passed in the configuration. Due Lume adapter
stores the `site` instance in this object automatically, it's possible to modify
the field configuration using the site data. For example:

```js
{
  name: "tags",
  type: "list",
  init(field, { data }) {
    const site = data.site;
    const allTags = site.search.values("tags");
    field.options = allTags;
  }
}
```

In this example, we are using the
[Search.values](../../plugins/search.md#get-all-values-of-a-key) function to get
all tags used in the website and configure the
[available options](../fields/list.md#options) of the field.
