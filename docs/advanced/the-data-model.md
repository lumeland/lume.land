---
title: The data model
description: Understanding the Lume data model for pages
---

## The content

When Lume loads a page, all its content is converted to a `Data` object. This
object may have the `content` variable, with the file content. For example, the
following markdown file:

```md
**Content** of the page
```

is converted to this object:

```js
{
  content: "**Content** of the page",
}
```

If the file has additional variables, like a front matter, they are added to the
`Data` object:

```md
---
title: Title of the page
---

**Content** of the page
```

Now the title is added to the page data:

```js
{
  title: "Title of the page",
  content: "**Content** of the page",
}
```

This model is the same for any file that Lume can load. Even for images: let's
say you have the [transform_images](../../plugins/transform_images.md) plugin to
load and transform the data. The file content is loaded and stored in the
`content` variable:

```js
{
  content: Uint8Array(...)
}
```

If you use JavaScript modules for your pages, they are also translated to this
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

In this example, there's no `content` variable and that is fine. The `content`
variable is only a convention used by formats that can export a nameless
variable, like the default exports in ES modules or files with front matter and
content below.

## Extra variables

Once the file is loaded and converted to the `Data` model, Lume adds
automatically 3 variables:

- `url`: Define the output URL of the page.
- `date`: Define the date of the page.
- `basename`: Define the basename of the page (only in Lume 2).

You can define the `url` as an absolute or relative path or even a function
([see URLs documentation](../creating-pages/urls.md) for more info). Lume will
resolve this value to a string, and if the url is `false`, the page is ignored.

The `date` variable can be defined
[in the filename](../creating-pages/page-files.md#page-date) (like
`2023-11-30_hello-world.md`), using
[a page variable](../creating-pages/page-data.md#date), etc. Lume will try to
resolve it, using the file creation date as a fallback.

[The `basename`](../creating-pages/urls.md#basename) is like the filename. It
can be used to change the last part of the URL.

For example, the following markdown file is saved in the
`posts/2023-11-30_hello-world.md` file:

```md
Hello **world**
```

This is converted to:

```js
{
  url: "/posts/hello-world/",
  date: Date("2023-11-30 00:00:00"),
  basename: "hello-world",
  content: "Hello **world**"
}
```

## Data inheritance

Once a page is loaded, converted to `Data` and the special variables `url`,
`date` and `basename` are assigned, it's merged with other data defined in
[`_data` files](../creating-pages/shared-data.md). Components stored in the
`_components` folders are added to the page under the `comp` variable. Other
variables defined by plugins like [`search`](../../plugins/search.md) or
[`paginate`](../../plugins/paginate.md) are added too. So the markdown file:

```md
Hello **world**
```

Is converted to:

```js
{
  url: "/posts/hello-world/",
  date: Date("2023-11-30 00:00:00"),
  basename: "hello-world",
  content: "Hello **world**",
  search: Searcher(),
  paginate: Paginate(),
  comp: {}
  // etc...
}
```

## Generators

If the `content` variable is a
[Generator function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*),
Lume will generate the pages at this point. More info about
[generating pages](../core/multiple-pages.md).

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

That generates the three following pages:

```js
{
  layout: "main.vto",
  url: "/page-1/",
  content: "This is the page number 1",
  date: Date(),
  basename: "page-1",
  search: Searcher(),
  paginate: Paginate(),
  comp: {}
}

{
  layout: "main.vto",
  url: "/page-2/",
  content: "This is the page number 2",
  date: Date(),
  basename: "page-2",
  search: Searcher(),
  paginate: Paginate(),
  comp: {}
}

{
  layout: "main.vto",
  url: "/page-3/",
  content: "This is the page number 3",
  date: Date(),
  basename: "page-3",
  search: Searcher(),
  paginate: Paginate(),
  comp: {}
}
```

## Preprocessors

If you've defined [any preprocessor](../core/processors.md#preprocess) in your
`_config` file, it's executed at this point. Preprocessors allow modification of
the `Data` object before rendering. The preprocessors receive the `Page`
instance and the `Data` object is stored in the `Page.data` property.

```js
// _config.js

site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    const data = page.data; // Get the Data object
    data.title += " - My site name"; // Modify the title variable
  }
});
```

## Rendering

This is the process of rendering the `Data` object and saving the result in the
`Page.content` property. Any variable defined in the `Data` object will be
available in the template engine.

```vento
<!-- Render the title variable -->
<h1>{{ title }}</h1>
```

## Processing

While `Page.data` returns the `Data` object of the page, `Page.content` returns
the result of rendering the data or, in other words, the content that will be
output to the dest folder. You can use processors to modify this content:

```js
site.process([".html"], (page) => {
  // Get the rendered content
  const content = page.content;

  // Modify the content
  page.content = content + "\n<!-- Created by Óscar Otero -->";
});
```

If the page content is HTML code, there's the `document` property to use the
[DOM API](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)
to modify the content:

```js
site.process([".html"], (page) => {
  // Get the DOM
  const document = page.document;

  // Modify the content
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.setAttribute("target", "_blank");
  });
});
```

## Data conventions

In the `Data` object you can store all variables that you want with the
structure of your choice. But there are some special variables that Lume
understands (See
[Standard variables documentation](../creating-pages/page-data.md#standard-variables))
and other variables considered good practices or common conventions. This is a
list with all of them:

<!-- deno-fmt-ignore-start -->
[url](../creating-pages/urls.md) `string`
: Created by Lume automatically if it's missing.

[date](../creating-pages/page-data.md#date) `Date`
: Created by Lume automatically if it's missing.

[basename](../creating-pages/urls.md#basename) `string`
: Created by Lume automatically if it's missing.

[tags](../creating-pages/tags.md) `string[]`
: Normalized by Lume automatically. Used to assign tags or to pages.

[draft](../creating-pages/page-data.md#tags) `boolean`
: If it's `true`, the page will be ignored. Use the env variable `LUME_DRAFTS=true` to show draft pages.

[renderOrder](../core/render-order.md) `number`
: To configure the rendering order of a page.

content `string | Uint8Array | function | object`
: The raw content of the page.

children `string | Uint8Array | function | object`
: The rendered content before being wrapped into layouts.

[layout](../creating-pages/layouts.md) `string`
: The layout file used to render the page.

[templateEngine](../core/multiple-template-engines.md) `string | string[]`
: Configure different template engines to render the page.

[mergedKeys](../core/merged-keys.md) `Record<string, "array" | "stringArray" | "object">`
: Configure how some data keys will be merged with the parent data.

[onDemand](../../plugins/on_demand.md) `boolean`
: Whether render this page on demand or not.

lang `string`
: The language of the page.

type `string`
: The type of the page (post, article, etc). Used to group pages in different collections.

id `string | number`
: The id of the page. Used to identify a page inside a type.

[comp](../core/components.md) `object`
: The components available for this page (from `_components` folders).

page `Page`
: The current `Page` instance.

[alternates](../../plugins/multilanguage.md) `Data[]`
: Other pages with the same content translated to other languages.

[search](../core/searching.md#searching-pages) `Searcher`
: A utility class to search pages and files.

[paginate](../core/searching.md#pagination) `function`
: A function to paginate the result of searching pages.
