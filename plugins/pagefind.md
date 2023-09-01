---
title: Pagefind
description: A static search engine in your site
mod: plugins/pagefind.ts
tags:
  - nav
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
import lume from "lume/mod.ts";
import pagefind from "lume/plugins/pagefind.ts";

const site = lume();

site.use(pagefind(/* Options */));

export default site;
```

## The binary file

The first time, the plugin downloads the Pagefind's binary file to the `_bin`
directory, taking into account your platform and operating system. Make sure to
add this folder to the `.gitignore` file.

There are some options in the plugin to configure the binary file under the key
`binary`. The default values:

```js
import lume from "lume/mod.ts";
import pagefind from "lume/plugins/pagefind.ts";

const site = lume();

site.use(pagefind({
  binary: {
    path: "./_bin/pagefind", // Binary location
    extended: false, // Set true for Chinese and Japanese support.
    version: "v0.8.1", // Pagefind version
  },
}));

export default site;
```

The default Pagefind version is updated every new Lume version, it's recommended
to don't configure a fixed version {.tip}

## UI Component

To add the search component in your site, just create a element with the
`search` id. The plugin automatically generate the HTML code to import the
JavaScript and CSS styles in any page containing this element.

```html
<h1>Welcome to my site</h1>

<!-- Insert the search component here: -->
<div id="search"></div>
```

### UI configuration

The plugin has the `ui` key with some configuration options. The default values:

```js
import lume from "lume/mod.ts";
import pagefind from "lume/plugins/pagefind.ts";

const site = lume();

site.use(pagefind({
  ui: {
    containerId: "search",
    showImages: false,
    showEmptyFilters: true,
    resetStyles: true,
  },
}));

export default site;
```

### Customising the styles

The generic UI component comes with some CSS custom properties that you can edit
in your CSS files:

```css
:root {
  --pagefind-ui-scale: 1;
  --pagefind-ui-primary: #034ad8;
  --pagefind-ui-text: #393939;
  --pagefind-ui-background: #ffffff;
  --pagefind-ui-border: #eeeeee;
  --pagefind-ui-tag: #eeeeee;
  --pagefind-ui-border-width: 2px;
  --pagefind-ui-border-radius: 8px;
  --pagefind-ui-image-border-radius: 8px;
  --pagefind-ui-image-box-ratio: 3 / 2;
  --pagefind-ui-font: sans-serif;
}
```

See the [Pagefind UI docs](https://pagefind.app/docs/ui/) for more customization
options {.tip}

### Disable the UI component

If you want to use a custom search component, you can disable the automatic
insertion of the generic UI component in the plugin configuration:

```js
import lume from "lume/mod.ts";
import pagefind from "lume/plugins/pagefind.ts";

const site = lume();

site.use(pagefind({
  ui: false, // Don't insert the UI component
}));

export default site;
```

## Indexing

The `indexing` key allows to customize the indexing process. The default values:

```js
import lume from "lume/mod.ts";
import pagefind from "lume/plugins/pagefind.ts";

const site = lume();

site.use(pagefind({
  indexing: {
    bundleDirectory: "pagefind",
    rootSelector: "html",
    glob: "**/*.html",
    forceLanguage: false,
    verbose: false,
  },
}));

export default site;
```

See the [Pagefind indexing docs](https://pagefind.app/docs/indexing/) for more
info. {.tip}
