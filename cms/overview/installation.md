---
title: Install LumeCMS
description: How to setup Lume CMS for your site
order: 1
---

Lume CMS is run by Deno, so make sure you have Deno installed in your computer.

## Install for Lume sites

To add LumeCMS to your site, create the `_cms.ts` configuration file with the
following structure:

```ts
import lumeCMS from "lume_cms/mod.ts";

const cms = lumeCMS();

// Configuration here

export default cms;
```

LumeCMS uses import maps to resolve the dependencies. In your `deno.json` file,
you have to define the following imports:

```json
{
  "imports": {
    "lume_cms/": "https://deno.land/x/lume_cms@0.1.0/",
    "std/": "https://deno.land/std@0.213.0/",
    "hono/": "https://deno.land/x/hono@v3.11.11/"
  }
}
```

Go to configuration section to learn how to configure LumeCMS.
