---
title: Helpers & filters
description: Helpers are functions accessible from pages and layouts that help to render the content.
order: 4
---

## Filters

There are different types of helpers; the most common type is a **filter**, used
to transform values. Some template engines, like Nunjucks,
[have several builtin filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters),
but you can add more:

```js
// Filter to convert a string to uppercase
site.filter("uppercase", (value) => value.toUpperCase());
```

Now, use it in your templates:

<lume-code>

```vento{title=Vento}
<h1>{{ title |> uppercase }}</h1>
```

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

> [!warning]
>
> Not all template engines support async filters.

### Builtin filters

Lume includes the following convenient pre-installed filters:

- **md**: Allows to render Markdown content to HTML.
  [More info](../../plugins/markdown.md#md-filter)
- **vto**: Allows to render Vento content to HTML.
  [More info](../../plugins/vento.md#vto-filter)
- **url / htmlUrl**: Allows to normalize URLs. [More info](../../plugins/url.md)

## Helpers

Some template engines allow adding other helpers different from filters, like
custom tags. To configure that, there's the `helper()` method that allows adding
any generic helper.

<lume-code>

```js { title="Configuration" }
site.helper("uppercase", (text) => text.toUpperCase(), { type: "tag" });
```

```html { title="Nunjucks" }
{{ uppercase user.name }}
```

</lume-code>

The third argument is an object with different properties:

- `type`: The type of helper. It can be `tag`, `filter` or any other, depending
  on the template engine.
- `async`: Set `true` to configure the helper as async.
- `body`: Set `true` to configure the helper to accept a body (only supported by
  nunjucks custom tags)

Example of custom tag with body:

<lume-code>

```js { title="Configuration" }
site.helper("uppercase", (body) => body.toUpperCase(), {
  type: "tag",
  body: "true",
});
```

```js { title="Nunjucks" }
{{ uppercase }}
Hello, {{ user.name }}
{{ enduppercase }}
```

</lume-code>

> [!note]
>
> The `filter()` method is just a shortcut to `helper()` with
> `{ type: "filter" }` added.
