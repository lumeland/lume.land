---
title: Processors
description: A guide on extending Lume with custom processors
order: 15
---

A processor is a function to transform the content of pages **after the page is
rendered**. Let's see an example of a processor to minify HTML pages:

```js
function minifyHTML(pages) {
  for (const page of pages) {
    page.text = minify(page.text);
  }
}
```

If you want to use this processor to build your site, you can register it in the
`_config.js` file:

```js
site.process([".html"], minifyHTML);
```

Now, all HTML pages will be minified.

## The page object

As you can see in the previous example, the function receives an array of
objects, where each object contains a page. Each page object has the page
content, as well as much more data:

```js
function process(pages) {
  for (const page of pages) {
    page.text; // The content of the page (as string)
    page.bytes; // The content of the page (as Uint8Array)
    page.content; // The content of the page (as string or Uint8Array)
    page.document; // The parsed HTML code, to use the DOM API
    page.src; // The info about the source file of this page
    page.data; // All data available for this page (front matter merged with _data)
  }
}
```

For example, let's say you only want to minify the pages where the value
`minify` is set to `true`:

```js
site.process([".html"], (pages) => {
  for (const page of pages) {
    if (page.data.minify) {
      page.text = minify(page.text);
    }
  }
});
```

## Using the DOM API

You can use the **DOM API** (powered by
[deno-dom](https://github.com/b-fuze/deno-dom)) with methods like
`querySelector`, `setAttribute`, etc to modify HTML code. For example, let's
create a processor to add automatically the `alt` attribute to all images:

```js
site.process([".html"], (pages) => {
  for (const page of pages) {
    for (const img of page.document.querySelectorAll("img")) {
      if (!img.hasAttribute("alt")) {
        img.setAttribute("alt", "This is a random alt");
      }
    }
  }
});
```

## Process assets

For non-HTML pages (like CSS or JavaScript files), you can use processors to
compile CSS, minify JavaScript code or minify images.

```js
site.process([".js"], function (pages) {
  for (const page of pages) {
    page.text = myBundler(page.text);

    // Append .min to the filename
    // so it will be saved as example.min.js
    page.data.url = page.data.url.replace(/\.js$/, ".min.js");
  }
});
```

## Preprocess

If you need to execute a function **before rendering** (for example, to
configure a custom template engine or add extra data to some pages), you can use
a **preprocessor**. Preprocessors work like processors, but they are executed
before rendering.

Let's create a preprocessor to include a variable with the source filename:

```js
site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    page.data.filename = page.sourcePath;
  }
});
```

## Create pages dynamically

Processors can generate additional pages (or remove them). The second argument
to (pre)processors contains an array with all pages of the site. You can modify
this array to add or remove pages dynamically. For example:

```js
import { Page } from "lume/core/file.ts";

site.process([".css"], (filteredPages, allPages) => {
  for (const page of filteredPages) {
    // Minify the css content
    const { code, map } = myCssMinifier(page.text);

    // Update the page content
    page.text = code;

    // Create a new page with the source map
    const pageMap = Page.create({
      url: page.data.url + ".map",
      content: map,
    });

    // Add the page to the site
    allPages.push(pageMap);
  }
});
```

## Remove pages dynamically

To remove a page dynamically, you have to remove it from the array of pages in
the second argument:

```ts
// Remove all html pages with the language = "en"
site.process([".html"], (filteredPages, allPages) => {
  for (const page of filteredPages) {
    if (page.data.lang === "en") {
      // Search the page in allPages array and remove it
      allPages.splice(allPages.indexOf(page), 1);
    }
  }
});
```

## How processors and preprocessors work

Both processors and preprocessors are tied to file extensions (`.html`, `.js`
etc). To decide if a page must use a registered processor or preprocessor, Lume
searches the extension of the input file (like `.md` or `.vto`) or the output
file (like `.html` or `.css`).

Another interesting thing is that they are executed in the same order as they
are defined. This allows chaining different processors to the same file
extension. For example: two processors for the `.css` extension, one to compile
the code and another to minify.

## Global (pre)processors

If you want to run a processor or preprocessor for all pages, use `*` in the
first argument:

```js
site.process("*", processAllPages);
```

This is also equivalent to omit the first argument:

```js
site.process(processAllPages);
```
