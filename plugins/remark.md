---
title: Remark
description: Use Remark to render the markdown content.
category: template
---

## Description

This plugin use [Remark](https://remark.js.org/) to render the markdown files,
replacing the default `markdown-it` library. It allows to use Remark and Rehype
plugins. By default it uses the _GitHub-flavored markdown_.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import remark from "@lumeland/plugin-remark";

const site = lume();

site.use(remark());

export default site;
```

## Plugins

Use the `remarkPlugins` and `rehypePlugins` to configure additional plugins:

```js
import lume from "@lumeland/lume";
import remark from "@lumeland/plugin-remark";
import a11yEmoji from "@fec/remark-a11y-emoji";
import rehypeRemoveComments from "rehype-remove-comments";

const site = lume();

site.use(remark({
  remarkPlugins: [a11yEmoji],
  rehypePlugins: [[rehypeRemoveComments, { removeConditional: true }]],
}));

export default site;
```

## `mdRemark` helper

The plugin also register the `mdRemark` filter, useful to render markdown:

```vento
{{ "Hello **world**" |> mdRemark }}
```
