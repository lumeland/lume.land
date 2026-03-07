---
title: Using plugins
description: How to use Lume plugins for common tasks
order: 9
---

In the previous step, we learned how Lume can add files and process them.
Fortunately, you won't need to do this very often, because many common
operations that you may want to do are already implemented in Lume in the shape
of [plugins](/plugins/).

Plugins provide an extremely simple interface to configure Lume to perform
operations like [transpile JavaScript](../../plugins/esbuild.md),
[transform images](../../plugins/transform_images.md),
[generate site maps](../../plugins/sitemap.md), etc. Plugins cover the common
problems and tasks you have to face creating websites.

## Minify CSS with a plugin

To minify your CSS code, instead of configuring Lume to load and process CSS
files, you can use one of the plugins available for this. In this example we
will use [lightningcss](../../plugins/lightningcss.md), a plugin to use the
awesome [Lightning CSS](https://lightningcss.dev/), an extremely fast CSS
bundler and minifier, that not only minifies the code but also transforms it to
make it compatible with all browsers.

To use this plugin in Lume, import it in the `_config.ts` file and enable it
with the `use()` function:

```js
import lume from "lume/mod.ts";
import lightningCSS from "lume/plugins/lightningcss.ts";

const site = lume();

site.add("/styles.css");
site.use(lightningCSS());

export default site;
```

That's all! All the logic to configure Lume to process `.css` files is hidden
behind the plugin. Your `_config.ts` file is now cleaner.

> [!tip]
>
> Plugins are easy to use but also easy to create! Learn
> [how to create your own plugins](../advanced/plugins.md).

[Go to Plugins](/plugins/) to see all the official Lume plugins.
