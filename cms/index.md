---
title: LumeCMS
description: LumeCMS is a CMS to manage the content of any site.
---

LumeCMS is a CMS to manage the content of any website.
Despite its name, it can be used not only for Lume sites, but also for any other
static site generator like Eleventy, Hugo, Jekyll, etc.

- It supports `yaml`, `json` or any format with front matter like `markdown`.
  It's easy to add more formats.
- In addition to the filesystem, it can store data using other storage methods,
  like databases, or external APIs like GitHub API.
- It allows to live-preview the site.
- It's possible to manage different versions using git branches.

## Installation

To add LumeCMS to your Lume site, you need to install two packages: `@lumeland/cms` (the CMS) and `@lumeland/plugin-cms` (the plugin to integrate it with Lume):

```sh
npm install @lumeland/cms @lumeland/plugin-cms
```

## Configuration file

Create a file, for example `cms.ts`, with the following structure:

```ts
import createCMS from "@lumeland/cms";

const cms = createCMS();

// Configuration here

export default cms;
```

This file will contain your CMS configuration (collections, document, uploads, etc).

## Lume integration

Now you have to import the cms in the `_config.ts` and use the plugin to connect it with your Lume site:

```ts
import lume from "@lumeland/lume";
import lumeCMS from "@lumeland/plugin-cms";
import cms from "./cms.ts";

const site = lume();

site.use(lumeCMS({ cms }));

export default site;
```

That's all, if you run your site with `npm run serve`, the CMS is accessible in the `/admin` path. You
can edit the content in the CMS and preview the results in your site in real time.

Go to the configuration section to learn how to configure LumeCMS with
[storage](./configuration/storage.md),
[collections](./configuration/collections.md),
[documents](./configuration/documents.md) and
[uploads](./configuration/uploads.md).

## Standalone installation

To use the CMS without the Lume integration, just create a file with the CMS configuration and run it with the following code:

```ts
import cms from "./cms.ts";

const app = cms.init();

app.serve();
```
