---
title: Validate HTML
description: Automatically check the HTML code from your pages
# mod: plugins/validate_html.ts
tags:
  - optimization
---

## Description

This plugin uses [HTML-validate](https://html-validate.org/) package to check
the HTML code and create a new tab in the [debug bar](../docs/core/debugbar.md)
with the detected issues.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import validateHtml from "lume/plugins/validate_html.ts";

const site = lume();

site.use(validateHtml(/* Options */));

export default site;
```

## Output

The report is visible in the debug bar but you can use the `output` option to
export the list of broken links to a JSON file:

```js
site.use(validateHtml({
  output: "_html-issues.json",
}));
```

Or use a function for a custom output:

```js
site.use(validateHtml({
  output: (reports) => {
    if (reports.valid) {
      console.log("No HTML errors found");
    } else {
      console.log(`${reports.errorCount} HTML error(s) found.`);
    }
  },
}));
```
