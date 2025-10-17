---
title: SEO
description: Automatically check SEO basic issues
# mod: plugins/seo.ts
tags:
  - optimization
---

## Description

Plugin to check the SEO basics (titles, descriptions, alt text in images, etc)
and other not very common checks like common words percentage. It creates a new
tab in the [debug bar](../docs/core/debugbar.md) with the detected issues.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import seo from "lume/plugins/seo.ts";

const site = lume();

site.use(seo(/* Options */));

export default site;
```

## Output

The report is visible in the debug bar but you can use the `output` option to
export the list of broken links to a JSON file:

```js
site.use(seo({
  output: "_seo-issues.json",
}));
```

Or use a function for a custom output:

```js
site.use(seo({
  output: (reports) => {
    if (!reports.size) {
      console.log("No SEO errors found");
    } else {
      console.log(`${reports.size} pages found with SEO errors`);
    }
  },
}));
```

The `reports` argument is of type `Map<string, ErrorMessage[]>`: the map keys
are the pages with SEO errors, and `ErrorMessage[]` contains the errors found in
the page.
