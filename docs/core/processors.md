---
title: Processors
description: A guide on extending Lume with custom processors
order: 15
---

A processor is a function to transform the content of pages and assets. Let's
see an example of a processor to minify HTML pages:

```js
function minifyHTML(page) {
  page.content = minify(page.content);
}
```

If you want to use this processor to build your site, you can register it in the
`_config.js` file:

```js
site.process([".html"], minifyHTML);
```

Now, all HTML pages with be minified.

## Access to page data

As you can see in the previous example, the function receives an object with the
page (or asset). This means that you can access not only to the page content but
to many other data:

```js
function process(page) {
  page.content; // The content of the page
  page.document; // The parsed HTML code, to use the DOM API
  page.src; // The info about the source file of this page
  page.dest; // The info about the destination of the page
  page.data; // All data available for this page (frontmatter merged with _data)
}
```

For example, let's say you only want to minify the pages with the value `minify`
as `true`:

```js
site.process([".html"], (page) => {
  if (page.data.minify) {
    page.content = minify(page.content);
  }
});
```

You can use the **DOM API** (provided by
[deno-dom](https://github.com/b-fuze/deno-dom)) with methods like
`querySelector`, `setAttribute`, etc to modify HTML code. For example, let's
create a processor to add automatically the `alt` attribute to all images:

```js
site.process([".html"], (page) => {
  page.document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt")) {
      img.setAttribute("alt", "This is a random alt");
    }
  });
});
```

Note: processors are executed just after render the page (with a template
engine).

## Process assets

Processors only can transform pages or assets that are previously loaded. So if
you want to process some assets (like CSS or JavaScript files), make sure that
they are loaded before. See [Loaders](loaders.md) for more information about how
to register a new loader. Let's see an example of how to load and transform
JavaScript files:

```js
import lume from "lume/mod.ts";

const site = lume();

// Load JavaScript files as plain text:
site.loadAssets([".js"]);

// Process the JavaScript files
site.process([".js"], function (page) {
  page.content = myBundler(page.content);

  page.dest.path += ".min"; // Append .min to the filename, so it will be saved as example.min.js
});
```

## Preprocess

If you need to execute a function **before rendering** (for example, to
configure a custom template engine or add extra data to some pages), you can use
a **preprocessor**. Preprocessors work like processors but with they are
executed before rendering.

Let's create a preprocessor to include a variable with the source filename:

```js
site.preprocess(
  [".html"],
  (page) => page.data.filename = page.src.path + page.src.ext,
);
```

## Extensions

Both processors and preprocessors are tied to file extensions (`.html`, `.js`
etc). To decide if a page must use a registered processor or preprocessor, Lume
search this extension in the input file (like `.md` or `.njk`) or the output
file (like `.html` or `.css`). This means that you can create processors to
modify a page based in the extension of the input file, not only the output.

## Global (pre)processors

If you want to run a processor or preprocessor with all pages, use `*` in the
first argument:

```js
site.process("*", processAllPages);
```
