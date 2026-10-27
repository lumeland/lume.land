---
title: Validate HTML
description: Automatically check the HTML code from your pages
category: standard
oldUrl: /plugins/validate_html/
---

## Description

This plugin uses [HTML-validate](https://html-validate.org/) package to check
the HTML code and create a new tab in the
[debug bar](../docs/core/12.debugbar.md) with the detected issues.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import validateHtml from "@lumeland/plugin-validate-html";

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
