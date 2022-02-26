---
title: Global data
description: Adding global data to be used anywhere in your site
order: 4
---

You can assign data to your site tht will be available in your pages, layouts
and components. This is useful to define variables and functions from your
config file. For example:

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

```js { title="Javascript" }
export default function ({ myNumber, randomNumber }) {
  return `
  <p>My number: ${ myNumber }</p>
  <p>Random number: ${ randomNumber() }</p>`;
}
```

</lume-code>
