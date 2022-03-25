---
title: Creating plugins
description: Guide to create your own plugins to extend Lume
---

Lume is an static site generator that can be extended easily adding more
[loaders, engines](../core/loaders.md), [processors](../core/processors.md) etc.
Plugins provide an easy interface to extend Lume without write too much code in
the `_config.ts` file.

A plugin is just a function that receives a lume instance in the first argument,
in order to configure and register new elements to it.

## Simple plugin example

Let's say we have this code in our `_config.ts` file to add a copyright banner
to all CSS pages:

```ts
// _config.ts

import lume from "lume/mod.ts";

const site = lume();

function addBanner(content: string): string {
  const banner = "/* © This code belongs to ACME inc. */";
  return $banner + "\n" + content;
}

site.process([".css"], (page) => {
  page.content = addBanner(page.content as string);
});

export default site;
```

We can encapsulate this code inside a plugin, and even include some
configuration:

```ts
// my-plugins/css_banner.ts

interface Options {
  message: string;
}

export default function (options: Options) {
  function addBanner(content: string): string {
    const banner = `/* ${options.message} */`;
    return $banner + "\n" + content;
  }

  return (site: Site) => {
    site.process([".css"], (page) => {
      page.content = addBanner(page.content as string);
    });
  };
}
```

And now we can use it in the `_config.ts` file in this way:

```ts
import lume from "lume/mod.ts";
import cssBanner from "./my-plugins/css_banner.ts";

const site = lume();

site.use(cssBanner({
  message: "© This code belongs to ACME inc.",
}));

export default site;
```

Plugins can't do anything that you couldn't do in the `_config.ts` file, but
they provide a better interface to organize and reuse your code. And better:
share it with others.

Take a look to the
[repository of Lume plugins](https://github.com/lumeland/lume/tree/master/plugins)
for more advanced examples.
