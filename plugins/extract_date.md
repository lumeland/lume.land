---
title: Extract date
description: Extract dates from the filenames
mod: plugins/extract_date.ts
tags:
  - utils
---

## Description

Some static site generators extract automatically the date of the pages from the
path name. Lume 1 & 2 did that too, but as of version 3, this behavior has been
moved to a this plugin.

The plugin can detect and extract the dates from the name of the source file.
You have to prepend the date to the filename using the `yyyy-mm-dd` syntax
followed by a hyphen `-` or an underscore `_` (or `yyyy-mm-dd-hh-ii-ss` if you
also need the time). Note that this part is removed when generating the final
url:

```txt
.
├── index.md                          => /index.html
└── posts
    └── 2020-06-21_hello-world.md     => /posts/hello-world/index.html
    └── 2020-06-22_my-second-post.md  => /posts/my-second-post/index.html
```

Dates can be defined in folders, so it's shared by all pages inside:

```txt
.
├── index.md                          => /index.html
└── posts
    └── 2020-06-21_hello-world/
        └── index.md     => /posts/hello-world/index.html
        └── other.md     => /posts/hello-world/other/index.html
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import extractDate from "lume/plugins/extract_date.ts";

const site = lume();

site.use(extractDate(/* Options */));

export default site;
```

## Configuration

If you want to detect the date but don't want to remove it from the filename,
use the configuration option `remove: false`:

```js
site.use(extractDate({
  remove: false, // Keep the dates in the filename
}));
```
