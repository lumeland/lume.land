---
title: Git info
description: Extract the current branch, commit hash and tag from Git.
category: extract
oldUrl: /plugins/git_info/
---

## Description

This plugin extracts some useful info from Git and saves it in the `gitInfo`
variable. This variable is an object with the following properties:

- `branch`: The name of the current branch
- `hash`: The hash of the latest commit
- `tag`: If the latest commit is tagged, this variable contains the tag name;
  otherwise it's `undefined`.

This info can be used in your templates for multiple purposes. For example, to
show the latest version:

```vto
Version {{ gitInfo.tag || gitInfo.hash }}
```

Or to prevent caching issues:

```vto
<link rel="stylesheet" href="/styles.css?v={{ gitInfo.hash }}">
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import gitInfo from "@lumeland/plugin-git-info";

const site = lume();

site.use(gitInfo());

export default site;
```
