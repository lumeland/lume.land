---
title: Create a collection
description: How to configure LumeCMS to edit a collection
order: 2
---

On the previous page, we learned how to configure LumeCMS to edit a single file.
This is useful if the file is unique, but not very practical if you have many
files with the same structure.

For example, let's say you have a blog with many posts and you want to edit
them. Using `cms.document()` wouldn't be very practical because you would need
to set up a new document for each post. What we need is to create a collection.

## Creating a collection

A collection is a group of documents with the same structure. Creating a
collection is very similar to creating a single document, but uses the
`cms.collection()` function.

Let's see an example of a post:

```yml
---
title: Static site generators are cool!
author: Óscar Otero
tags:
  - lume
  - ssg
---

I like static site generators because they are fast, flexible, and fun to work with.
```

Following this example, all our posts will have a title, an author, a list of
tags, and the content in Markdown. So this is an example of a collection:

```js
cms.collection("Posts", "src:posts/*.md", [
  "title: text",
  "author: text",
  "tags: list",
  "content: markdown",
]);
```

As you can see, the arguments passed to the `cms.collection()` function are the
same as when we created the document for the homepage. We only need the name of
the collection, the location to store the documents, and the fields with the
data structure.

Because the location is not a single file, but a collection of files, we can use
a glob. `src:posts/*.md` means that our collection is stored in the `posts`
folder inside the `src` directory, in files with the `.md` extension. Any file
with a different extension is not part of our collection.

Now run `deno task cms` to see the new "Posts" section in the main menu. You can
create new documents (posts) and remove or edit the existing ones!
