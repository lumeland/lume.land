---
title: Remote files
description: Load remote files as fallback of missing local files
order: 16
---

From Lume `v1.10.0` it's possible to use remote files as if they where local
files. To configure a remote file, you have to set a local name and a remote url
in your `_config.ts` file using the `remoteFile()` function. For example:

```ts
import lume from "lume/mod.ts";

const site = lume();

site.remoteFile("styles.css", "https://example.com/theme/styles.css");

export default site;
```

This indicates to Lume that if the file `styles.css` **doesn't exist locally**
the remote url must be used. Note that the file **wont be saved in the project
folder** but it's in memory.

If you want to copy this file statically:

```js
site.copy("styles.css");
```

Due the file doesn't exist in your local folder, Lume will download the file
from the url and save it in the dest folder.

The `postcss` plugin supports Lume's remote files, so you can import this file
in your css with:

```css
@import "./styles.css";
```

## Remote layouts

Remote files can be used for layouts. Let's say you have several websites using
the same layout. Instead repeating the same file it in every project, you can
load it remotely:

```ts
site.remoteFile(
  "_includes/layouts/main.njk",
  "https://example.com/theme/layouts/main.njk",
);
```

Now, you can use this layout in all your files:

```md
---
title: This is a page
layout: layouts/main.njk
---

Page content
```

## Override remote files

If a remote file exists locally (in previous examples: `styles.css` and
`_includes/layouts/main.njk`) the local file will be used instead of the remote
one. This is useful to create themes with all templates and assets loaded
remotely but allowing overriding some files locally in order to customize the
theme. As an example, see the
[Simple blog theme](https://github.com/lumeland/theme-simple-blog).

## Limits of the remote files

Remote files works fine in the following cases:

- To copy static files (with `site.copy()`)
- To load pages and assets.
- To load layouts defined with the `layout` property of the pages.
- To load `_data` files and folders.
- To load `_components` files.
- Some processors like `esbuild` and `postcss` have support for remote files.

But there are some scenarios that remote files doesn't work or work in a limited
way:

### Including templates

Some template engines have their own way to load templates. For example, Pug use
`extends "filename"`, Liquid and Nunjucks use `{% include "filename" %}`, etc.

Some engines allows to configure how to load these files (so they can use the
Lume reader), but others don't. At this moment, **only Nunjucks supports remote
files**. Keep in mind that Lume reader is asynchronous, meaning that the remote
files loaded by Nunjucks must use the async API (`asyncEach` instead of `for`
etc). More info about
[Asynchronous support for Nunjucks](https://mozilla.github.io/nunjucks/api.html#asynchronous-support).

### Import modules

JavaScript/TypeScript modules imported as `import foo from "./filename.ts"` are
not managed by Lume reader, but you can use import maps for a similar behavior.

### Asset processors

Some processors like `SASS` doesn't allow to customize how to load imported
resources, so they cannot use the Lume reader. For styles, only `postcss` plugin
supports remote files. And to bundle JavaScript use `esbuild`.
