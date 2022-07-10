---
title: Modules
description: Use ESM and TypeScript modules to create pages, layouts and store data.
docs: plugins/modules.ts/~/Options
enabled: true
tags:
  - template_engine
  - data_format
---

${toc}

## Installation

This plugin is installed by default. 🎉

## Description

Lume is built on top of Deno so it has native support for JavaScript and
TypeScript modules. This plugin allows to use JavaScript and TypeScript to
create pages, layouts and data files.

## Configuration

If you want to change the default configuration, use the second argument of
`lume()` function in your `_config.ts` file. See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/modules.ts/~/Options).

For example, to use a different extension than `.tmpl.js` and `.tmpl.ts` to
generate pages, edit the `pageExtensions` property:

```ts
import lume from "lume/mod.ts";

// Modules plugin configuration
const modules = {
  pagesExtensions: [".page.js", ".page.ts"],
};

// Apply the plugin config
const site = lume({}, { modules });
```

## Creating _data files

Create `_data.js` or `_data/*.js` (or the TypeScript equivalent `_data.ts` or
`_data/*.ts`) files to save shared data.

```js
export const users = [
  {
    name: "Oscar",
    surname: "Otero",
  },
  {
    name: "Michael",
    surname: "Jackson",
  },
];
```

## Creating pages

To create pages using JavaScript or TypeScript, create a file with the extension
`.tmpl.js` or `.tmpl.ts` (the `.tmpl` subextension is required to differentiate
JavaScript/TypeScript files that generate HTML pages from other JavaScript files
to be executed in the browser). To export the variables, use named exports and
to export the main content you can use the default export.

```js
export const title = "Welcome to my page";
export const layout = "layouts/main.njk";

export default "This is my first post using lume. I hope you like it!";
```

The default export can be a function, so it will be executed passing all the
available data in the first argument and the filters in the second argument:

```js
export const title = "Welcome to my page";
export const layout = "layouts/main.njk";

export default (data, filters) =>
  `<h1>${data.title}</h1>
  <p>This is my first post using lume. I hope you like it!</p>
  <a href="${filters.url("/")}">Back to home</a>`;
```

JavaScript/TypeScript allows to generate multiple pages from the same file, see
[Pagination](./paginate.md) for more info.

## Creating layouts

It's possible to create layouts using JavaScript/TypeScript. Just create
`.tmpl.js` or `.tmpl.ts` files inside the `_includes` directory.

```js
export default ({ title, content }, filters) =>
  `<html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      ${content}
    </body>
  </html>`;
```
