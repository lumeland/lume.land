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

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import mdx from "lume/plugins/mdx.ts";

const site = lume();

site.use(mdx(/* Options */));

export default site;
```

## Plugins

MDX uses Remark and Rehype under the hood, so you can add additional plugins. By
default it uses the _GitHub-flavored markdown_, but you can use the
`remarkPlugins`, `recmaPlugins` and `rehypePlugins` options to add more:

```js
import lume from "lume/mod.ts";
import mdx from "lume/plugins/mdx.ts";
import a11yEmoji from 'npm:@fec/remark-a11y-emoji';
import rehypeRemoveComments from 'npm:rehype-remove-comments@5';

const site = lume();

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

> [!note]
>
> If you want to use JSX components, you need to install the
> [JSX plugin](./jsx.md).

### Overwriting components

You can use the `components` option to overwrite or add additional components.
For example, to convert all `h1` to `h2`:

```js
import lume from "lume/mod.ts";
import mdx from "lume/plugins/mdx.ts";

const site = lume();

site.use(mdx({
  components: {
    h1: "h2",
  },
}));

export default site;
```
