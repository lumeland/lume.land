---
title: Fields
description: List of all fields available by default.
order: 4
---

Fields define the data type and interface used for the entries inside
[documents](documents.md) and [collections](collections.md).

All fields must have a name and a type.

- `name`: Defines the entry name used to store the value.
- `type`: Defines the data format and interface used in the CMS frontend.

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

We can configure LumeCMS to edit this page in this way:

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

## Common field options

Fields can have other options to validate or customize some aspects. The
following options are available in all fields:

<!-- deno-fmt-ignore-start -->
name (required)
: The field name. Used for the property name used to store the value.

type (required)
: The field type. Every field type has a different UI and can transform the value before save it.

label
: The visible name in the UI. If it's not defined, the `name` option will be used.

description
: An optional description that will be visible next to the label in the UI.

value
: The default value of this field if it's not defined. It's used when creating new documents in a collection.

attributes
: An object with extra attributes to pass to the input in the UI. This allows to set HTML validation attributes like `required`, `min`, `max`, `maxlength`, `pattern`, etc.

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
      maxlength: 100
    }
  },
  {
    name: "date",
    type: "datetime",
    label: "Published date",
    value: new Date(),
    description: "Set a future date if you want to publish it later",
    attributes: {
      placeholder: "For example: 2024-01-01 00:00:01"
    }
  },
  {
    name: "content",
    type: "markdown",
    label: "Page content",
    value: "Write **markdown** code here",
    description: `<a target="_blank" href="https://www.markdownguide.org">More info about markdown syntax</a>`,
  }
]
```
