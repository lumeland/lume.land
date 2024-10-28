---
title: Remark
description: Use Remark to render the markdown content.
mod: plugins/remark.ts
tags:
  - template_engine
---

## Description

This plugin use [Remark](https://remark.js.org/) to render the markdown files,
replacing the default `markdown-it` library. It allows to use Remark and Rehype
plugins. By default it uses the _GitHub-flavored markdown_.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import remark from "lume/plugins/remark.ts";

const site = lume();

site.use(remark());

export default site;
```

## Plugins

Use the `remarkPlugins` and `rehypePlugins` to configure additional plugins:

```js
import lume from "lume/mod.ts";
import remark from "lume/plugins/remark.ts";
import a11yEmoji from "npm:@fec/remark-a11y-emoji";
import rehypeRemoveComments from "npm:rehype-remove-comments@5";

const site = lume();

site.use(remark({
  remarkPlugins: [a11yEmoji],
  rehypePlugins: [rehypeRemoveComments],
}));

export default site;
```
