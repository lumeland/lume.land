---
title: Remote files
description: Load remote files as fallback of missing local files
order: 16
---

In Lume it's possible to use remote files as if they were local files. To
configure a remote file, you must set a local name and a remote URL in your
`_config.ts` file using the `remoteFile()` function. For example:

```ts
import lume from "lume/mod.ts";

const site = lume();

site.remoteFile("styles.css", "https://example.com/theme/styles.css");

export default site;
```

This indicates to Lume that if the file `styles.css` **doesn't exist locally**
the remote URL must be used. Note that the file **won't be saved in the project
folder**, but it's in memory.

If you want to copy this file statically:

```js
site.copy("styles.css");
```

Because the file doesn't exist in your local folder, Lume will download the file
from the URL and save it in the dest folder.

The `postcss` plugin supports Lume's remote files, so you can import this file
in your CSS with:

```css
@import "./styles.css";
```

## Remote layouts

Remote files can be used for layouts. Let's say you have several websites using
the same layout. Instead of repeating the same file in every project, you can
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

If a remote file exists locally (in the previous examples: `styles.css` and
`_includes/layouts/main.njk`) the local file will be used instead of the remote
one. This is useful for creating themes with all templates and assets loaded
remotely but allowing overriding some files locally in order to customize the
theme. As an example, see the
[Simple blog theme](https://github.com/lumeland/theme-simple-blog).

## Limits of the remote files

Remote files work fine in the following cases:

- To copy static files (with `site.copy()`)
- To load pages and assets.
- To load layouts defined with the `layout` property of the pages.
- To load `_data` files and folders.
- To load `_components` files.
- Some processors like `esbuild` and `postcss` have support for remote files.

But there are some scenarios that remote files don't work or work in a limited
way:

### Including templates

Some template engines have their own way of loading templates. For example, Pug
uses `extends "filename"`, Liquid and Nunjucks use `{% include "filename" %}`,
etc.

Some engines allow configuring how to load these files (so they can use the Lume
reader), but others don't. At this moment, **only Nunjucks supports remote
files**. Keep in mind that Lume reader is asynchronous, meaning that the remote
files loaded by Nunjucks must use the async API (`asyncEach` instead of `for`
etc). More info about
[Asynchronous support for Nunjucks](https://mozilla.github.io/nunjucks/api.html#asynchronous-support).

### Cache files

As of Lume 1.17.4, files are automatically cached using the
[Web Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache), so it's
only requested the first time and then network access is no longer needed. It's
possible to disable the cache for a specific file by removing the cached
response before the build. For example:

```ts
// Open the cache of Lume's remote files
const cache = await caches.open("lume_remote_files");

// Remove the cache using the remote URL
await cache.delete("https://example.com/theme/styles.css");
```

### Import modules

JavaScript/TypeScript modules imported as `import foo from "./filename.ts"` are
not managed by Lume reader, but you can use import maps for a similar behavior.
