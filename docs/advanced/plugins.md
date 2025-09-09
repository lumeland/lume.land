---
title: Creating plugins
description: Guide to creating your own plugins for Lume
---

Lume can be easily extended by adding more [loaders](../core/loaders.md),
[engines](../core/loaders.md#template-engines), or
[processors](../core/processors.md). Plugins provide an easy interface to extend
Lume without writing too much code in the `_config.ts` file.

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
  return banner + "\n" + content;
}

site.process([".css"], (pages) => {
  for (const page of pages) {
    page.text = addBanner(page.text);
  }
});

export default site;
```

We can encapsulate this code inside a plugin and even include some
configuration:

```ts
// my-plugins/css_banner.ts

interface Options {
  message: string;
}

export default function (options: Options) {
  function addBanner(content: string): string {
    const banner = `/* ${options.message} */`;
    return banner + "\n" + content;
  }

  return (site: Site) => {
    site.process([".css"], (pages) => {
      for (const page of pages) {
        page.text = addBanner(page.text);
      }
    });
  };
}
```

And now, we can use it in the `_config.ts` file like this:

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
they provide a better interface to organize, reuse, and even share your code
with others.

Take a look at the
[Lume plugins repository](https://github.com/lumeland/lume/tree/main/plugins)
for more advanced examples.

## Hooks

Some plugins expose _hooks_ that can be invoked by other plugins or in the
`_config.ts` file. A hook is a function that can do arbitrary things, like
changing a configuration of a plugin. Hooks are stored in `site.hooks`. Let's
create a hook in our `css_banner` plugin to change the message:

```ts
// my-plugins/css_banner.ts

interface Options {
  message: string;
}

export default function (options: Options) {
  function addBanner(content: string): string {
    const banner = `/* ${options.message} */`;
    return banner + "\n" + content;
  }

  return (site: Site) => {
    // Add a hook to change the message
    site.hooks.changeCssBanner = (message: string) => {
      options.message = message;
    };

    site.process([".css"], (pages) => {
      for (const page of pages) {
        page.text = addBanner(page.text);
      }
    });
  };
}
```

Now the message can be changed after plugin installation:

```ts
import lume from "lume/mod.ts";
import cssBanner from "./my-plugins/css_banner.ts";

const site = lume();

site.use(cssBanner({
  message: "© This code belongs to ACME inc.",
}));

site.hooks.changeCssBanner("This code is open source");

export default site;
```

Or we can invoke this hook from other plugin:

```ts
// my-plugins/open_source.ts

export default function () {
  return (site: Site) => {
    if (!site.hooks.changeCssBanner) {
      throw new Error("This plugin requires css_banner to be installed before");
    }

    site.hooks.changeCssBanner("This code is open source");
  };
}
```

```ts
import lume from "lume/mod.ts";
import cssBanner from "./my-plugins/css_banner.ts";
import openSource from "./my-plugins/open_source.ts";

const site = lume();

site.use(cssBanner({
  message: "© This code belongs to ACME inc.",
}));

site.use(openSource());

export default site;
```

## Publishing plugins

If you created a plugin and want to let other people use it, it's
straightforward thanks to HTTP imports and Deno's native Typescript support. You
only need to make your code accessible over an HTTP URL.

This is a list of recommendations:

- Use `lume/` specifier to import modules from Lume. For example, let's say your
  plugin uses the `merge` util. Instead of importing the full URL like this:

```js
import { merge } from "https://deno.land/x/lume@v2.2.0/core/utils/object.ts";
```

It's better to use the `lume/` specifier:

```js
import { merge } from "lume/core/utils/object.ts";
```

This avoids duplicated versions of Lume loaded by the project because the
`lume/` specifier is configured in the import maps (remember to include this
entry in your import maps).

- Use an HTTP package registry, like `deno.land/x`. Alternatively, you can use
  [jsDelivr](https://www.jsdelivr.com/) to serve files from GitHub repositories
  and ensure reliability (they are permanently cached
  [even if the GitHub repository is deleted](https://www.jsdelivr.com/github)).

- [JSR](https://jsr.io/) is **not recommended** due to not supporting HTTP
  imports (it's not possible to import Lume types), buggy import maps behavior,
  and code changes made automatically by the platform that can cause unexpected
  bugs.

- Once your plugin is published, please let us know! You can create a PR to the
  [awesome-lume repository](https://github.com/lumeland/awesome-lume).
