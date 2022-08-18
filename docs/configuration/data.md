---
title: Global data
description: Adding global data to be used anywhere in your site
order: 4
---

You can set global variables to your site, accessible by all pages, layouts and
components. For example:

```js
// Set a variable
site.data("myNumber", 23);

// Set a function
site.data("randomNumber", function () {
  return Math.random();
});
```

Now, this data is available in your pages, layouts and components:

<lume-code>

```html { title="Nunjucks" }
<p>My number: {{ myNumber }}</p>
<p>Random number: {{ randomNumber() }}</p>
```

```js { title="JavaScript" }
export default function ({ myNumber, randomNumber }) {
  return `
  <p>My number: ${ myNumber }</p>
  <p>Random number: ${ randomNumber() }</p>`;
}
```

</lume-code>

Note that page data have priority over global data. If a page has a variable
with the same name as a global variable, the page variable will be used. {.tip}
