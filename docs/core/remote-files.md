---
title: Remote files
description: Load remote files as a fallback of missing local files
order: 16
---

In Lume, it's possible to use remote files as if they were local files. To
configure a remote file, you must set a local name and a remote URL in your
`_config.ts` file using the `remoteFile()` function. For example:

```ts
import lume from "lume/mod.ts";

const site = lume();

site.remoteFile("styles.css", "https://example.com/theme/styles.css");

export default site;
```

This indicates that if the file `styles.css` **doesn't exist locally**, the
remote URL must be used. Note that the file **won't be saved in the project
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
  "_includes/layouts/main.vto",
  "https://example.com/theme/layouts/main.vto",
);
```

Now, you can use this layout in all your files:

```md
---
title: This is a page
layout: layouts/main.vto
---

Page content
```

## Override remote files

If a remote file exists locally(in the previous examples: `styles.css` and
`_includes/layouts/main.vto`), the local file will be used instead of the remote
one. This is useful for creating themes with all templates and assets loaded
remotely but allowing overriding some files locally in order to customize the
theme. As an example, see the
[Simple blog theme](https://github.com/lumeland/theme-simple-blog).

## Limits of remote files

Remote files work in most cases, because they are integrated natively in Lume's
file system

Some template engines have their own way of loading templates. For example, Pug
uses `extends "filename"`, Vento uses `{{ include "filename" }}`, Liquid and
Nunjucks use `{% include "filename" %}`, etc.

The template engines [Eta](../../plugins/eta.md),
[Liquid](../../plugins/liquid.md) and [Pug](../../plugins/pug.md) don't allow
customizing how they load files, hence they cannot include remote files. If you
want to use remote templates, [Vento](../../plugins/vento.md) or
[Nunjucks](../../plugins/nunjucks.md) are good options.

### Cache files

As of Lume 1.17.4, files are automatically cached using the
[Web Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache), so they
are requested only the first time and then network access is no longer needed.
It's possible to disable the cache for a specific file by removing the cached
response before the build. For example:

```ts
// Open the cache of Lume's remote files
const cache = await caches.open("lume_remote_files");

// Remove the cache using the remote URL
await cache.delete("https://example.com/theme/styles.css");
```

If you don't want to cache the remote files, use the `LUME_NOCACHE=true`
environment variable. For example:

```
LUME_NOCACHE=true deno task serve
```

### Import modules

JavaScript/TypeScript modules imported as `import foo from "./filename.ts"` are
not managed by Lume's file system, but you can use import maps for a similar
behavior.
