---
title: Shared data
description: Reuse the same data in multiple pages
order: 5
---

In [the previous step](./reuse-layouts.md) we created two pages using the same
layout, by defining the variable `layout` in the front matter. This can be fine
for a few pages but what if you have tens, hundreds, or thousands of pages using
the same layout? `_data` files to the rescue!

## Create a _data file

In your project directory, create a `_data.yml` file with the following content:

<lume-code>

```yml {title="_data.yml"}
layout: layout.vto
```

</lume-code>

This is a special file containing data shared by all pages in the same directory
and subdirectories. In this file we have defined the variable `layout` so all
pages inherit this variable too. We not longer need to repeat the same value in
the front matter of all pages, so we can remove it from there.

<lume-code>

```yml {title="_data.yml"}
layout: layout.vto
```

```yml { title="index.md" }
---
title: This is my website
---
# Welcome to my website

This is my first page using **Lume,**
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

> [!tip]
>
> `_data` files (and `_data` folders) are a very powerful feature of Lume. See
> the [shared data documentation](/docs/creating-pages/shared-data.md) for more
> examples.
