---
title: Markdown footnotes
description: Plugin to collect all footnotes from markdown files
category: navigation
---

## Description

Plugin to collect all [footnotes](https://markdownformatting.com/footnotes) and save them in the `footnotes` key of the page data, allowing to render them in the layouts.

Note that this plugin only works combined with the default [`markdown`](./markdown.md) plugin which uses `markdown-it` under the hood. If you use a different library to render markdown, like [`remark`](./remark.md), this library won't work.

Let's say you have a markdown content with some footnotes:

```md
Markdown is easy to learn.[^1] It was created in 2004.[^origin]

[^1]: Most people pick up the basics in 10 minutes.
[^origin]: John Gruber and Aaron Swartz created Markdown together.
```

The plugin will convert the references found to links inside `<sup>`:

```html
<p>Markdown is easy to learn.<sup><a class="footnote-ref" href="#fn-1" id="fnref-1">1</a></sup> It was created in 2004.<sup><a class="footnote-ref" href="#fn-2" id="fnref-2">2</a></sup></p>
```

And the footnotes are stored in the `footnotes` variable with the following syntax:

```ts
interface Footnote {
  id: string; /* Unique id of the foonote */
  label?: string; /* Visible label */
  content?: string; /* Footnote content in HTML */
  refIds?: string[]; /* The ids of all references found in the text to this foonote */
  refId?: string; /* The first id of the references */
}
```

You can use this value to render the foonotes in the page's layout. For example:

```vto
{{ if footnotes.length }}
<ul>
  {{ for note of footnotes }}
  <li id={{ note.id }}>
    {{ note.content }}

    {{ for refId of note.refIds }}
      <a href="#{{ refId }}" class="footnote-backref">↩</a>
    {{ /for }}
  </li>
  {{ /for }}
</ul>  
{{ /if }}
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import footnotes from "@lumeland/plugin-markdown-footnotes";

const site = lume();

site.use(markdown());

export default site;
```
