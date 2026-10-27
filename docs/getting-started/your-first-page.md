---
title: Create your first page
description: How to build the most simple page in Lume
order: 1
---

## The page file

After setup Lume ([see installation instructions](../overview/installation.md)
if you don't have the `_config.ts`), the installer automatically creates the
`index.md` file with some content in
[Markdown](https://en.wikipedia.org/wiki/Markdown) format, for example:

<lume-code>

```md {title="index.md"}
# Hello world

[Go to Lume documentation](https://lume.land)
```

</lume-code>

## Build and open the page

Run `npm run serve` in your terminal. This task does two things:

- It builds your site. The `index.md` file is compiled and exported as
  `index.html` in the folder `_site`.
- Starts a local web server, so you can see the generated site in your browser.
  Open the url `http://localhost:3000/` in your browser to see the page.

> [!tip]
>
> The web server also includes live-reloading. If you edit the `index.md` file,
> the browser is reloaded automatically to see the new changes.

**Congratulations, you have created your first page with Lume! 🎉**
