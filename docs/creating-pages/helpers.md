---
title: Helpers
description: Adding filters in the config file
order: 6
---

Helpers are functions accessible from pages and layouts that help to render the
content. More info about how to create helpers in the
[Configuration page](/getting-started/config-file/#helpers).

There are different types of helpers, the most common type is a **filter**.

## Filters

Filters are functions that can be applied to variables to transform content.
Nunjucks template engine
[has some builtin filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters),
for example:

```html
<h1>{{ 'Welcome' | upper }}</h1>
```

Output:

```html
<h1>WELCOME</h1>
```

Lume allows to create your own filters to be used by all template engines. New
filters must be registered in the `_config.js` file:

```js
// Filter to prepend a 👍 to any text
site.filter("thumbsUp", (value) => "👍 " + value);
```

Now this filter is available in your layouts:

```html
<h1>{{ 'Welcome' | upper | thumbsUp }}</h1>
```

Output:

```html
<h1>👍 WELCOME</h1>
```

### Builtin filters

Lume includes the following convenient preinstalled filters:

- **md**: Allows to render Markdown content to HTML.
  [More info](../core/markdown.md)
- **njk**: Allows to render Nunjucks content to HTML.
  [More info](../core/nunjucks.md)
- **url / htmlUrl**: Allows to normalize URLs. [More info](../core/url.md)

### Using the filters in JavaScript modules

If you're using JavaScript/TypeScript modules instead of a template engine like
Nunjucks, filters are passed as the second argument of your default exported
function:

```js
export default function (data, filters) {
  return `<a href="${filters.url("/about-us")}">About us</a>`;
}
```

## Tags

Tags are available only in Nunjucks templates. They allows to create a custom
tag to format and manipulate content. The tags can contain a body or not. This
is an example with a tag with a body:

```html
{% uppercase %}
Hello, {{ user.name }}
{% enduppercase %}
```

See [Helpers configuration](/getting-started/config-file.md#helpers) for more
information about how to create your own tags.
