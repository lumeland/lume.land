---
title: Page files
description: How Lume generates your site based on the source file structure
order: 1
---

Pages are the files that are loaded, processed and saved in your site. You can
create pages using different formats (`md`, `js`, `ts`, `jsx`, `tsx`, `yml`,
etc), but the simplest way is by adding a Markdown file in the root directory
with a suitable filename and `.md` as the extension. Lume will load these files
and generate HTML pages with them:

```txt
├── index.md     => /index.html
├── about.md     => /about/index.html
└── contact.md   => /contact/index.html
```

You can organize the pages into subdirectories, and this structure will be used
in the output of the site build:

```txt
├── index.md        => /index.html
└── documentation
    └── doc1.md     => /documentation/doc1/index.html
    └── doc2.md     => /documentation/doc2/index.html
```

## Pretty URLs

By default, all HTML pages (except `/404.html`) will generate _pretty URLs_
(URLs without the `.html` extension). This means that, instead of
`/about-us.html`, the URL is `/about-us/`. This is done by saving all files as
`index.html` and creating all directories as needed.

If you want to disable it, set `prettyUrls` to `false` in
[config file](../configuration/config-file.md#prettyurls), so you will have
something like this:

```txt
.
├── index.md        => /index.html
└── documentation
    └── doc1.md     => /documentation/doc1.html
    └── doc2.md     => /documentation/doc2.html
```

### 404.html

The page `/404.html` is a special case and the pretty URLs configuration is not
applied here. The reason is most servers and static hosting websites like
[Vercel](https://vercel.com/guides/custom-404-page#static-site-generator-(ssg)),
[Netlify](https://docs.netlify.com/routing/redirects/redirect-options/#custom-404-page-handling),
[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
and others are configured by default to serve the `/404.html` page if the
requested file doesn't exist. It's almost a standard when serving static sites.

Pretty URLs option would convert the 404 page to `/404/index.html`, and this
conflicts with this standard way to serve 404 pages, so this is why it's
disabled. Note that you can change this behavior by explicitly setting the `url`
variable in the front matter of the page.

## Changing the output URL

You might want to have a particular directory structure for your source files
that is different from the built site. With the `url` variable you change the
output filename of any page (see [Page data](../creating-pages/page-data.md))
