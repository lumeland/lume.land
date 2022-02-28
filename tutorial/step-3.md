---
step: 3
title: Add more data to your page
---

In the previous step we have created a layout and use the front matter of the
markdown page to assign the layout to the page.

This front matter can contain more values. For example, let's define a variable
named `title`:

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

The `<title>` tag contain the `{{ title }}` keyword that will be replaced by the
value of the variable `title` (in our example _"This is my website"_).

[Go to Page data documentation](/docs/creating-pages/page-data.md) for more info
about page data. {.tip}
