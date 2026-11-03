---
title: Pagefind
description: A static search engine in your site
category: navigation
---

## Description

This plugin uses the [Pagefind](https://pagefind.app/) library to create a fully
static search engine in your site without requiring any hosting infrastructure.
The process is divided in two steps:

- **Indexing**: It's the process to scan all HTML page and build the search
  index.
- **UI rendering**: A UI component that supports searching, filtering and
  metadata out of the box.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import pagefind from "@lumeland/plugin-pagefind";

const site = lume();

site.use(pagefind(/* Options */));

export default site;
```

## UI Component

The plugin automatically outputs the CSS and JavaScript code to use the web components in the `/style.css` and `/script.js` files (or the values configured globally in [`cssFile`](../docs/configuration/config-file.md#cssfile) and [`jsFile`](../docs/configuration/config-file.md#jsfile)). Make sure to import these files in your layout.

```html
<h1>Welcome to my site</h1>

<pagefind-modal-trigger></pagefind-modal-trigger>
<pagefind-modal></pagefind-modal>
```

> [!note]
>
> See the [Pagefind UI docs](https://pagefind.app/docs/search-ui/) for more
> info.

Use the `componentUI` configuration key to change the css and js files:

```js
import lume from "@lumeland/lume";
import pagefind from "@lumeland/plugin-pagefind";

const site = lume();

site.use(pagefind({
  componentUI: {
    cssFile: "search-style.css",
    jsFile: "search-scripts.js",
  },
}));

export default site;
```

Set to `false` to don't output the code. Useful if you want to implement a different UI:

```ts
site.use(pagefind({
  componentUI: false
}))
```

## Indexing

The `indexing` key allows to customize the indexing process. The default values:

```js
import lume from "@lumeland/lume";
import pagefind from "@lumeland/plugin-pagefind";

const site = lume();

site.use(pagefind({
  indexing: {
    rootSelector: "html",
    verbose: false,
  },
}));

export default site;
```

We can set explicit content indexing by adding the
[`data-pagefind-body`](https://pagefind.app/docs/indexing/#removing-pages-from-pagefinds-index)
attribute. If this attribute is present in an HTML element, only content inside
that elemement is indexed. Anything else without this attribute will not be
indexed. As such, the best way to remove pages is by adding `data-pagefind-body`
to the wrapper element of the content you would like to index.

Alternatively, you can selectively ignore content by setting the
[`data-pagefind-ignore`](https://pagefind.app/docs/indexing/#removing-individual-elements-from-the-index)
attribute on a HTML element. And `data-pagefind-ignore="all"` to also ignore its
children.

> [!note]
>
> See the [Pagefind indexing docs](https://pagefind.app/docs/indexing/) for more
> info.
