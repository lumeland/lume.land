---
title: Partytown
description: Use the Partytown to run third-party scripts from a web worker
category: dev
---

## Description

[Partytown](https://partytown.qwik.dev/) is a JavaScript library to run third
party scripts into a web worker. The goal is dedicating the main thread to your
code, and move other resource-intesive third party scripts, like analytics or
tracking services to a different thread, making the website faster and more
secure.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import partytown from "@lumeland/plugin-partytown";

const site = lume();

site.use(partytown(/* Options */));

export default site;
```

Add the `type="text/partytown"` attribute to all scripts that you want to run
from the web worker:

```html
<script type="text/partytown">
...
</script>
```
