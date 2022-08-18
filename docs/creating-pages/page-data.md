---
title: Page data
description: Asssign custom data to the pages
order: 2
---

Pages can contain arbitrary data. In Markdown files, the data is defined in the
**front matter** block, a block delimited by two triple-dashed lines containing
[YAML](https://yaml.org/) code. There are other formats that can have front
matters or store the data in different ways. Let's see some examples:

<lume-code>

```yaml { title="page.md" }
---
title: This is the title
url: custom-url.html
---

This is the page content
```

```yaml { title="page.yml" }
title: This is the title
url: custom-url.html
content: This is the page content
```

```yaml { title="page.njk" }
---
title: This is the title
url: custom-url.html
---

<h1>{{ title }}</h1>
This is the page content
```

```json { title="page.json" }
{
  "title": "This is the title",
  "url": "custom-url.html",
  "content": "This is the page content"
}
```

```js { title="page.tmpl.js" }
export const title = "This is the title";
export const url = "custom-url.html";

export default () => "<p>This is the page content</p>";
```

</lume-code>

In the examples above, all pages contains two variables: `title` and `url`.

In the formats with a front matter (like Markdown and Nunjucks), the content is
defined below the front matter. Formats that don't use front matter exports the
content as the `content` variable or, optionally, as a default export (like in
`page.tmpl.js`).

## Standard variables

There are some special variables that **Lume** can understand:

- `url`: Contains the public URL of the page, useful to create links and
  configure the output filename. If it doesn't exist, it's generated
  automatically by lume. See [URL docs](./urls.md)
- `date`: By default it's the file creation date but you can override with this
  variable (or prepending it to the filename). This value is used to sort the
  pages in a list.
- `layout`: To define the layout that is used to render the page. See
  [Layouts](layouts.md)
- `tags`: Tags are used to group pages. See [Tags](tags.md)
- `templateEngine`: To override the template engine used to render the page. See
- `renderOrder`: To customize the order in which the page is rendered. See
  [Render Order](../core/render-order.md)
- `mergedKeys`: To customize how some data is merged. See
  [Merged Keys docs](../core/merged-keys.md)

<lume-code>

```yaml { title="Front matter" }
---
url: /welcome.html
date: 2021-01-01
layout: layouts/post.njk
draft: true
tags: post
---
```

```js { title="JavaScript" }
export const url = "/welcome.html";
export const date = new Date('2021-01-01T03:24:00');
export const layout = "layouts/post.njk";
export const draft = true;
export const tags = ["post"];
```

```js { title="JavaScript (alternative)" }
const data = {
  url: "/welcome.html",
  date: new Date('2021-01-01T03:24:00'),
  layout: "layouts/post.njk",
  draft: true,
  tags: ["post"],
}

export default data;
```

</lume-code>
