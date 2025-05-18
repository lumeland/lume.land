---
title: Edit a file
description: How to configure LumeCMS to edit a file
order: 1
---

This tutorial assumes that you have LumeCMS correctly configured. If that's not
the case, go to [the installation](../index.md#installation) section.

When LumeCMS is installed, you have the `cms` instance to configure it. There
are several functions for different purposes. In our example, we want to be able
to edit a single file, so we have to use the `document()` function.

```ts
import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

// Use the cms instance to configure LumeCMS

export default cms;
```

## Creating a document

The `cms.document()` function sets up LumeCMS to edit a single document in the
CMS. This is useful for editing a configuration file (like `_data.yml`) or a
single page (like the homepage).

For our example, let's say we have a homepage that is stored in `index.md`, a
markdown file with some variables in the front matter and body content:

```yml
---
layout: homepage.vto
title: Welcome to my site
description: I'm Óscar Otero, web designer and developer
---

## Hi there!

My name is Óscar Otero and this is my personal website.
```

As you can see, in our document we have four different values: `layout`,
`title`, `description`, and `content` (in LumeCMS, the variable name for the
content of any file with front matter is always `content`). So, we need to
create a new document in our CMS with these four values:

```js
import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

cms.document("Homepage", "src:index.md", [
  "layout: hidden",
  "title: text",
  "description: textarea",
  "content: markdown",
]);

export default cms;
```

### Document name

The first argument passed to `cms.document()` is the document name. This can be
any text to identify the document. It's used in the CMS to show this option in
the main menu. In our case, we decided to name it "Homepage".

### Document location

The second argument configures the location where the data will be loaded and
saved. If you use LumeCMS and Lume together, you have automatically the `src`
storage, pointing to your `src` folder. So `src:index.md` means that we want to
save the data in the file `index.md` inside the `src` folder.

### Document fields

The third argument is an array with all fields needed to edit the data. The
values have the format `name: type`. For example, the first value
`layout: hidden` indicates that the value is saved in the variable `layout` and
the field used in the UI is `hidden`.

For this variable we chose a field of type `hidden` because it's a fixed value
that we don't want to change. So the user won't see this field in the interface.

The variable `title` uses a field of type `text`, because it's a short text. The
variable `description` uses `textarea` because the text can be a bit longer and
can even include line breaks. And finally, the `content` variable contains
Markdown code, so we use the `markdown` field.

If we run the CMS with `deno task cms`, we can see the Homepage document in the
menu. Entering the section, we will see the form to edit the content.

Congratulations, you have configured your first document in LumeCMS!
