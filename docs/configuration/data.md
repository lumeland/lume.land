---
title: Global data
description: Adding global data to be used anywhere in your site
order: 4
---

You can set global variables in your site, accessible by all pages, layouts and
components. For example:

```js
// Set a variable
site.data("myNumber", 23);

// Set a function
site.data("randomNumber", function () {
  return Math.random();
});
```

Now, these variables are available in your pages, layouts and components:

<lume-code>

```vento { title="Vento" }
<p>My number: {{ myNumber }}</p>
<p>Random number: {{ randomNumber() }}</p>
```

```js { title="JavaScript" }
export default function ({ myNumber, randomNumber }) {
  return `
  <p>My number: ${myNumber}</p>
  <p>Random number: ${randomNumber()}</p>`;
}
```

</lume-code>

> [!note]
>
> Page data has priority over global data. If a page has a variable with the
> same name as a global variable, the page variable will be used.

## Context data

Use the third argument to assign a data value to a specific path. For example:

```js
// Set the layout value to the directory /pages
site.data("layout", "pages.vto", "/pages");
```

This will assign the data to the `/pages` directory so only the files in this
directory will have access to this value. See
[shared data](../creating-pages/shared-data.md) for more info.

It's also possible to assign a data value to a specific file:

```js
// Set the layout value to a specific file
site.data("layout", "pages.vto", "/pages/my-custom-page.vto");
```
