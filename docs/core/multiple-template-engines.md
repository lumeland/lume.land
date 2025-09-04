---
title: Multiple template engines
description: Overriding the behavior of a template engine
order: 13
---

By default, the template engine used to render a file is chosen based on its
file extension. For example, `.md` files use Markdown, `.vto` files use Vento,
and so on.

You can override this default behaviour with the `templateEngine` option. Any
page with this variable will use it to choose the template engine instead of the
extension.

The following example is an `.md` file, but it is configured to use Vento to
render (instead of Markdown).

```yml
---
title: My post
templateEngine: vto
---

# Hello world
```

A typical example is a file using Markdown to render HTML but Vento to insert
variables or includes. To do that, you can use an array to add several engines:

```yml
---
title: My post
templateEngine: [vto, md]
---

# Hello, this is the post title {{ title }}
```

In the example above, the page will be rendered using Vento first and then
Markdown.

[Preprocessors](./processors.md#preprocess) allow to use the same template
engine configuration for a specific format. For example, to configure all
markdown files to use Vento + Markdown engines:

```ts
site.preprocess([".md"], (pages) => {
  pages.forEach((page) => page.data.templateEngine = ["vto", "md"]),
});
```
