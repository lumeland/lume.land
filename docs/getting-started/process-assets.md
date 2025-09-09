---
title: How to process assets
description: Processing assets with Lume (to compile, minify, etc)
order: 8
---

In [the previous step,](./working-with-assets.md) we learned how to add files to
the `_site` folder. Sometimes, you my want to modify the content of these files
somehow, such as transpiling (like loading SASS files and converting them to
CSS) or minifying them. To do that, Lume has the `process()` function.

## Minify CSS code

Let's say we want to minify the `styles.css` file we created in the previous
step. We can do it with the following code:

<lume-code>

```js {title="_config.ts"}
import lume from "lume/mod.ts";

const site = lume();

// Load the styles file
site.add("/styles.css");

// Basic function to minify CSS
function minifyCSS(css: string) {
  return css
 .replaceAll("\n", " ")
 .replaceAll(/\s+/g, " ")
 .replaceAll(/([:;{])\s/g, "$1");
}

// Process all .css files with our minifyCSS function
site.process([".css"], (files) => {
  for (const file of files) {
    file.text = minifyCSS(file.text);
  }
});

export default site;
```

</lume-code>

We created the function `minifyCSS` to remove unnecessary spaces and line breaks
in the CSS code. This is a **basic function for illustration purposes**. There
are many open-source packages that you can use that will do a better job. We
wanted to keep this demo simple, so we created a simple function ourselves.

Then, we use the function `process()` to process the CSS files. The function
accepts an array of extensions that we want to process and a callback that
receives all files matching with these extensions in the first argument. We use
the function `minifyCSS` to modify the variable `file.text`, which is where the
content is stored.

> [!tip]
>
> Processors are one of the most powerful features of Lume. You can learn more
> in the [processors documentation](../core/processors.md).

As you can see, adding and processing files is really easy in Lume. And if that
were not enough, Lume has a powerful plugin system that makes these tasks
easier. Let's see them in the next step!
