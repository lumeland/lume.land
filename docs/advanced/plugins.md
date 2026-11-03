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
to all CSS files:

```ts
// _config.ts

import lume from "@lumeland/lume";

const site = lume();

site.process([".css"], (files) => {
  for (const file of files) {
    file.text = `/* © This code belongs to ACME inc. */\n${file.text}`;
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
    site.process([".css"], (files) => {
      const { message } = options;

      for (const file of files) {
        file.text = `/* ${message} */\n${file.text}`;
      }
    });
  };
}
```

And now, we can use it in the `_config.ts` file like this:

```ts
import lume from "@lumeland/lume";
import cssBanner from "./_plugins/css-banner.ts";

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
create a hook in our `css-banner` plugin to change the message:

```ts
// _plugins/css-banner.ts

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
    site.process([".css"], (files) => {
      const { message } = options;

      for (const file of files) {
        file.text = `/* ${message} */\n${file.text}`;
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
// _plugins/open-source.ts

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
import cssBanner from "./_plugins/css-banner.ts";
import openSource from "./_plugins/open-source.ts";

const site = lume();

site.use(cssBanner({
  message: "© This code belongs to ACME inc.",
}));

site.use(openSource());

export default site;
```
