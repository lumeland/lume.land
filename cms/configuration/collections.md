---
title: Collections
description: Setup different collections for your CMS
order: 1
---

A collection is a set of files sharing the same structure and usually saved in
the same folder. You might use a collection for blog posts, product pages,
author data files, etc.

To define a collection in LumeCMS you need 3 things:

- The collection name. For example: "Posts".
- The storage used to read and write the content. Probably "src".
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

Once created this collection, the user can create, edit and remove posts. All
the content will be stored in the `src:posts` folder as markdown documents.
