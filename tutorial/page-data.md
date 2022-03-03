---
step: 3
title: Add more data to your page
---

We just defined the variable `layout` in the front matter to assign a layout to
the page. The front matter can contain all variables you want. For example,
let's define a variable with the name `title`:

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

We can use this variable in the layout to insert its value in the html code:

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

The `<title>` tag contain the `{{ title }}` placeholder that will be replaced by
the value of the variable `title` (in our example _"This is my website"_).

[Go to Page data documentation](/docs/creating-pages/page-data.md) for more info
about page data. {.tip}
