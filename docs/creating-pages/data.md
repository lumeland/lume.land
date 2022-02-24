---
title: Extra data
description: Adding special data in the config
order: 7
---

You can assign extra data to your site available everywhere. This allows to have
functions that you can execute everywhere, for example for searching or
pagination results.

In fact, there are two helpers available by default:
[`search`](../core/searching.md) and [`paginate`](../core/pagination.md)
precisely for that purpose.

If you need to add more extra data, use the `_config.js` file:

```js
site.data("randomNumber", function () {
  return Math.random();
});
```

Now, this function is available in your layouts:

```html
<p>Random number: {{ randomNumber() }}</p>
```
