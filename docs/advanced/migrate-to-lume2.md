---
title: Migrate to Lume 2
description: Guide to migrate your project from Lume 1 to Lume 2
---

## Change your (pre)processors

In Lume 2, processors and preprocessors receive an array with all pages:

```js
// Lume 1
site.process([".html"], fn);

// Lume 2
site.process([".html"], (pages) => pages.forEach(fn));

// Lume 2 (async functions)
site.process([".html"], (pages) => Promise.all(pages.map(fn)));
```

If you're using `(pre)processAll`, rename it to `(pre)process`:

```js
// Lume 1
site.processAll([".html"], fn);

// Lume 2
site.process([".html"], fn);
```

## Change `.page.*` pages

The subextension `tmpl` for TypeScript/JavaScript pages was changed to `page`
and it's no longer required for layouts. This structure in Lume 1:

```txt
_includes/layout.page.js
_components/button.js
_data.js
index.page.js
```

In Lume 2 becomes to:

```txt
_includes/layout.js
_components/button.js
_data.js
index.page.js
```

[This is a simple script](https://gist.github.com/oscarotero/c6404f36530cf989ec1ba65b75d41e9c)
to rename the files automatically. To keep using `.page` as the subextension,
you can edit the option `pageSubExtension` to the `module` and `json` plugins:

```js
import lume from "lume/mod.ts";

const modules = { pageSubExtension: ".page" };
const json = { pageSubExtension: ".page" };

const site = lume({}, { modules, json });

export default lume;
```

## Changes in URL generation:

### The `url` function

If you're generating the url of the pages with the `url()` function, keep in
mind that the property `page.src.slug` was removed. Use `page.data.basename`
instead.

```js
// Lume 1
export const url = (page) => `/articles/${page.src.slug}/`;

// Lume 2
export const url = (page) => `/articles/${page.data.basename}/`;
```

In Lume 2, the page passed to the function has already the default URL applied,
which is easier to make small tweaks:

```js
// Only in Lume 2:
// Just remove the `/foo/` directory:

export const url = (page) => page.data.url.replace("/foo/", "/");
```

### 404 pages

Pretty URLs no longer ouputs `/404/index.html`:

```bash
# Lume 1
/404.md  => /404/index.html

# Lume 2
/404.md  => /404.html
```

To revert this, use the `url` variable in the frontmater.

### Automatic extension detection

In Lume 2 the output extension is no longer detected from the filename. By
default all pages are exported as HTML:

```bash
# Lume 1
/styles.css.md  => /styles.css

# Lume 2
/styles.css.md  => /styles.css/index.html
```

Use the `url` variable in the page's frontmater to assign other extension.

## Removed flags

If you're using `--quiet` or `--dev` flag to run Lume, they were replaced with
environment variables:

```bash
# Lume 1
deno task lume --dev
deno task lume --quiet

# Lume 2
LUME_DRAFTS=true deno task lume
LUME_LOGS=critical deno task lume
```

## Imagick plugin

The `imagick` plugin was replaced with `transform_images`:

```js
// Lume 1
import imagick from "lume/plugins/imagick.ts";

site.use(imagick());

// Lume 2
import transformImages from "lume/plugins/transform_images.ts";

site.use(transformImages());
```

Both plugins works similarly but the data key used is different:

```yml
# Lume 1
imagick:
  - format: webp
    resize: [100, 200]

# Lume 2
transformImages:
  - format: webp
    resize: [100, 200]
```

## Picture plugin

The picture plugin uses the new `transform_images` plugin under the hood, so the
HTML attribute name has changed to `transform-images`:

```html
<!-- Lume 1 -->
<img src="/flowers.jpg" imagick="avif jpg 600">

<!-- Lume 2 -->
<img src="/flowers.jpg" transform-images="avif jpg 600">
```

## Nunjucks plugin

If you're using Nunjucks templates, import the plugin in your _config.ts file:

```ts
import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";

const site = lume();
site.use(nunjucks());

export default site;
```

## Vento plugin

This plugin is enabled by default. If you're using this template engine, remove
the import in your _config file.

## Searching

The functions `search.page()` and `search.pages()` returns the data object
instead of the page instance:

```tsx
// Lume 1
for (const page of search.pages("type=article")) {
  <h1>{page.data.title}</h1>;
}

// Lume 2
for (const data of search.pages("type=article")) {
  <h1>{data.title}</h1>;
}
```

The function `search.tags()` was removed. Use `search.values`:

```ts
// Lume 1
const tags = search.tags();

// Lume 2
const tags = search.values("tags");
```

The filter `data` was removed:

```html
<!-- Lume 1 -->
{% for article in search.pages("type=article") | data %}

<!-- Lume 2 -->
{% for article in search.pages("type=article") %}
```

## JSX plugin

The global object `window.React` was removed. If you have problems compiling
your JSX pages, configure the JSX transformer in the `deno.json` file:

```json
{
  "compilerOptions": {
    "jsx": "react-js",
    "jsxImportSource": "npm:react",
    "types": [
      "https://unpkg.com/@types/react@18.2.37/index.d.ts"
    ]
  }
}
```

## Slugify URLs plugin

If you're using the `slugify_urls` plugin, it slugify also the files copied with
`site.copy()`. To disable it:

```js
site.use(slugifyUrls({
  extensions: [".html"], // To slugify only HTML pages
}));
```

## Netlify CMS plugin

This plugin was renamed to `decap_cms`. And the `netlifyIdentity` option was
renamed to `identity`:

```ts
// Lume 1
site.use(netlifyCMS({
  netlifyIdentity: true,
}));

// Lume 2
site.use(decapCMS({
  identity: "netlify",
}));
```

## WindiCSS plugin

This plugin was replaced with UnoCSS:

```ts
// Lume 1
site.use(windiCSS());

// Lume 2
site.use(unoCSS());
site.use(postcss());
```

> The UnoCSS plugin is not a 1:1 substitute of windiCSS.

## Feed plugin

The following options have been renamed:

```ts
// Lume 1
site.use(feed({
  info: {
    date: "=date",
  },
  item: {
    date: "=date",
  },
}));

// Lume 2
site.use(feed({
  info: {
    updated: "=date",
  },
  item: {
    updated: "=date",
    published: "=date", // New option!
  },
}));
```

## Multilanguage plugin

The [`multilanguage` plugin](../../plugins/multilanguage.md) no longer allows
translations using the `.[lang]` prefix:

```yml
# Lume 1
title: Default title
title.gl: Translation to galician
title.es: Translation to spanish

description: Default description
description.gl: Translation to galician
description.es: Translation to spanish

# Lume 2
title: Default title
description: Default description

gl:
  title: Translation to galician
  description: Translation to galician

es:
  title: Translation to spanish
  description: Translation to spanish
```

## Plugins options

The option `keepDefaultPlugins` was renamed to `useDefaultPlugins` that is
`true` by default. This affects to the plugins `postcss`, `markdown`, `mdx`,
`remark`.

```ts
// Lume 1
import reporter from "npm:postcss-reporter";

site.use(postcss({
  plugins: [reporter],
  keepDefaultPlugins: true,
}));

// Lume 2
import reporter from "npm:postcss-reporter";

site.use(postcss({
  plugins: [reporter],
}));
```

## TypeScript

Removed `/lume/core.ts`. Import the Lume namespace in the `deno.json` file:

```json
{
  // ...
  "compilerOptions": {
    "types": [
      "lume/types.ts"
    ]
  }
}
```

In Lume 1:

```ts
import { PageData, PageHelpers } from "lume/core.ts";

export default function (data: PageData, helpers: PageHelpers) {
  return `<h1>${data.title}</h1>`;
}
```

In Lume 2:

```ts
export default function (data: Lume.Data, helpers: Lume.Helpers) {
  return `<h1>${data.title}</h1>`;
}
```
