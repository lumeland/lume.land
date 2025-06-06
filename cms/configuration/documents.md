---
title: Documents
description: Setup individual documents to be edited in the CMS
order: 3
---

Documents allows to define individual files that can be edited directly in the
CMS. Unlike [collections](collections.md), documents can be edited, but not
removed or created. It's useful if you want to be able to edit configuration
files, data files or unique pages like the landing page.

To define a document in LumeCMS you need 3 things:

- The document name. For example: "Landing page".
- The storage used to read and write the content of this page.
- The fields used to modify the content.

The function `cms.document()` allows to define a document:

```ts
cms.document("landing-page", "src:index.yml", [
  "title: text",
  "subtitle: text",
  "content: markdown",
]);
```

In the example above, we have defined the `landing-page` document, that is saved
in the `index.yml` file in the `src` storage. In the CMS we can edit the title,
subtitle and content fields. See [fields documentation](../fields/index.md) for
more info about how to configure the document fields.

## Extra options

For additional options, use an object like this:

```ts
cms.document({
  name: "landing-page",
  store: "src:index.yml",
  fields: [
    "title: text",
    "subtitle: text",
    "content: markdown",
  ],
});
```

In addition to `name`, `store` and `fields`, documents have the following
options:

### description

It allows to insert a description below the document name:

```ts
cms.document({
  name: "landing-page",
  description: "Edit the content of the landing page",
  store: "src:index.yml",
  fields: [
    "title: text",
    "subtitle: text",
    "content: markdown",
  ],
});
```

### label

The visible name of this document in the menu. If it's not defined, the `name`
value is used.

```ts
cms.document({
  name: "landing-page",
  label: "This is your homepage",
  description: "Edit the content of the home page",
  store: "src:index.yml",
  fields: [
    "title: text",
    "subtitle: text",
    "content: markdown",
  ],
});
```

### url

The `url` option allows to set a preview URL of the document. It's used for
documents that don't generate a page but their changes can affect to certain
page that we want to preview.

### views

An array of the views that are visible by default. It's possible to use a
function to return the array dynamically.
