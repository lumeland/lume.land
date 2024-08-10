---
title: Working with assets
description: How Lume handles assets like CSS, JavaScript, or image files.
order: 7
---

In previous steps, we have learned how to create HTML pages with Lume, which
consists of creating files (in formats like Markdown, Vento, JavaScript, YAML,
etc.) and using layouts to add the remaining HTML code.

However, sites have more files than just HTML pages. We need CSS for styling,
JavaScript for interaction, images, videos, etc. These files are known as
"assets" and Lume has two ways to handle them. Let's start with the simplest
one: copy them.

## Copying assets

Let's say we want to apply some styles to our site. Create the file
`/styles.css` with some CSS code:

<lume-code>

```css{title="styles.css"}
body {
  font-family: system-ui;
  max-width: 40em;
  margin: 2em auto;
}
```

</lume-code>

Now we need to import this CSS file in all pages. Fortunately, we are using the
same layout on all pages so we only need to edit the layout file to include a
`<link rel="stylesheet">` element pointing to our `styles.css` file:

<lume-code>

```html {title="_includes/layout.vto"}
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>{{ title }}</title>
 <link rel="stylesheet" href="/styles.css">
</head>
<body>
 {{ content }}
</body>
</html>
```

</lume-code>

Now, all pages have the `<link>` element but the styles are not applied. If you
inspect the `_site` folder, you won't see the styles.css file there, and the URL
`http://localhost:3000/styles.css` returns a 404 error.

This is because Lume, by default, only generates HTML pages from files with
known extensions like `.md`, `.vto`, etc. Other files are ignored. So we need to
configure Lume to include also the extra files needed.

Lume configuration is defined in the `_config.ts` file. When a new Lume project
is created, this file is very basic and the only thing that it does is import
Lume, create a site instance, and export that instance:

<lume-code>

```js {title="_config.ts"}
import lume from "lume/mod.ts";

const site = lume();

export default site;
```

</lume-code>

The `site` variable is the Lume instance responsible for building our site. It
contains several functions to configure how our site is built, and one of these
functions is `copy()` which allows us to define the files we want to copy.

<lume-code>

```js {title="_config.ts"}
import lume from "lume/mod.ts";

const site = lume();

site.copy("/styles.css");

export default site;
```

</lume-code>

After editing the `_config.ts` we need to stop the server (with `Ctrl + C`) and
start it again `deno task serve` because Lume cannot reload it dynamically (this
is something that will fixed soon). Now you should see the `styles.css` file in
the `_dest` folder and the styles are applied to all HTML pages.

> [!tip]
>
> The `copy()` function is very powerful, it allows you to copy files by name or
> extension, copy folders, change the output name, etc. See the
> [`copy` documentation](../configuration/copy-static-files.md) to learn more.
