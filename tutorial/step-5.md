---
step: 5
title: Change the URL of a page
---

In the previous step, we have created the `second-page.md` file to create the
`/second-page/` page. The url of the page is determined by the file name of the
markdown file. Lume has the `url` special variable to change the page url
without change the original file name. Example:

<lume-code>

```yml { title="second-page.md" }
---
layout: layout.njk
title: My second page
url: /renamed-second-page/
---
# Another page

My second page in **Lume**.

This is getting better!

[Go to the home](/)
```

</lume-code>

Now this page will be exported as `/renamed-second-page/` (and saved in the
`_site` folder as `/renamed-second-page/index.html`). Note we should update the
link in `index.md` to the new url:

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

[Go to the second page](/renamed-second-page/)
```

</lume-code>

[Go to URLs documentation](/docs/creating-pages/urls.md) for more info about the
`url` variable. {.tip}
