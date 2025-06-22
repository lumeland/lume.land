---
title: Migrate to Lume 3
description: Guide to migrate your project from Lume 2 to Lume 3
---

This page is a brief to-do list of the main changes to make in order to migrate
a site from Lume 2 to Lume 3. There is a more detailed description
[in the announcement post](https://lume.land/blog/posts/lume-3/).

## Deno configuration

Run the following to upgrade to Lume 3:

```sh
deno task lume upgrade
```

This script will update your `deno.json` file. You will see something like this:

```json
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v3.0.1/",
    "lume/jsx-runtime": "https://deno.land/x/ssx@v0.1.10/jsx-runtime.ts"
  },
  "unstable": ["temporal"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "lume",
    "types": [
      "lume/types.ts"
    ]
  },
  "tasks": {
    "build": "deno task lume",
    "serve": "deno task lume -s",
    "lume": "echo \"import 'lume/cli.ts'\" | deno run -A -"
  },
  "lint": {
    "plugins": [
      "https://deno.land/x/lume@v3.0.1/lint.ts"
    ]
  }
}
```

If you're using a different value in the `compilerOptions.jsxImportSource`,
change it to `lume` to use [`ssx`](https://deno.land/x/ssx), the JSX library
used by Lume plugins like `JSX`, `MDX` and `og_images`.

## Add files

In Lume 3, `site.loadAssets()` and `site.copyRemainingFiles()` were replaced
with `site.add()`:

```js
// Lume 2
site.loadAssets([".css"]);
site.copyRemainingFiles(
  (path: string) => path.startsWith("/articles/"),
);

// Lume 3
site.add([".css"]);
site.add("/articles");
```

## Lume components

### Async components

Lume Components in version 3 are async. Vento and JSX templates handle this
automatically. If you're using components in JS/TS pages, make sure to add the
`await` keyword:

```js
export default async function ({ comp }) {
  return await comp.button({ text: "Hello world" });
}
```

If you're running components in `.njk` files, use the new `await` filter:

```txt
{{ comp.button({ text: "Hello world"}) | await | safe }}
```

### Changed default output for CSS and JS code

In Lume 3, the default option to output components' CSS and JS code is
`/style.css` and `/script.js`. You can configure Lume to keep the old
configuration:

```js
// Back to Lume 2 defaults:
const site = lume({
  components: {
    cssFile: "/components.css",
    jsFile: "/components.js",
  },
});
```

## Plugins order

In Lume 3, the order of the plugins matter.

In the following example, the `prism` plugin is registered after `brotli`. In
Lume 2 the `brotli` plugin is executed always at the end of the build, no matter
in what order it has been registered.

```js
// Lume 2
site.use(brotli()); // Executed always at the end of the build

// Executed during the build
site.use(prism({
  theme: [{
    name: "tomorrow",
    cssFile: "css/prism.css",
  }],
}));
```

In Lume 3 (almost) all plugins are executed in the same position they are
registered. In the example, due `brotli` is executed before `prism`, the CSS
file doesn't exist yet, and the HTML files haven't been processed yet by Prism.
To fix it, change the plugins order:

```js
// Process the HTML code and generate the CSS file
site.use(prism({
  theme: [{
    name: "tomorrow",
    cssFile: "css/prism.css",
  }],
}));

site.use(brotli()); // Compress the HTML and CSS
```

If you have some issue upgrading from Lume 2 to Lume 3, make sure the order of
the plugins is correct. Lume 3 comes with a lint plugin to check the plugins
order and warn you.

## Dates in filepaths

In Lume 3, dates in filenames are not extracted automatically by default (for
example `/posts/2020-06-21_hello-world.md`). If your site depends on this
feature, enable it with the `extract_date` plugin:

```js
import extractDate from "lume/plugins/extract_date.ts";

site.use(extractDate());
```

## Removed plugins

- `jsx_preact`: Replace it with `jsx`.
- `liquid`: Use Nunjucks if you want a similar syntax. Or Vento if you want to
  use the default template engine.
- `on_demand`: Use the router middleware if you need some server-side behavior
  (i.e. an API).

## Removed or renamed plugins options

### Extensions option

The `extension` option has been removed in the following plugins: `base_path`,
`check_urls`, `code_highlight`, `fff`, `filter_pages`, `inline`, `json_ld`,
`katex`, `lightningcss`, `metas`, `multilanguage`, `og_images`, `postcss`,
`prism`, `purge_css`, `relative_urls`, `sass`, `svgo`, `tailwindcss`.

If you see a type error in your _config.ts saying this option doesn't exist for
any of these plugins, you can remove it safety.

### Name option

The `name` option has also been removed in several plugins like: `date`,
`json_ld`, `metas`, `nav`, `paginate`, `picture`, `postcss`, `search`,
`reading_info`, `transform_images`, `url`.

This option allowed to change the name of a filter registered by the plugin or a
data property used. In 99.9% of the cases, you were not using it.

### Other changes

- The `cache` option was also removed in the plugins `favicon`, `og_images` and
  `transform_images`. To disable the cache, use the `LUME_NOCACHE=true` env
  variable.
- The option `attribute` was removed in the `inline` plugin.
- The option `satori` was renamed to `options` in the `og_images`.
- The option `folder` was renamed to `fontsFolder` in the `google_fonts` plugin.
- The default path of the `code_highlight` and `prism` plugins to export the CSS
  of the themes is `/style.css`.
- The default path to export the CSS by the `google_fonts` plugin is
  `/style.css`.

## Assets management

In Lume 3, plugins no longer load assets automatically. For example, styling
plugins like `postcss`, `lighningcss`, `tailwindcss`, `sass` and `unocss`
require to add explicitly the CSS files that you want to process:

```js
// Lume 2
site.use(postcss()); // .css files are automatically loaded

// Lume 3
site.use(postcss());
site.add([".css"]); // add the files explicitly
```

This change affects to images plugin like `transform_images` or `svgo`:

```js
// Lume 2
site.use(svgo()); // All .svg images are loaded
site.use(transformImages()); // All .jpg, .png, etc images are loaded

// Lume 3
site.use(svg());
site.use(transformImages());
site.add("/img"); // Add only the files you want to process
```

And plugins to optimize JavaScript code like `esbuild` and `terser`:

```js
// Lume 2
site.use(esbuild()); // All .js and .ts files are loaded

// Lume 3
site.use(esbuild());
site.add("/main.ts"); // Add only the entry points to optimize
```

## JSX

The `jsx` plugin uses [SSX library](https://github.com/oscarotero/ssx/) instead
of React to render the HTML. In your `deno.json` file, configure Deno to use
`npm:@lumeland/ssx`:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "npm:@lumeland/ssx"
  }
}
```

SSX exposes the global namespace `JSX` that you can use in your TypeScript
pages:

```jsx
interface Props {
  children: JSX.Children
}

export default function ({ children }: Props) {
  return <div>{ children }</div>
}
```

Another important change is that pages created with JSX and TSX now use the
`.page` subextension by default. For example, the page `/index.tsx` must be
renamed to `/index.page.tsx`. This allows to better differentiate between Lume
pages (`.page.tsx`) and JSX files for the browser. If you want to keep the same
behavior as Lume 2, configure the plugin to don't use the subextension:

```js
site.use(jsx({
  pageSubExtension: "", // Keep Lume 2 default behavior
}));
```

## Tailwind

The `tailwind` plugin has upgraded to Tailwind v4. See
[Upgrade guide](https://tailwindcss.com/docs/upgrade-guide) to know how to
migrate your CSS code. For example:

```css
/* Lume 2 (with Tailwind 3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Lume 3 (with Tailwind 4) */
@import "tailwindcss";
```

The plugin no longer depends on `postcss`:

```js
// Lume 2
site.use(tailwind());
site.use(postcss());

// Lume 3
site.use(tailwind()); // No longer requires postcss
```

## Other plugin changes

### Katex

This plugin downloads automatically the CSS and font files required to render
the math code (by default to `/style.css` file and `/fonts` folder but it's
configurable).

```html
<!-- Lume 2 -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.css"
>

<!-- Lume 3 -->
<link rel="stylesheet" href="style.css">
```

### Multilanguage

Pages with generators and an array of languages are now correctly handled.

```js
export const lang = ["en", "gl"];

export default function* ({ lang }) {
  console.log(lang);
  // Lume 2: ["en", "gl"]
  // Lume 3: "en" and "gl" in two different calls
}
```

### Sitemap

Similar to the `feed` and `metas` plugins, use alias syntax to define the
values. To maintain consistency with the `feed` plugin, the values for items
should now be specified within the `items` object:

```js
// Lume 2
site.use(sitemap({
  lastmod: "date",
  priorty: "priority",
}));

// Lume 3
site.use(sitemap({
  items: {
    lastmod: "=date",
    priorty: "=priority",
  },
}));
```

### Slugify URLs

This plugin no longer handle unicode characters by default. Use the
`transliterate` option to configure it.

```js
import unidecode from "npm:unidecode@1.1.0";

// Lume 2
site.use(slugifyUrls());

// Lume 3
site.use(slugifyUrl({
  transliterate: {
    zh: unidecode, // use this function for chinesse (zh) language
  },
}));
```
