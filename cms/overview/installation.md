---
title: Setup in Lume
description: How to setup LumeCMS in a Lume site
order: 1
---

To add LumeCMS to your site, create the `_cms.ts` configuration file with the
following structure:

```ts
import lumeCMS from "lume_cms/mod.ts";

const cms = lumeCMS();

// Configuration here

export default cms;
```

LumeCMS uses import maps to resolve the dependencies. In your `deno.json` file,
you have to add the following imports:

```json
{
  "imports": {
    "lume_cms/": "https://deno.land/x/lume_cms@0.1.0/",
    "std/": "https://deno.land/std@0.213.0/",
    "hono/": "https://deno.land/x/hono@v3.11.11/"
  }
}
```

Go to configuration section to learn how to configure LumeCMS with
[storage](../configuration/storage.md),
[collections](../configuration/collections.md),
[documents](../configuration/documents.md) and
[uploads](../configuration/uploads.md).

## Run in localhost

Run `deno task lume cms` to run the CMS in localhost. Lume automatically detects
the `_cms.ts` configuration, build your site and connect it to the CMS. Now, you
can edit the content in the CMS and preview the results in your site in real
time.
