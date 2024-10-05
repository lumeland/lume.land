---
title: Views
description: Show/hide fields while editing the content
order: 2
---

It's possible to show or hide some fields while you're editing a document or a
collection. This is useful if you want to hide some fields that are edited
rarely, and keep the interface cleaner.

In the CMS configuration, you can assign fields to a specific view using the
`view` option:

```ts
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "published",
      type: "datetime",
      view: "editor",
    },
    {
      name: "draft",
      type: "checkbox",
      view: "editor",
    },
    {
      name: "content",
      type: "markdown",
    },
  ],
});
```

In this example, the fields `published` and `draft` are assigned to the `editor`
view. _Editor_ is just a name choosen for this example, you can use any name you
like.

In the interface, you will see a menu to show and hide the "editor" view. By
default is hidden, so the `published` and `draft` fields are not visible. To
show the _editor_ view by default, configure the `views` option of the
collection with the views that you want to make visible:

```ts
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  views: ["editor"],
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "published",
      type: "datetime",
      view: "editor",
    },
    {
      name: "draft",
      type: "checkbox",
      view: "editor",
    },
    {
      name: "content",
      type: "markdown",
    },
  ],
});
```

You can create as many views as you like, just use different names to create
more views. Fields without the `view` option are always visible, and use the
`views` option to configure which views are initially visible.
