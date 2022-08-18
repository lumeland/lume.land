---
title: Page files
description: How Lume generate your site based on the source file structure
order: 1
---

${toc}

Pages are the files that are loaded, processed and saved in your site. You can
create pages using different formats (`md`, `js`, `ts`, `jsx`, `tsx`, `yml`,
etc) but the simplest way is by adding a Markdown file in the root directory
with a suitable filename and `.md` as extension. Lume will load these files and
generate HTML pages with them:

```txt
.
├── index.md     => /index.html
├── about.md     => /about/index.html
└── contact.md   => /contact/index.html
```

You can organize the pages into subdirectories, and this structure will be used
also in the output of the site build:

```txt
.
├── index.md        => /index.html
└── documentation
    └── doc1.md     => /documentation/doc1/index.html
    └── doc2.md     => /documentation/doc2/index.html
```

## Pretty URLs

By default, all HTML pages will generate _pretty URLs_ (URLs without the `.html`
extension). This means that, instead of `/about-us.html`, the URL is
`/about-us/`. This is done by saving all files as `index.html` and create all
directories as needed.

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

## Page order

All pages have a `date` variable with the file creation date. This value can be
used to order the pages (in a blog, for example). If you want to define a
different date, you can prepend it to the filename using the `yyyy-mm-dd` syntax
following by an underscore `_` (or `yyyy-mm-dd-hh-ii-ss` if you need also the
time). Note that this part is removed on generating the final url:

```txt
.
├── index.md                          => /index.html
└── posts
    └── 2020-06-21_hello-world.md     => /posts/hello-world/index.html
    └── 2020-06-22_my-second-post.md  => /posts/my-second-post/index.html
```

If you don't mind the exact date but want to keep an order, you can use just
numbers (they are treated as timestamp):

```txt
.
├── index.md                   => /index.html
└── docs
    └── 1_getting-started.md   => /docs/getting-started/index.html
    └── 2_installation.md      => /docs/installation/index.html
    └── 3_downloads.md         => /docs/downloads/index.html
```

From `Lume v1.9`, dates can be defined in folders:

```txt
.
├── index.md                          => /index.html
└── posts
    └── 2020-06-21_hello-world/
        └── index.md     => /posts/hello-world/index.html
        └── other.md     => /posts/hello-world/other/index.html
```

## Changing the output URL

You might want to have a particular directory structure for your source files
that is different for the built site. With the `url` variable you change the
output filename of any page (see [Page data](../creating-pages/page-data.md))
