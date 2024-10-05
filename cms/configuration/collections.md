---
title: Collections
description: Setup different collections for your CMS
order: 1
---

A collection is a set of files sharing the same structure and usually saved in
the same folder. You may use collections for blog posts, product pages, author
data files, etc.

To define a collection in LumeCMS you need 3 things:

- The collection name. For example: "Posts".
- The storage used to read and write the content. For example "src:posts".
- The fields used to modify the content.

The function `cms.collection()` allows to define a collection:

```ts
cms.collection("posts", "src:posts/*.md", [
  "title: text",
  "content: markdown",
]);
```

In the example above, we have defined the `posts` collection, using the `src`
storage (selecting all `.md` files inside the `posts` folder). The third
argument is the list of fields for this collection. See
[fields documentation](./fields.md) for more info about this value.

Collections can create, edit and remove documents.

## Extra options

For additional options, use an object like this:

```ts
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    "title: text",
    "content: markdown",
  ],
});
```

In addition to `name`, `store` and `fields`, collections have the following
options:

### description

It allows to insert a description below the collection name:

```ts
cms.collection({
  name: "posts",
  description: "To create, edit or delete the posts of the blog",
  store: "src:posts/*.md",
  fields: [
    "title: text",
    "content: markdown",
  ],
});
```

### url

The `url` option allows to set a preview URL of the collection. It's used for
collections in which every item doesn't generate a page, but all items generate
a unique page.

For example, we can have a collection of events, but in the website all events
are listed in a unique page. We can configure the CMS to preview this URL every
time we edit any event:

```ts
cms.collection({
  name: "events",
  store: "src:_data/events/*.yml",
  fields: [
    "title: text",
    "date: datetime",
    "content: markdown",
  ],
  url: "/events/",
});
```

### nameField

To create a new item in the collection, we have to specify the file path (for
example: `/new-post.md`). This option allows to generate the name automatically
using the value of a field. For example, we can use the title field to generate
the file name of the new posts:

```ts
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    "title: text!",
    "content: markdown",
  ],
  nameField: "title",
});
```

To generate the filename, the spaces are converted to hyphens and the `/`
character is removed. For example, the title `A/B testing` will generate the
file `ab-testing.md`.

Use a function for more advanced name generation:

```ts
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    "title: text!",
    "author: text!",
    "content: markdown",
  ],
  nameField(data) {
    return `${data.title} - ${data.author}`;
  },
});
```

> [!note]
>
> It's recommended to configure the fields used to generate the file path as
> "required", to avoid errors caused by empty values.

### create & delete

Useful if you don't want to create and/or delete items in the collection
(because it has a fixed length).

```ts
cms.collection({
  name: "countries",
  store: "src:countries/*.yml",
  fields: [
    "title: text",
    "content: markdown",
  ],
  create: false,
  delete: false,
});
```
