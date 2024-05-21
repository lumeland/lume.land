---
title: JSX Preact
description: Create pages and layouts with JSX (Preact).
mod: plugins/jsx_preact.ts
tags:
  - template_engine
---

## Description

This plugin works exactly like [JSX](./jsx.md) but using
[Preact](https://preactjs.com/) (a 3kb React alternative with the same API but
faster and lighter) to render the JSX.

Note that this plugin only provides JSX support to generate the pages at
building time. This means that client-side properties like `onClick` won't work.
If you want to use React for creating code for the browser (like SPAs), use the
[ESbuild](./esbuild.md) plugin.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";

const site = lume();

site.use(jsx(/* Options */));

export default site;
```

### Configuration

You might want to add the following `compilerOptions` to `deno.json` in order to
configure the JSX transform:

<lume-code>

```json {title="deno.json"}
{
  // ...
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "npm:preact"
  }
}
```

</lume-code>

> [!tip]
>
> [Go to Using TypeScript](/docs/configuration/using-typescript/) for more info
> about using TypeScript with Lume.

## Creating pages

To create a page with this format, just add a file with `.jsx` or `.tsx`
extension to your site. This format works exactly the same as
[JavaScript/TypeScript files](./modules.md), but with the addition of the
ability to export JSX code in the default export:

```tsx
export const title = "Welcome to my page";
export const layout = "layouts/main.vto";

export default (data: Lume.Data, helpers: Lume.Helpers) => (
  <>
    <h1>{data.title}</h1>
    <p>This is my first post using lume. I hope you like it!</p>
  </>
);
```

Note that this page uses the `layouts/main.vto` layout to wrap the content. (You
can mix different template languages like Nunjucks and JSX.)

## Creating layouts

To create layouts in JSX, just add `.jsx` or `.tsx` files to the `_includes`
directory. Note that we need to use the variable `children` to render the page
content instead of `content`. The difference is that `content` is a string and
cannot be easily used in JSX because it's escaped, and `children` is the JSX
object un-rendered.

```tsx
export default ({ title, children }: Lume.Data, helpers: Lume.Helpers) => (
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

> [!tip]
>
> Lume will automatically add the missing `<!DOCTYPE html>` to the generated
> `.html` pages.
