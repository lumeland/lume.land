---
title: Create your first page
description: How to build the most simple page in Lume
order: 1
---

## The page file

After setup Lume in your project's folder
([see installation instructions](../overview/installation.md) if you don't have
it yet), create the file `index.md` and add some content in
[markdown](https://en.wikipedia.org/wiki/Markdown) format, for example:

<lume-code>

```md {title="index.md"}
# Welcome to my website

This if my first page using **Lume,**
a static site generator for Deno.

I hope you enjoy it.
```

</lume-code>

## Build and open the page

Run `deno task serve` in your terminal. This task does two things:

- Build your site. The `index.md` file is compiled and exported as `index.html`
  in the folder `_site`.
- Starts a local web server, so you can see the generated site in your browser.
  Open the url `http://localhost:3000/` in your browser to see the page.

The web server includes also a live-reload. If you edit the `index.md` file, the
browser is reloaded automatically to see the new changes. {.tip}

**Congratulations, you have created your first page with Lume! 🎉**
