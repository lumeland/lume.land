---
title: Creating plugins
description: Creating plugins to extend Lume
---

Lume is an static site generator that can be extended easily adding more
[loaders, engines](../core/loaders.md), [processors](../core/processors.md) etc.
Plugins provide an easy interface to extend Lume without write too much code in
the `_config.js` file.

A plugin is just a function that receives a lume instance in the first argument,
in order to configure and register new elements to it.

For example, to register a new template engine, you have to create an instance
and decide the extensions to apply,
[as you can see in the docs](../core/loaders.md):

```ts
import textLoader from "lume/loaders/text.ts";
import CustomEngine from "https://deno.land/x/my-custom-engine/mod.ts";

const myEngine = new CustomEngine();
site.loadPages([".me"], textLoader, myEngine);
```

You can encapsulate this code in a plugin:

```ts
import textLoader from "lume/loaders/text.ts";
import CustomEngine from "https://deno.land/x/my-custom-engine/mod.ts";

export default function () {
  return (site) => {
    const myEngine = new CustomEngine();
    site.loadPages([".me"], textLoader, myEngine);
  };
}
```

So in your `_config.js` you only have to import the plugin and use it:

```ts
import myPlugin from "https://deno.land/x/my-lume-plugin/mod.ts";

site.use(myPlugin());
```

To pass configuration options to your plugin, just add arguments to the
functions returning the plugin. For example, let's say you want to customize the
file extensions to apply the template engine:

```ts
import textLoader from "lume/loaders/text.ts";
import CustomEngine from "https://deno.land/x/my-custom-engine/mod.ts";
import { merge } from "lume/core/utils.ts";

export interface Options {
  extensions: string[];
}

const defaults: Options = {
  extensions: [".me"],
};

export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return (site) => {
    const myEngine = new CustomEngine();
    site.loadPages(options.extensions, textLoader, myEngine);
  };
}
```

Now, in your `_config.js` file you can customize the extensions:

```js
import myPlugin from "https://deno.land/x/my-lume-plugin/mod.ts";

site.use(myPlugin([".me", ".mo"]));
```

Take a look to the
[repository of Lume plugins](https://github.com/lumeland/lume/tree/master/plugins)
for more real examples.
