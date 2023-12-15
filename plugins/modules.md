---
title: Modules
description: Use ESM and TypeScript modules to create pages, layouts, and store data.
mod: plugins/modules.ts
enabled: true
tags:
  - template_engine
  - data_format
---

## Description

Lume is built on top of Deno, so it has native support for JavaScript and
TypeScript modules. This plugin allows you to use JavaScript and TypeScript to
create pages, layouts, and data files.

## Installation

This plugin is installed by default. 🎉

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
`.page.js` or `.page.ts` (the `.page` subextension is required to differentiate
JavaScript/TypeScript files that generate HTML pages from other JavaScript files
to be executed in the browser). To export the variables, use named exports and
to export the main content you can use the default export.

```js
export const title = "Welcome to my page";
export const layout = "layouts/main.vto";

export default "This is my first post using lume. I hope you like it!";
```

The default export can be a function. It will be executed by passing all the
available data in the first argument and the filters in the second argument:

<lume-code>

```js { title="page.js" }
export const title = "Welcome to my page";
export const layout = "layouts/main.vto";

export default (data, filters) =>
  `<h1>${data.title}</h1>
  <p>This is my first post using lume. I hope you like it!</p>
  <a href="${filters.url("/")}">Back to home</a>`;
```

```TypeScript { title="page.ts" }
export const title = "Welcome to my page";
export const layout = "layouts/main.vto";

export default (data: Lume.Data, helpers: Lume.Helpers) =>
  `<h1>${data.title}</h1>
  <p>This is my first post using lume. I hope you like it!</p>
  <a href="${filters.url("/")}">Back to home</a>`;
```

</lume-code>

JavaScript/TypeScript allows generating multiple pages from the same file. See
[Pagination](./paginate.md) for more info.

## Creating layouts

It's possible to create layouts using JavaScript/TypeScript. Just create `.js`
or `.ts` files inside the `_includes` directory.

<lume-code>

```js { title="layout.js" }
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

```TypeScript { title="layout.ts" }
export default ({ title, content }: Lume.Data, helpers: Lume.Helpers) =>
  `<html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      ${content}
    </body>
  </html>`;
```

</lume-code>

## Configure VSCode

You can use some extensions for VS Code for template string syntax highlight:

- [ES6 String HTML](https://marketplace.visualstudio.com/items?itemName=hjb2012.vscode-es6-string-html):
  highlight HTML with Js comment `/*html*/`
  ```js
  export default (params) => /*html*/ `<p>It's work!</p>`;
  ```
- [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html):
  highlight HTML with Js tag function
  ```TypeScript
  // utilities.ts
  export const html = (str: string[], ...val: unknown[]): string =>
    String.raw({ raw: str }, ...val);
  ```
  ```js
  import { html } from "utilities.ts";

  export default (params) => html`<p>It's work!</p>`;
  ```
