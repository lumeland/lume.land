---
title: Multiple template engines
description: Overriding the behavior of a template engine
order: 13
---

By default, the template engine used to render a file is decided according to
the file extension. For example, an `.md` file uses Markdown, `.vto` file uses
Vento and so on.

You can override this default behaviour with the `templateEngine` option. Any
page having this variable will use it to decide the template engine instead of
the extension.

The following example is an `.md` file but it is configured to use Vento to
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
