---
title: MDX
description: Use MDX to create pages.
mod: plugins/mdx.ts
tags:
  - template_engine
---

## Description

[MDX](https://mdxjs.com) is a format that combine Markdown and JSX, so you can
write regular Markdown content and import JSX components. This plugin adds
support for MDX to create pages in Lume, by creating files with the `.mdx`
extension.

## Installation

The MDX plugin depends on a JSX plugin to work. Use it together with
[jsx](./jsx.md) or [jsx_preact](./jsx_preact.md) plugin depending on whether you
want to use React or Preact.

This is an example with Preact:

```js
import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import mdx from "lume/plugins/mdx.ts";

const site = lume();

site.use(jsx());
site.use(mdx(/* Options */));

export default site;
```

By default, Deno uses React to render JSX. If you want to use the `jsx_preact`
plugin, add the following to your `deno.json` file:

```json
"compilerOptions": {
  "jsx": "react-jsx",
  "jsxImportSource": "npm:react"
}
```

## Plugins

MDX uses Remark and Rehype under the hood, so you can add additional plugins. By
default it uses the _GitHub-flavored markdown_, but you can use the
`remarkPlugins`, `recmaPlugins` and `rehypePlugins` options to add more:

```js
import lume from "lume/mod.ts";
import mdx from "lume/plugins/mdx.ts";
import jsx from "lume/plugins/jsx.ts";
import a11yEmoji from 'npm:@fec/remark-a11y-emoji';
import rehypeRemoveComments from 'npm:rehype-remove-comments@5';

const site = lume();

site.use(jsx());
site.use(mdx({
  remarkPlugins: [allyEmoji]
  rehypePlugins: [rehypeRemoveComments]
}));

export default site;
```

## Components

In MDX you can use the Lume components from the `comp` global variable variable
or import other components like in JavaScript (with `import ... from ...`):

```html
---
title: Hello world
description: This is a description
---

import Image from "./_includes/Image.tsx";

<comp.Header title={title} description={description}/>

This is a markdown file with the title **{ title }**.

<Image alt="foo" />
```

MDX is designed to work with JSX components. If you use a component that returns
the HTML code as string (for example a nunjucks component) it will be escaped.
To avoid that, you have to use the `dangerouslySetInnerHTML` attribute.

For example, let's say you have nunjucks component to render a title:

```html
<!-- comp.title -->
<h1>{{ text }}</h1>
```

A way to use it in a mdx file is:

```md
<div dangerouslySetInnerHTML={
  { __html: comp.title({ text: "Hello world" }) }
} />
```

### Overwriting components

You can use the `components` option to overwrite or add additional components.
For example, to convert all `h1` to `h2`:

```js
import lume from "lume/mod.ts";
import mdx from "lume/plugins/mdx.ts";
import jsx from "lume/plugins/jsx.ts";

const site = lume();

site.use(jsx());
site.use(mdx({
  components: {
    h1: "h2",
  },
}));

export default site;
```
