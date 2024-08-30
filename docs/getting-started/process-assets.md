---
title: How to process assets
description: Processing assets with Lume (to compile, minify, etc)
order: 8
---

In [the previous step,](./working-with-assets.md) we learned how to copy files
to the `_site` folder. We also said that Lume has two ways of working with
assets and copying them is the easiest.

Copy files is not only the easiest way but also the fastest because Lume doesn't
need to load the content of the files in memory. It only copies the files to the
`_site` folder which is a fast operation.

The other way to handle assets is by loading them. This is useful if you want to
modify the content somehow. A typical use case is if we want to transpile the
content (like loading SASS files and converting them to CSS) or minify them.

This is a bit more complex operation because we need to configure Lume to load
these files (so they will be stored in memory) and tell Lume what we want to do
with this content once it's loaded. Lume has two functions to do that:
`loadAssets()` and `process()`.

## Minify CSS code

Let's say we want to minify the `styles.css` file we created in the previous
step. We can do it with the following code:

<lume-code>

```js {title="_config.ts"}
import lume from "lume/mod.ts";

const site = lume();

// Configure Lume to load all .css files
site.loadAssets([".css"]);

// Basic function to minify CSS
function minifyCSS(css: string) {
  return css
 .replaceAll("\n", " ")
 .replaceAll(/\s+/g, " ")
 .replaceAll(/([:;{])\s/g, "$1");
}

// Process all .css files with our minifyCSS function
site.process([".css"], (assets) => {
  for (const asset of assets) {
 asset.content = minifyCSS(asset.content as string);
 }
});

export default site;
```

</lume-code>

There are a lot of things in this code! The first interesting piece is
`loadAssets()`, used to configure Lume to load some file extensions in memory.
The function accepts an array of extensions we want to load, so we passed an
array with the `.css` extension.

The code `site.copy("/styles.css")` added in the previous step was removed. This
is because copying a file takes precedence over loading it. So, if we want Lume
to load the `styles.css` file, it cannot be copied (Lume cannot do both things).

### Process code

We also created the function `minifyCSS` to remove unnecessary spaces and line
breaks in the CSS code. This is a **basic function for illustration purposes**.
There are many open-source packages that you can use that will do a better job.
We wanted to keep this demo simple, so we created a simple function ourselves.

Finally, we use the function `process()` to process the CSS files. The function
accepts an array of extensions that we want to process and a callback that
receives all assets matching with these extensions in the first argument. We use
the function `minifyCSS` to modify the variable `asset.content`, which is where
the content is stored.

> [!tip]
>
> Processors are one of the most powerful features of Lume. You can learn more
> in the [processors documentation](../core/processors.md).

As you can see, loading and processing files in Lume requires more work and
understanding of how Lume works under the hood than copying them. Fortunately,
Lume has a powerful plugin system that hides all this complexity and makes these
tasks easier. Let's see them in the next step!
