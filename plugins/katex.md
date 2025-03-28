---
title: KaTeX
description: TeX math rendering in HTML
mod: plugins/katex.ts
tags:
  - html
---

## Description

This plugin uses the [KaTeX](https://katex.org/) library to render the math
typesetting of your HTML documents. You only need to add the `language-math`
extension to any math content that you want to render. In markdown pages, it can
be done in code blocks with the `math` language:

<pre><code class="language-md hljs"># This is a markdown document

```math
c = \pm\sqrt{a^2 + b^2}
```
</pre></code>

Or adding the `language-math` directly to the HTML element containing the code:

```html
<p class="language-math">
  c = \pm\sqrt{a^2 + b^2}
</p>
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import katex from "lume/plugins/katex.ts";

const site = lume();

site.use(katex(/* Options */));

export default site;
```

## Apply styles

The plugin use the global configuration of
[`cssFile`](../docs/configuration/config-file.md#cssfile) and
[`fontsFolder`](../docs/configuration/config-file.md#fontsfolder) to download
the required CSS code and fonts (`/style.css` and `/fonts` by default). Make
sure to link the CSS file and use the HTML5 doctype.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/style.css">
```
