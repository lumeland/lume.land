---
title: Page data
description: Page data with Lume
order: 2
---

Pages can contain arbitrary data. In Markdown files, the data is defined in the
**front matter** block, a block delimited by two triple-dashed lines containing
[YAML](https://yaml.org/) code. Let's see an example:

```yaml
---
title: This is the front matter
url: custom-url.html
---

# This is the page content
Here you can write Markdown content
```

In this example, the frontmatter contains two variables: `title`, that can be
used as the page title, and `url`, a variable to customize the output file name
of the page. Below the front matter you can write the Markdown with the page
content.

## Standard variables

There are some special variables that **lume** can understand:

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

```yaml
---
url: /welcome.html
date: 2021-01-01
layout: layouts/post.njk
draft: true
tags: post
---
```
