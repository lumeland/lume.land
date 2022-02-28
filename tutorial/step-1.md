---
step: 1
title: Create your first page
---

## Create the content

Create the file `index.md` and add some content in
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

Run `lume --serve` in your terminal. This command does two things:

- Build your site. This means that the `index.md` file is compiled and exported
  as `index.html` in the folder `_site`.
- The argument `--serve` starts a local web server, so you can see the generated
  site in your browser. Open the url `http://localhost:3000/` in your browser to
  see your first page.

The web server includes also a live-reload. This means after any change in the
markdown file (for example, edit the title), the browser will reload the page to
see the new updates.

**Congratulations, you have created your first page with Lume! 🎉**
