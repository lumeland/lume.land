---
title: Add data to your page
description: Working with front matter to add page data
order: 3
---

The front matter can contain any variable that you want. For example, let's
define a variable with the name `title`:

<lume-code>

```yml { title="index.md" }
---
layout: layout.vto
title: This is my website
---
# Welcome to my website

This if my first page using **Lume,**
a static site generator for Deno.

I hope you enjoy it.
```

</lume-code>

This variable is accessible by the layout, so that it can be inserted into the
generated HTML:

<lume-code>

```vento { title="_includes/layout.vto" }
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ title }}</title>
</head>
<body>
  {{ content }}
</body>
</html>
```

</lume-code>

The `<title>` tag uses the `{{ title }}` placeholder, which is used to insert
the value of the `title` variable.

> [!note]
>
> [Go to Page data documentation](/docs/creating-pages/page-data.md) for more
> info about page data.
