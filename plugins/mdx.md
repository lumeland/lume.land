---
title: MDX
description: Use MDX to create pages.
docs: plugins/mdx.ts/~/Options
tags:
  - template_engine
---

## Installation

This plugin needs a JSX library. Use it together with [jsx](./jsx.md) or
[jsx_preact](./jsx_preact.md) plugins depending on whether you want to use React
or Preact.

This is an example with React:

```js
import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";

const site = lume();

site.use(jsx());
site.use(mdx());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/mdx.ts/~/Options).

## Description

This plugin adds support for [MDX](https://mdxjs.com) to create pages in Lume,
just add files with the `.mdx` extension to your site.

## Plugins

MDX uses Remark and Rehype under the hood, so you can add additional plugins. By
default it uses the _GitHub-flavored markdown_, but you can use the
`remarkPlugins` and `rehypePlugins` options to add more:

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
