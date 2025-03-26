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

Import this plugin in your `_config.ts` file to use it:.

```js
import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";

const site = lume();

site.use(tailwindcss(/* Options */));
site.add("style.css"); //Add the entry point

export default site;
```

Note that Tailwind requires the `@import "tailwindcss"` code somewhere in your
CSS code to place the generated code. For example, you can create the
`style.css` file with the following code:

```css
@import "tailwindcss"
```

Reference it in your main html file (index.html, main.vto, etc.) :

```vento
// index.html | main.vto | else
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="/style.css">
  </head>
...
```

See
[more info about Tailwind's functions and directives in its documentation page](https://tailwindcss.com/docs/functions-and-directives)

## Import plugins

Use the `@plugin` at-rule in the CSS to import plugins. For example to use
[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin):

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

In your html, you can use the `prose` class.

```vento
<article class="prose">
  {{ content }}
</article>
```
