---
step: 6
title: Shared data
---

In previous steps we have created two pages using the same layout, so they have
the same value assigned to the `layout` variable. This can be fine for few pages
but what if you have tens, hundreds or thousands of pages using the same layout?
`_data` files to the rescue!

## Create a _data file

In your project directory create the `_data.yml` file with the following
content:

<lume-code>

```yml {title="_data.yml"}
layout: layout.njk
```

</lume-code>

This is a special file that contains data accesible by all pages of the same
directory or subdirectory. Due the file has defined the variable `layout`, all
pages will have this variable assigned. This means there's no need to repeat it
in the front matter of all pages so we can remove it.

<lume-code>

```yml {title="_data.yml"}
layout: layout.njk
```

```yml { title="index.md" }
---
title: This is my website
---
# Welcome to my website

This if my first page using **Lume,**
a static site generator for Deno.

I hope you enjoy it.

[Go to the second page](/renamed-second-page/)
```

```yml { title="second-page.md" }
---
title: My second page
url: /renamed-second-page/
---
# Another page

My second page in **Lume**.

This is getting better!

[Go to the home](/)
```

</lume-code>

`_data` files (and `_data` folders) is a very powerful feature of Lume.
[See shared data documentation](/docs/creating-pages/shared-data.md) for more
examples. {.tip}
