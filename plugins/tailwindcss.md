---
title: Tailwind CSS
description: Use Tailwind CSS to create the CSS styles.
mod: plugins/tailwindcss.ts
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

site.use(tailwindcss(/* Options */));
site.use(postcss());

export default site;
```

Note that Tailwind requires the `@tailwind` directives somewhere in your CSS
code to output the generated code. For example, you can create the `styles.css`
file with the following code:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Reference it in your main html file (index.html, main.vto, etc.) :

```vento
// index.html | main.vto | else
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="/styles.css">
  </head>
...
```

See
[more info about Tailwind's functions and directives in its documentation page](https://tailwindcss.com/docs/functions-and-directives)

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

### Mix with Markdown: @tailwindcss/typography plugin

[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) plugin
is required to apply TailwindCSS styling to markdown files.

```typescript
import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import typography from "npm:@tailwindcss/typography";

const site = lume();

site.use(tailwindcss({
  options: {
    plugins: [typography],
  },
}));
```

In your html, you should use the `prose` class.

```vento
<article class="prose">
  {{ content }}
</article>
```
