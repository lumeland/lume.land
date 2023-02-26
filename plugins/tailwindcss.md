---
title: Tailwind CSS
description: Use Tailwind CSS to create the CSS styles.
docs: plugins/tailwindcss.ts/~/Options
tags:
  - styles
---

## Description

This plugin allows using [Tailwind CSS](https://tailwindcss.com/) to generate
the styles of your site.

It analyzes the HTML code of the pages, searching for the Tailwind classes and
generating the CSS code needed.

## Installation

Tailwind uses Postcss under the hood, so you need to import both plugins in your
`_config.ts` and use them in this order: Tailwind first, Postcss later. The
reason is Tailwind need to extract the classes from the HTML pages before
Postcss processes the CSS files.

```js
import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume();

site.use(tailwindcss());
site.use(postcss());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/tailwindcss.ts/~/Options).

Note that Tailwind requires the `@tailwind` directives somewhere in your CSS code to output the generated code. For example, you can create the `styles.css` file with the following code:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

See [more info about Tailwind's functions and directives in its documentation page](https://tailwindcss.com/docs/functions-and-directives)

## Configuration

This plugin accepts a configuration object with the available options:

- `options`: Configuration object for Tailwind where you can define themes,
  plugins, etc. See the
  [Tailwind docs for more info](https://tailwindcss.com/docs/configuration)
- `extensions`: The file extensions that Tailwind will be analyze to extract the
  css classes. By default is `[".html"]` but you can JavaScript or JSX to
  extract class names from your client-side components.

```ts
site.use(tailwindcss({
  // Extract the classes from HTML and JSX files
  extensions: [".html", ".jsx"],

  // Your Tailwind options, like the theme colors and fonts
  options: {
    theme: {
      colors: {
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
}));
```
