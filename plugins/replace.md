---
title: Replace
description: Create placeholders to replace with final values
mod: plugins/replace.ts
tags:
  - utils
---

## Description

This simple plugin allows to perform simple text replacements in the site,
something especially useful for documentation sites. Internally it uses
[`String.prototype.replaceAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
for the replacements.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import replace from "lume/plugins/replace.ts";

const site = lume();

site.use(replace({
  replacements: {
    "{EXAMPLE}": "final value",
  },
}));

export default site;
```

## Example:

Let's say you want to display always the last version of your library in a
website:

```md
Welcome to MyLibrary 2.3.0. To getting started, run the following command:

deno install --global https://deno.land/x/my_library@2.3.0/mod.ts
```

Instead of harcoding the version number everywhere in your site (and remember to
update it after a new version), this plugin allows to use a placeholder:

```md
Welcome to MyLibrary $VERSION. To getting started, run the following command:

deno install --global https://deno.land/x/my_library@$VERSION/mod.ts
```

Now, configure the replacements in the plugin options:

```js
site.use(replace({
  replacements: {
    "$VERSION": "2.3.0",
  },
}));
```

You can use this plugin for any constant value that you want to use globally,
like a query parameter for caching CSS and JS files, the hash of the latest
commit, the year in the copyright, etc.

You can use also a function as the replaced value:

```js
site.use(replace({
  replacements: {
    "Lume": (text: string) => text.toUpperCase(),
  },
}));
```

## Hooks

The plugin expose the `replace` hook to edit or add additional replacements
dynamically. For example:

```js
site.process([".css"], (files) => {
  const firstFile = files[0];

  // Replace the value dynamically
  site.hook.replace({
    "CSS_FILE": firstFile.data.url,
  });
});

// Use the plugin with the default value
site.use(replace({
  "CSS_FILE": "style.css",
}));
```
