---
title: Creating plugins
description: Guide to creating your own plugins for Lume
---

Plugins provide an easy interface to extend Lume without writing too much code
in the `_config.ts` file. A plugin is just a function that receives a lume
instance in the first argument, in order to configure and register new elements
to it.

## Simple plugin example

Let's say we have this code in our `_config.ts` file to add a copyright banner
to all CSS pages:

```ts
// _config.ts

import lume from "@lumeland/lume";

const site = lume();

site.process([".css"], (pages) => {
  for (const page of pages) {
    page.text = `/* © This code belongs to ACME inc. */\n${page.text}`;
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
  return (site: Site) => {
    site.process([".css"], (pages) => {
      const { message } = options;

      for (const page of pages) {
        page.text = `/* ${message} */\n${page.text}`;
      }
    });
  };
}
```

And now, we can use it in the `_config.ts` file like this:

```ts
import lume from "@lumeland/lume";
import cssBanner from "./my-plugins/css_banner.ts";

const site = lume();

site.use(cssBanner({
  message: "© This code belongs to ACME inc.",
}));

export default site;
```

Plugins can't do anything that you couldn't do directly in the `_config.ts`
file, but they provide a better interface to organize, reuse, and even share
your code with others.

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
  return (site: Site) => {
    // Add a hook to change the message
    site.hooks.changeMessage = (message: string) => {
      options.message = message;
    };

    // Process the CSS files
    site.process([".css"], (pages) => {
      const { message } = options;

      for (const page of pages) {
        page.text = `/* ${message} */\n${page.text}`;
      }
    });
  };
}
```

Now the message can be changed after the plugin initialization:

```ts
import lume from "@lumeland/lume";
import cssBanner from "./my-plugins/css_banner.ts";

const site = lume();

site.use(cssBanner({
  message: "© This code belongs to ACME inc.",
}));

site.hooks.changeMessage("This code is open source");

export default site;
```

Or we can invoke this hook from other plugin:

```ts
// my-plugins/open_source.ts

export default function () {
  return (site: Site) => {
    if (!site.hooks.changeMessage) {
      throw new Error("This plugin requires css_banner to be installed before");
    }

    site.hooks.changeMessage("This code is open source");
  };
}
```

```ts
import lume from "@lumeland/lume";
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

If you created a plugin and want people to use it, it's straightforward thanks
to HTTP imports and Deno's native Typescript support. You only need to make your
code accessible over an HTTP URL.

This is a list of recommendations:

- Use `lume/` specifier to import modules from Lume. For example, let's say your
  plugin uses the `merge` util. Instead of importing the full URL like this:

```js
import { merge } from "@LUME_URL/core/utils/object.ts";
```

It's better to use the `lume/` specifier:

```js
import { merge } from "@lumeland/core/utils/object.ts";
```

This avoids duplicated versions of Lume loaded by the project because the
`lume/` specifier is configured in the import maps (remember to include this
entry in your import maps).

- Use an HTTP package registry. [jsDelivr](https://www.jsdelivr.com/) is
  recommended to serve files from GitHub repositories and ensure reliability
  (they are permanently cached
  [even if the GitHub repository is deleted](https://www.jsdelivr.com/github)).
  Alternatively, you can use `deno.land/x` but it's deprecated by Deno.

- [JSR](https://jsr.io/) is **not recommended** due to not supporting HTTP
  imports (it's not possible to import Lume types), buggy import maps behavior,
  and their build step that makes automatic changes in the code that may cause
  unexpected bugs.

- Once your plugin is published, please let us know! You can create a PR to the
  [awesome-lume repository](https://github.com/lumeland/awesome-lume).
