---
title: Reading info
description: Provide some information about the page content
mod: plugins/reading_info.ts
tags:
  - utils
---

## Description

This plugin creates the `readInfo` variable in your pages with some interesting
info about the page content, like the time to read or the number of pages.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import readInfo from "lume/plugins/read_info.ts";

const site = lume();

site.use(readInfo());

export default site;
```

## Usage

It uses the
[`Int.Segmenter`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)
standard function to count the words, using the page variable `lang` to detect
the language. The data is stored in the variable `readingInfo`, so you can use
it in your templates in this way:

```html
<p>{{ readingInfo.words }} words</p>
<p>{{ readingInfo.minutes }} min read</p>
```
