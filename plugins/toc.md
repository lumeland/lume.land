---
title: TOC
description: Generate automatically the table of contents
mod: plugins/toc.ts
category: navigation
---

## Description

Plugin to generate the table of contents. It's agnostic of the template engine because it uses the DOM API to generate the toc using the `toc` attribute:

```html
<nav toc="content">
  <!-- toc will be generated here -->
</nav>

<div id="content">
  <h2>First title</h2>
  <h3>Subtitle</h3>
  <h2>Other title</h2>
</div>
```

The `toc` attribute is defined in the element that will contain the table of contents. The value of this attribute must be the id of the element with the text. The plugin automatically generates the following HTML code:

```html
<nav toc="content">
  <ol>
    <li>
      <a href="#first-title">First title</a>
      <ol>
        <li><a href="#subtitle">Subtitle</a></li>
      </ol>
    </li>
    <li><a href="#other-title">Other title</a></li>
  </ol>
</nav>

<div id="content">
  <h2 tabindex="-1" id="first-title"><a href="#first-title">First title</a></h2>
  <h3 tabindex="-1" id="subtitle"><a href="#subtitle">Subtitle</a></h3>
  <h2 tabindex="-1" id="other-title"><a href="#other-title">Other title</a></h2>
</div>
```

Note that the plugin not only generates the table of contents, but also the ids of the headers (if needed) and the anchors.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import toc from "lume/plugins/toc.ts";

const site = lume();

site.use(toc(/* Options */));

export default site;
```

## Anchor

By default, the plugin generates the anchor link in all headers. For example, the header:

```html
<h2>First title</h2>
```

is converted to 

```html
<h2 tabindex="-1" id="first-title"><a href="#first-title">First title</a></h2>
```

Use the `anchor` option to pass function to generate the anchor in a different way. The plugin has two predefined functions: `headerLink` (the default function) and `linkInsideHeader`. To use it:

```js
import lume from "lume/mod.ts";
import toc, { linkInsideHeader } from "lume/plugins/toc.ts";

const site = lume();

site.use(toc({
  anchor: linkInsideHeader({
    content: "§"
  }),
}));

export default site;
```

This option generates the following anchor:

```html
<h2 tabindex="-1" id="first-title"><a href="#first-title">§</a> First title</h2>
```

To disable the anchor generation, just set the option to `false`:

```js
site.use(toc({
  anchor: false,
}));
```

Now, only the id is generated (if needed) but not the anchor:

```html
<h2 tabindex="-1" id="first-title">First title</h2>
```
