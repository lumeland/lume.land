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

```yaml { title="Markdown" }
---
title: This is the front matter
url: custom-url.html
---

# This is the page content
Here you can write Markdown content
```

```yaml { title="YAML" }
title: This is the front matter
url: custom-url.html
content: This is the page content
```

```yaml { title="Nunjucks" }
---
title: This is the front matter
url: custom-url.html
---

<h1>{{ title }}</h1>
This is the content of the page {{ url }}
```

```json { title="JSON" }
{
  "title": "This is the title",
  "url": "custom-url.html",
  "content": "This is the page content"
}
```

```js { title="JavaScript" }
export const title = "This is the title";
export const url = "custom-url.html";

export default () => "<p>This is the page content</p>";
```

```jsx { title="JSX" }
export const title = "This is the title";
export const url = "custom-url.html";

export default () => <p>This is the page content</p>;
```

</lume-code>

In the examples above, all pages contains at least two variables: `title`, that
can be used as the page title, and `url`, a variable to customize the output
file name of the page.

The formats that contain a front matter (like Markdown and Nunjucks), the
content is defined below the front matter. Formats that don't use front matter
can export the content as the `content` variable (`YAML` and `JSON`) or as a
default export (JavaScript `JSX`).

## Standard variables

There are some special variables that **Lume** can understand:

- `url`: Contains the public URL of the page, useful to create links and
  configure the output filename. If it doesn't exist, it's generated
  automatically by lume.
- `date`: By default it's the file creation date but you can override with this
  variable (or prepending it to the filename). This value is used to sort the
  pages in a list.
- `layout`: To define the layout that is used to render the page. See
  [Layouts](layouts.md)
- `draft`: To ignore pages in production environment, but the page is visible
  during development (execute `lume --dev` to run in development environment).
- `tags`: Tags are used to group pages. See [Tags](tags.md)
- `templateEngine`: To override the template engine used to render the page. See
  [Template engines](../core/loaders.md#template-engines)

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
