---
title: About LumeCMS
description: LumeCSM is a CMS for static sites.
order: 0
---

LumeCMS is a Deno native CMS to update the site content easily. Despite its
name, it can be used not only for Lume sites, but also any other static site
generator that stores the content in files like Eleventy, Hugo, Jekyll, etc.

- It supports `yaml`, `json` or any format with front matter like `markdown`.
  It's easy to add more formats.
- In addition to the filesystem, it can store data using other storage methods,
  like Deno KV, or external APIs like GitHub API.
- It allows to live-preview the site.
- It's possible to manage different versions using git branches.
