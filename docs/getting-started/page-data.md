---
title: Add data to your page
description: Working with front matters to add page data
order: 3
---

The front matter can contain any variable that you want. For example, let's
define a variable with the name `title`:

<lume-code>

```yml { title="index.md" }
---
layout: layout.njk
title: This is my website
---
# Welcome to my website

This if my first page using **Lume,**
a static site generator for Deno.

I hope you enjoy it.
```

</lume-code>

This variable is accessible by the layout, so it can be inserted in the html
code:

<lume-code>

```html { title="_includes/layout.njk" }
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ title }}</title>
</head>
<body>
  {{ content | safe }}
</body>
</html>
```

</lume-code>

The `<title>` tag has the `{{ title }}` placeholder used to insert the value of
the variable `title`.

[Go to Page data documentation](/docs/creating-pages/page-data.md) for more info
about page data. {.tip}
