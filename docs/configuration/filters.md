---
title: Helpers & filters
description: Helpers are functions accessible from pages and layouts that help to render the content.
order: 4
---

${toc}

## Filters

There are different types of helpers, the most common type is a **filter**, used
to transform values. Some template engines, like Nunjucks,
[have several builtin filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters),
but you can add more:

```js
// Filter to convert a string to uppercase
site.filter("uppercase", (value) => value.toUpperCase());
```

Now, use it in your templates:

<lume-code>

```html{title=Nunjucks}
<h1>{{ title | uppercase }}</h1>
```

```js{title=JavaScript}
export default function (data, filters) {
  const text = filters.uppercase(data.title);

  return `<h1>${text}</h1>`;
}
```

```html{title=Eta}
<h1><%= filters.uppercase(title) %></h1>
```

</lume-code>

If your filter is asynchronous, set `true` as the third argument:

```js
site.filter("async_filter", async (value) => value, true);
```

Not all template engines support async filters. {.tip}

### Builtin filters

Lume includes the following convenient preinstalled filters:

- **md**: Allows to render Markdown content to HTML.
  [More info](../../plugins/markdown.md#md-filter)
- **njk**: Allows to render Nunjucks content to HTML.
  [More info](../../plugins/nunjucks.md#njk-filter)
- **url / htmlUrl**: Allows to normalize URLs. [More info](../../plugins/url.md)

## Helpers

Some templates engines allows to add other helpers different to filters, like
custom tags. To configure that, there's the `helper()` method that allows to add
any generical helper.

<lume-code>

```js { title="Configuration" }
site.helper("uppercase", (text) => text.toUpperCase(), { type: "tag" });
```

```html { title="Nunjucks" }
{% uppercase user.name %}
```

</lume-code>

The third argument is an object with different properties:

- `type`: The type of helper. It can be `tag`, `filter` or any other, depending
  on the template engine.
- `async`: Set `true` to configure the helper as async.
- `body`: Set `true` to configure that the helper accept a body (supported only
  by nunjucks custom tags)

Example of custom tag with body:

<lume-code>

```js { title="Configuration" }
site.helper("uppercase", (body) => body.toUpperCase(), {
  type: "tag",
  body: "true",
});
```

```js { title="Nunjucks" }
{% uppercase %}
Hello, {{ user.name }}
{% enduppercase %}
```

</lume-code>

Note: The method `filter()` is just a shortcut of `helper()` with
`{ type: "filter" }`. {.tip}
