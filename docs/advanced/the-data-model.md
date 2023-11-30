---
title: The data model
description: Understand the Lume data model for pages
---

## The content

When Lume loads a page, all it's content is converted to a `Data` object. This
object may have the `content` variable, with the file content. For example, the
following markdown file:

```md
Content of the page
```

is converted to this object:

```js
{
  content: "Content of the page",
}
```

If the file has additional variables, like a front matter, they are added to the
`Data` object:

```md
---
title: Title of the page
---

Content of the page
```

Now the title is added to the page data:

```js
{
  title: "Title of the page",
  content: "Content of the page",
}
```

This model is the same for any file that Lume can load. Even for images: let's
say you have the [imagick](../../plugins/imagick.md) plugin to load and
transform the data. The file content is loaded and stored in the `content`
variable:

```js
{
  content: Uint8Array(...)
}
```

If you use JavaScript modules to your pages, they are also translated to this
model. For example:

```js
export const title = "Title of the page";

export default function ({ title }) {
  return `<h1>${title}</h1>`;
}
```

This is converted to:

```js
{
  title: "Title of the page",
  content: function ({title}) {
    return `<h1>${title}</h1>`;
  }
}
```

Note that the default export is stored in the `content` variable (the same as
the markdown example above). Instead of exporting the function as `default`, you
could export it as `content`, but not both:

```js
// This works
export function content({ title }) {
  return `<h1>${title}</h1>`;
}
```

```js
// Mixing content and default won't work!!
export const content = "Content of the page";

export default function ({ title }) {
  return `<h1>${title}</h1>`;
}
```

The `content` variable does not always exist. Some data formats, like `.yaml` or
`.json` may not export the `content` variable. For example, the following page
defined in a YAML file:

```yml
layout: main.vto
title: Page title
description: Page description
```

is converted to:

```js
{
  layout: "main.vto",
  title: "Page title",
  description: "Page description",
}
```

I this example there's no `content` variable and that is fine. The `content`
variable is only a convention used by formats that can export a nameless
variable, like the default exports in ES modules or files with front matter and
a content below.

## Extra variables

Once the file is loaded and converted to the `Data` model, Lume adds
automatically 3 variables:

- `url`: Define the output URL of the page.
- `date`: Define the date of the page.
- `basename`: Define the basename of the page (only in Lume 2).

The `url` can be a function or even a relative path
([see URLs documentation](../creating-pages/urls.md) for more info). Lume will
resolve this value to a string. If the url is `false`, the page is ignored.

The `date` variable can be defined
[in the filename](http://localhost:3000/docs/creating-pages/page-files/#page-date)
(like `2023-11-30_hello-world.md`), using
[a page variable](../creating-pages/page-data.md#date), etc. Lume will try to
resolve it, using the file creation date as a fallback.

For example, the following markdown file saved in the `posts/hello-world.md`
file:

```md
Hello world
```

This is converted to:

```js
{
  url: "/posts/hello-world/",
  date: Date(),
  basename: "hello-word",
  content: "Hello world"
}
```

## Data inheritance

Once a page is loaded, converted to `Data` and the special variables `url`,
`date` and `basename` are assigned, it will be merged with other data defined in
[`_data` files](../creating-pages/shared-data.md). There are also other
variables defined by plugins like [`search`](../../plugins/search.md) or
[`paginate`](../../plugins/paginate.md) that are automatically added. So the
markdown file:

```md
Hello world
```

Is converted to:

```js
{
  url: "/posts/hello-world/",
  date: Date(),
  basename: "hello-word",
  content: "Hello world",
  search: Searcher(),
  paginate: Paginate(),
  // etc...
}
```

## Generators

If the `content` variable is a Generator, Lume will generate the pages at this
point. More info about [generating pages](../core/multiple-pages.md).

For example, let's say we have the following generator page:

```js
export const layout = "main.vto";

export default function* () {
  const numbers = [1, 2, 3];

  for (const number of numbers) {
    yield {
      url: `/page-${number}/`,
      content: `This is the page number ${number}`,
    };
  }
}
```

This will generate the three following pages:

```js
{
  layout: "main.vto",
  url: "/page-1/",
  content: "This is the page number 1",
  date: Date(),
  basename: "page-1",
  search: Searcher(),
  paginate: Paginate(),
}

{
  layout: "main.vto",
  url: "/page-2/",
  content: "This is the page number 2",
  date: Date(),
  basename: "page-2",
  search: Searcher(),
  paginate: Paginate(),
}

{
  layout: "main.vto",
  url: "/page-3/",
  content: "This is the page number 3",
  date: Date(),
  basename: "page-3",
  search: Searcher(),
  paginate: Paginate(),
}
```

## Preprocessors

If you've defined [a preprocessor](../core/processors.md#preprocess) in your
`_config` file, it will be executed at this point. It allows to modify the
`Data` object before rendering. The preprocessors receive the `Page` instance
and you can access to the data of the page with the `Page.data` property.

```js
// _config.js

site.preprocess([".html"], (page) => {
  const data = page.data; // Get the Data object
  data.title += " - My site name"; // Modify the title variable
});
```

## Rendering

The result of rendering a page is stored in the `page.content` variable, (do not
confuse with `page.data.content` variable which is the source file content).
Then you can use processors, to modify this variable:

```js
site.process([".html"], (page) => {
  let content = page.content; // Get the rendered content
  content += "<!-- Created by Óscar Otero -->"; // Modify the content
  page.content = content; // Assign the new content
});
```

## Saving

The content of the variable `page.content` will be saved to the dest folder. If
this variable is empty, the page won't be saved.
