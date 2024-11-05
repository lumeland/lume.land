---
title: OG images
description: Plugin to create Open Graph images automatically
mod: plugins/og_images.ts
tags:
  - images
---

## Description

This plugin creates automatically images with the content of your pages. It
works great combined with [metas](./metas.md) plugin to create Open Graph meta
tags.

The library [Satori](https://github.com/vercel/satori) is used to generate the
SVG images (that are then converted to PNG with
[Sharp](https://sharp.pixelplumbing.com/)). The URL of the image generated is
saved in the `metas.image` variable, so it's detected by `metas` plugin (that
must be added after `og_images`).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import ogImages from "lume/plugins/og_images.ts";
import metas from "lume/plugins/metas.ts";

const site = lume();

site.use(ogImages());
site.use(metas()); /* Optional, to generate <meta> tags */

export default site;
```

## Usage

To generate the images, you need to specify the layout used to render the HTML
content with the variable `openGraphLayout`. For example:

```yml
---
openGraphLayout: /layouts/og_images.jsx
---
```

As `layout` variable is used to render a page and generate the HTML, the
`openGraphLayout` is used to render the page and generate the Open Graph image.
You can use `_data` files to set the same layout to all pages or different
layouts per directory.

### Satori library

**Satori** is the library used to generate the images and
[only accepts JSX elements](https://github.com/vercel/satori?tab=readme-ov-file#jsx)
(or React-elements-like objects). For example:

```jsx
/** @jsxImportSource npm:react@18.2.0 */

export default function ({ title, description }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      <svg
        width="75"
        viewBox="0 0 75 65"
        fill="#000"
        style={{ margin: "0 75px" }}
      >
        <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
      </svg>
      <div style={{ marginTop: 40 }}>{title}</div>
      <div>{description}</div>
    </div>
  );
}
```

As you can see, the layout is similar to a standard JSX layout in Lume. The page
data is passed in the first argument so you can use the title, description or
any other variable to generate the image.

See the documentation for a
[complete list of all CSS properties and HTML elements supported](https://github.com/vercel/satori?tab=readme-ov-file#documentation)
by Satori.

You can [use the Playground](https://og-playground.vercel.app/) for testing and
experimentation.

### Fonts and configuration

By default, the plugin loads the [Inter font](https://rsms.me/inter/). If you
want to use custom fonts, you have to configure Satori to load them. For
example:

```js
import { read } from "lume/core/utils/read.ts";

/** Example with the default values */
site.use(openGraphImages({
  satori: {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "inter",
        weight: 400,
        style: "normal",
        data: await read(
          "https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/src/inter/Inter-Regular.woff",
          true,
        ),
      },
      {
        name: "inter",
        weight: 700,
        style: "normal",
        data: await read(
          "https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/src/inter/Inter-SemiBold.woff",
          true,
        ),
      },
    ],
  },
}));
```

### Output

The output images have the same path as the HTML pages but with the `.png`
extension instead of `.html`. For example:

- The page `/example.html` generates the image `/example.png`.
- The page `/example/` generates the image `/example/index.png`.

Image URLs are saved in the `metas.image` variable, ready to use with `metas`
plugin.
