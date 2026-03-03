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
[fields documentation](../fields/index.md) for more info about this value.

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

### label

The visible name of this collection in the menu. If it's not defined, the `name`
value is used.

```ts
cms.collection({
  name: "posts",
  label: "Your posts!",
  description: "To create, edit or delete the posts of the blog",
  store: "src:posts/*.md",
  fields: [
    "title: text",
    "content: markdown",
  ],
});
```

### previewUrl

The `previewUrl` option allows to set a preview URL of the collection. It's used
for collections in which every item doesn't generate a page, but all items
generate a unique page.

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
  previewUrl: "/events/",
});
```

### documentName

To create a new item in the collection, we have to specify the file path (for
example: `/new-post.md`). This option allows to generate the name automatically
using the value of any field.

Use the syntax `{varname}` in the pattern to use any value to generate the
filename. For example, we can use the title field to generate the file name of
the new posts:

```ts
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    "title: text!",
    "content: markdown",
  ],
  documentName: "{title}.md",
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
  documentName(data) {
    return `${data.title}-${data.author}.md`;
  },
});
```

> [!note]
>
> It's recommended to configure the fields used to generate the file path as
> "required", to avoid errors caused by empty values.

### documentLabel

This function customize the document's labels. The label is the visible name of
every document that is used in the list of documents of the collection.

This is an example to remove the `.md` extension:

```ts
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    "title: text!",
    "author: text!",
    "content: markdown",
  ],
  documentLabel(name) {
    return name.replace(".md", "");
  },
});
```

If it's not specified, a default function is used to remove the extension,
convert hyphens to spaces and apply other small tweaks. For example, the
document name `/this-is-a-page.md` is converted to the label `This is a page`.

### transform

Allows to transform the values before saving:

```js
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    "title: text!",
    "author: text!",
    "content: markdown",
  ],
  transform(data, cmsContent, isNew) {
    if (isNew) {
      // Convert the title to uppercase when a document is created
      data.title = data.title.toUpperCase();
    }
  },
});
```

### create, edit & delete

Useful if you don't want to create, edit and/or delete items in the collection
(because it has a fixed length).

```ts
cms.collection({
  name: "countries",
  store: "src:countries/*.yml",
  fields: [
    "title: text",
    "content: markdown",
  ],
  // Don't allow the user to create, edit or delete countries
  create: false,
  delete: false,
  edit: false,
});
```

### rename

The `rename` option configures how to name and rename the documents in a
collection. It accepts three values:

- `true`: The default option. It shows an input in the UI to set a filename when
  creating or editing a document.
- `false`: There's no input in the UI to set a filename manually by the user.
  This option requires the `documentName` option configured to generate the name
  automatically.
- `"auto"`: Similar to `false`, it hides the input in the UI. The only
  difference is while `false` only generates the name when the document is
  created, this option also updates the filename after editing the document. For
  example, let's say the `documentName` is a function to generate the filename
  using the `title` field. The option `rename: false` generates the filename
  when the document is created, but this value won't change even if the value of
  `title` does. On the other hand, `rename: "auto"` will update the filename
  every time the title is changed.

```ts
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    "title: text!",
    "author: text!",
    "content: markdown",
  ],
  documentName(data) {
    return `${data.title}-${data.author}.md`;
  },

  // Don't allow the user to edit the document name
  // and update it everytime the title or author changes.
  rename: "auto",
});
```

### views

An array of the views that are visible by default. It's possible to use a
function to return the array dynamically. For example, you may want to show some
fields while creating a new document and different fields when editing it:

```ts
cms.collection({
  name: "countries",
  store: "src:countries/*.yml",
  views(data) {
    if (data) {
      // Editing document, show the full view
      return ["full"];
    }
  },
  fields: [
    "title: text",
    {
      type: "markdown",
      name: "content",
      view: "full", // This field is only visible if the "full" view is active
    },
  ],
  create: false,
  delete: false,
});
```

### type

Configure the type of document created in the collection. By default is
`object`, which means that the root elements is an object.

Let's see an example:

```js
cms.collection({
  name: "notes",
  store: "src:*.json",
  type: "object", // default value, no need to specify
  fields: [
    "title: text",
    "text: textarea",
  ],
});
```

This configuration generates files like the following. Note that the root
element is an object:

```json
{
  "title": "Note title",
  "text": "This is the note"
}
```

The `object-list` type allows to store an array of objects:

```js
cms.collection({
  name: "notes",
  store: "src:*.json",
  type: "object-list",
  fields: [
    "title: text",
    "text: textarea",
  ],
});
```

```json
[
  {
    "title": "First note",
    "text": "Text of the first note"
  },
  {
    "title": "Second note",
    "text": "Text of the second note"
  }
]
```

The type `choose` allows to create different data structure for each document.
For example, let's say you have different note types:

```js
cms.collection({
  name: "notes",
  store: "src:*.json",
  type: "choose",
  fields: [
    {
      name: "text"
      fields: [
        "title: text",
        "text: textarea",
      ]
    },
    {
      name: "image"
      fields: [
        "title: text",
        "image: file",
      ]
    }
  ],
});
```

You collection can contain documents of type "text" or "image", and each
document has a different structure. For example:

```json
{
  "type": "text",
  "title": "Note title",
  "text": "This is the note"
}
```

```json
{
  "type": "image",
  "title": "My image",
  "image": "/images/photo-1.jpg"
}
```
