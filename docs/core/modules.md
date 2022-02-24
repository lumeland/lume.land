---
title: Modules
description: Using javascript and typescript modules for data, pages, and layouts
docs: plugins/modules.ts
order: 4
---

Because Lume is built for Deno, it has native support for JavaScript and
TypeScript modules. These two formats are **enabled** by default.

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
Javascript/Typescript files that generate HTML pages from other JavaScript files
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
[Pagination](pagination.md) for more info.

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

## Configure the Modules plugin

In `_config.ts`, the second argument of `lume()` is used to configure the
plugins that are enabled by default (like this!). Use it to configure the
Modules plugin.

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
