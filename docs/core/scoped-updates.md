---
title: Scoped updates
description: How to optimize the update process in watch mode.
order: 11
---

In Lume, any change in the watch mode (with `lume --serve` or `lume --watch`),
**rebuilds the entire site**. This happens because it's almost impossible to
know in advance which pages will be affected by a change in any file. For
example:

- A change in a CSS file can affect other CSS files that `@import` it (if you
  use [postcss plugin](../../plugins/postcss.md)).
- If you also use the [inline plugin](../../plugins/inline.md), to insert the
  CSS code in the HTML, this change will affect all HTML pages.

Lume is conservative about the updating process to make sure that any change in
any file will be correctly applied to all pages. This is why the entire site is
rebuilt after any change.

In large sites or sites with expensive processors like bundlers, this can
increase the duration of the update process. Lume offers a way to customize this
behavior using **Scoped Updates**. It's a way to define different "scopes"
(collections of independent files whose changes won't affect other pages).

For example, let's say that you're building a website that has some JavaScript
and CSS files, and these files are totally independent, meaning that:

- Changes in any CSS file only affects other CSS files.
- Changes in any JS/TS file only affects other JS/TS files.
- Changes in any other file (Nunjucks, Yaml, Markdown, etc) won't affect CSS, JS
  or TS files.

In this case, you can create two scopes, one for CSS files and another for JS/TS
files. To do that, just add this code to your `_config.js` file:

```js
site.scopedUpdates(
  (path) => path.endsWith(".css"), //Select all *.css files
  (path) => /\.(js|ts)$/.test(path), //Select all *.js and *.ts files
);
```

Every function passed to this function creates a new scope. Now, if a `.css`
file changes, only the `.css` files are rebuilt, but not any other file. If a
`.js` or `.ts` file is updated, only those files are built. And if any other
file changes, all files are rebuilt except `.css`, `.ts` and `.js` files.
