---
title: Shared data
description: Reuse the same data in multiple pages
order: 5
---

In [the previous step](./reuse-layouts.md) we have created two pages using the
same layout, by setting the same `layout` variable in each. This can be fine for
a few pages but what if you have tens, hundreds, or thousands of pages using the
same layout? `_data` files to the rescue!

## Create a _data file

In your project directory create a `_data.yml` file with the following content:

<lume-code>

```yml {title="_data.yml"}
layout: layout.vto
```

</lume-code>

This is a special file containing data accessible by all pages in the same
directory or subdirectory. In this file we have defined the variable `layout` so
all pages have this variable too. There's no need to repeat it in the front
matter of all pages so we can remove it there.

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
> `_data` files (and `_data` folders) are a very powerful feature of Lume.
> [See shared data documentation](/docs/creating-pages/shared-data.md) for more
> examples.
