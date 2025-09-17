---
title: JSX
description: Create pages and layouts with JSX.
mod: plugins/jsx.ts
tags:
  - template_engine
---

## Description

[JSX](https://facebook.github.io/jsx/) (or the equivalent TSX for TypeScript) is
a template language to create and render HTML code, very popular in some
frameworks. This plugin adds support for `JSX / TSX` to create pages and
layouts, using [`SSX`](https://github.com/oscarotero/ssx/) for rendering.

Note that this plugin only provides JSX support to generate the pages at
building time. This means that client-side properties like `onClick` won't work.
If you want to use a JSX library like React, Preact, etc for creating code for
the browser (like SPAs), use the [ESbuild](./esbuild.md) plugin.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";

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
  "imports": {
    //...
    "lume/jsx-runtime": "https://deno.land/x/ssx@v0.1.10/jsx-runtime.ts"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "lume"
    //...
  }
}
```

</lume-code>

> [!note]
>
> [Go to Using TypeScript](/docs/configuration/using-typescript/) for more info
> about using TypeScript with Lume.

## Creating pages

To create a page with this format, just add a file with `.page.jsx` or
`.page.tsx` extension to your site. The `.page` subextension is required to
differentiate JSX/TSX files that generate HTML pages from other files to be
executed in the browser. This format works exactly the same as
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

Note that this page uses the `layouts/main.vto` Vento layout to wrap the
content. Apart from setting the page frontmatter via variables as above, you can use the flexible `_data.*` file or directory (see [Shared data](../docs/creating-pages/shared-data.md)) to that end. Also, you can mix different template languages like Nunjucks and JSX.

## Creating layouts

To create layouts in JSX, just add `.jsx` or `.tsx` files to the `_includes`
directory. Note that we need to use the variable `children` to render the page
content instead of `content`. The difference is that `content` is a string and
cannot be easily used in JSX because it's escaped, and `children` is the JSX
object un-rendered.

```tsx
export default ({ title, children }: Lume.Data, helpers: Lume.Helpers) => (
  <>
    {{ __html: "<!DOCTYPE html>" }}
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  </>
);
```

## Components

You can create [Lume components](../docs/core/components.md) in JSX creating
files in the `_components` folder. For example:

<lume-code>

```jsx{title="_components/button.tsx"}
export default function ({ children }) {
  return (
    <button class="my-button">
      {children}
    </button>
  );
}
```

</lume-code>

To render the component in your templates use the `comp` variable:

<lume-code>

```jsx{title="_includes/layout.tsx"}
export default function ({ comp }) {
  return (<comp.Button>Click me!</comp.Button>);
}
```

</lume-code>

> [!important]
>
> Importing a component with `import Button from "./_components/button.tsx"`
> doesn't work for live-reloading due a limitation of Deno that
> [cannot update any imported module](https://github.com/denoland/deno/issues/8327)
> without restarting the entire process. So it's highly recomendable to use the
> `comp` variable to consume components and mitigate this limitation.
