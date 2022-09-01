---
title: JSX Preact
description: Create pages and layouts with JSX (Preact).
docs: plugins/jsx_preact.ts/~/Options
tags:
  - template_engine
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import preact from "lume/plugins/jsx_preact.ts";

const site = lume();

site.use(preact({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/jsx_preact.ts/~/Options).

You might want to add following fields to deno.json and import_map.json in order
to configure Deno to use Preact as the JSX library:

<lume-code>

```json{title=deno.json}
{
  "importMap": "./import_map.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

```json{title=import_map.json}
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.11.0/",
    "preact/jsx-runtime": "https://esm.sh/preact@10.10.6/jsx-runtime",
    "preact/jsx-dev-runtime": "https://esm.sh/preact@10.10.6/jsx-dev-runtime"
  }
}
```

</lume-code>

## Description

This plugin works exactly like [JSX](./jsx.md) but using
[Preact](https://preactjs.com/) (a 3kb React alternative with the same API but
faster and lighter) to render the JSX.

## Creating pages

To create a page with this format, just add a file with `.jsx` or `.tsx`
extension to your site. This format works exactly the same as
[JavaScript/TypeScript files](./modules.md), but with the addition of you can
export JSX code in the default export:

```jsx
export const title = "Welcome to my page";
export const layout = "layouts/main.njk";

export default (data) => (
  <>
    <h1>{data.title}</h1>
    <p>This is my first post using lume. I hope you like it!</p>
  </>
);
```

Note that this page uses the `layouts/main.njk` layout to wrap the content (you
can mix different template languages like Nunjucks and JSX)

## Creating layouts

To create layouts in JSX, just add `.jsx` or `.tsx` files to the `_includes`
directory. Note that we need to use the variable `children` to render the page
content instead of `content`. The difference is that `content` is a string and
cannot be easily used in JSX because it's escaped, and `children` is the JSX
object un-rendered.

```jsx
export default ({ title, children }) => (
  <html>
    <head>
      <title>{title}</title>
    </head>
    <body>
      {children}
    </body>
  </html>
);
```
