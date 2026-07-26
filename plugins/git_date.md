---
title: Git date
description: Extract the last modification time of all pages from the Git history.
mod: plugins/git_date.ts
tags: 
  - utils
---

## Description

Plugin to extract the last modification time of all pages from the Git history and save it in the `date` variable. This process
is very fast because it only runs a single git command to return the modified date
for all files.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import gitDate from "lume/plugins/git_date.ts";

const site = lume();

site.use(gitDate());

export default site;
```

By default, it modifies the `date` key, but you can specify a different
variable:

```ts
site.use(gitDate({
  varName: "lastModified",
}));
```
