---
title: Reuse your layouts
description: Create a single layout used by multiple pages
order: 4
---

In the [previous step](./page-data.md) we learned to define variables in the
pages that can be used by the layouts. This allows to reuse the same layout by
multiple pages with different content.

Create the file `second-page.md` in your project directory and add a front
matter with the `layout` and `title` variables and some markdown below:

<lume-code>

```yml {title=second-page.md}
---
layout: layout.njk
title: My second page
---
# Another page

My second page in **Lume**.

This is getting better!
```

</lume-code>

Go to `http://localhost:3000/second-page/` in your browser to see the new page.

The url of the page depends on the file name of markdown file: `/second-page.md`
will generate the url `/second-page/` path.
[Go to the Page files documentation](/docs/creating-pages/page-files.md) to know
more {.tip}

This new page uses the same `layout` as the first page but with a different
title and content.
