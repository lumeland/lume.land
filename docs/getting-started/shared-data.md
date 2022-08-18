---
title: Shared data
description: Reuse the same data by multiple pages
order: 5
---

In [the previou step](./reuse-layouts.md) we have created two pages using the
same layout, by setting the same `layout` variable to both. This can be fine for
few pages but what if you have tens, hundreds or thousands of pages using the
same layout? `_data` files to the rescue!

## Create a _data file

In your project directory create the `_data.yml` file with the following
content:

<lume-code>

```yml {title="_data.yml"}
layout: layout.njk
```

</lume-code>

This is a special file containing data accesible by all pages of the same
directory or subdirectory. In this file we have defined the variable `layout` so
all pages have this variable too. There's no need to repeat it in the front
matter of all pages so we can remove it.

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
```

```yml { title="second-page.md" }
---
title: My second page
---
# Another page

My second page in **Lume**.

This is getting better!
```

</lume-code>

`_data` files (and `_data` folders) is a very powerful feature of Lume.
[See shared data documentation](/docs/creating-pages/shared-data.md) for more
examples. {.tip}
