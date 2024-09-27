---
title: LumeCMS
description: LumeCMS is a CMS to manage the content of any site.
---

LumeCMS is a Deno native CMS to easily manage the content of any website.
Despite its name, it can be used not only for Lume sites, but also for any other
static site generator like Eleventy, Hugo, Jekyll, etc.

- It supports `yaml`, `json` or any format with front matter like `markdown`.
  It's easy to add more formats.
- In addition to the filesystem, it can store data using other storage methods,
  like Deno KV, or external APIs like GitHub API.
- It allows to live-preview the site.
- It's possible to manage different versions using git branches (work in
  progress).

See more info in the [announcement post](https://lume.land/blog/posts/lume-cms/)

## Installation

To add LumeCMS to your site add the `lume/cms/` entry to your import map:

```json
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v2.3.2/",
    "lume/cms/": "https://cdn.jsdelivr.net/gh/lumeland/cms@0.6.3/"
  }
}
```

And create the `_cms.ts` configuration file with the following structure:

```ts
import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

// Configuration here

export default cms;
```

Go to configuration section to learn how to configure LumeCMS with
[storage](./configuration/storage.md),
[collections](./configuration/collections.md),
[documents](./configuration/documents.md) and
[uploads](./configuration/uploads.md).

## Run in localhost

Run `deno task lume cms` to run the CMS in localhost (or `lume cms` if you're on
Lume CLI). Lume automatically detects the `_cms.ts` configuration, build your
site and connect it to the CMS. Now, you can edit the content in the CMS and
preview the results in your site in real time.
