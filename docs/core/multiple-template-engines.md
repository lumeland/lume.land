---
title: Multiple template engines
description: Overriding the behavior of a template engine
order: 13
---

By default, the template engine used to render a file is decided according to
the file extension. For example, a `.md` file uses Markdown, `.njk` file uses
Nunjucks and so on.

You can override this default behaviour with the `templateEngine` option. Any
page having this variable will use it to decide the template engine, instead of
the extension.

The following example is a `.md` file but is configured to use Nunjucks to
render (instead of Markdown).

```yml
---
title: My post
templateEngine: njk
---

# Hello world
```

A typical example is a file using Markdown to render HTML but Nunjucks to insert
variables or includes. To do that, you can use an array to add several engines:

```yml
---
title: My post
templateEngine: [njk, md]
---

# Hello, this is the post title {{ title }}
```

In the example above the page will be rendered using Nunjucks first and then
Markdown.
