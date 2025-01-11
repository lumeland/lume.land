---
title: Plain text
description: Provide a helper to remove HTML and Markdown syntax in any text
mod: plugins/plaintext.ts
tags:
  - utils
---

## Description

Use the `plaintext` plugin to register the `plaintext` filter to remove HTML and
Markdown syntax from any string. It uses
[remove-markdown](https://github.com/zuchka/remove-markdown) NPM package under
the hood.

```html
{{ "Hello **world**" |> plaintext }}

<!-- Hello world -->
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import plaintext from "lume/plugins/plaintext.ts";

const site = lume();

site.use(plaintext());

export default site;
```
