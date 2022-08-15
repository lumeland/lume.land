---
title: Plugins
description: How to import and use Lume plugins
order: 5
---

Plugins add extra functionality or support for new formats. There are some basic
plugins installed by default (like support for `markdown`, `yaml` or `json`
formats), but there are other plugins that you can enable. For example, to add
the `svgo` plugin (that optimizes SVG files using the SVGO library), you have to
import the plugin and enable it with `use()` in the config file:

```js
import lume from "lume/mod.ts";
import svgo from "lume/plugins/svgo.ts";

const site = lume();

site.use(svgo());

export default site;
```

[Go to Plugins](/plugins/) to explore the available plugins and read the
specific documentation. {.tip}
