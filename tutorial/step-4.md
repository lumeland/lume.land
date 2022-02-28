---
step: 4
title: Use the same layout by multiple pages
---

In the previous step we learn to define variables in our page that can be used
by the layout to place dynamic content. This allows to reuse the same layout by
multiple pages with different titles.

Create the file `second-page.md` in the root of the project directory and add a
front matter with the `layout` and `title` variables and some markdown below:

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
will generate the url `/second-page/` path (in the `_site` folder is saved as
`/second-page/index.html`).

This new page uses the same `layout` as the first page but with a different
title. Due the title is inserted dynamically in the layout using the `title`
variable, both pages can use the same layout.

## Link two pages

We can adds links to navigate from one page to another:

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

[Go to the second page](/second-page/)
```

```yml { title="second-page.md" }
---
layout: layout.njk
title: My second page
---
# Another page

My second page in **Lume**.

This is getting better!

[Go to the home](/)
```

</lume-code>
