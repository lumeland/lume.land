---
title: Migrate to Lume 3
description: Guide to migrate your project from Lume 2 to Lume 3
draft: true
---

This page is a brief to-do list of the main changes to make in order to migrate
a site from Lume 2 to Lume 3. There is a more detailed description
[in the announcement post](https://lume.land/blog/posts/lume-3/).

## Temporal API

Lume 3 uses `Temporal` API which is unstable in Deno. Edit the `deno.json` file
to enable it:

```json
{
  "unstable": ["temporal"]
}
```

## Add files

In Lume 3, `site.copy()`, `site.loadAssets()` and `site.copyRemainingFiles()`
were replaced with `site.add()`:

```js
// Lume 2
site.loadAssets([".css"]);
site.copy("/assets", ".");
site.copyRemainingFiles(
  (path: string) => path.startsWith("/articles/"),
);

// Lume 3
site.add([".css"]);
site.add("/assets", ".");
site.add("/articles");
```

## Lume components

### Async components

Lume Components in version 3 are async. If you're using components in `.vto`
files, make sure to add the `await` keyword:

```txt
{{ await comp.button({ text: "Hello world"}) }}
```

For `.njk` files, use the new `await` filter:

```txt
{{ comp.button({ text: "Hello world"}) | await | safe }}
```

### Changed default output for CSS and JS code

In Lume 3, the default option to output components' CSS and JS code is
`/style.css` and `/script.js`. To change it to `/components.css` and
`/components.js` files:

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

In Lume 3, the order of the plugins matter. For example, in Lume 2 the `sitemap`
plugin is executed always at the end:

```js
// Lume 2
site.use(sitemap()); // Executed always at the end of the build
site.use(basePath()); // Executed during the build (before sitemap)
```

In Lume 3 almost all plugins are executed in the same position they are
registered, so if you have some issue upgrading from Lume 2 to Lume 3, make sure
the order of the plugins is correct:

```js
// Lume 3
site.use(basePath()); // Executed in 1st position
site.use(sitemap()); // Executed in 2nd position (after basePath)
```

## Dates in filepaths

In Lume 3, dates in filenames are not extracted automatically by default (for
example `/posts/2020-06-21_hello-world.md`). If your site depends on this
feature, enable it with the `extract_date` plugin:

```js
import extractDate from "lume/plugins/extract_date.ts";

site.use(extractDate());
```

## Plugins changes

### Base path

- The `extension` option was removed.

### Check URLs

- The `extension` option was removed.

### Code Highlight

- The `extension` option was removed.
- The default path to export the CSS of the themes is `/style.css`.

### Date

- The `name` option was removed.

### Esbuild

- This plugin no longer load all `.js` and `.ts` by default. Use `site.add()` to
  include only the files that you want to bundle.
  ```js
  // Lume 2
  site.use(esbuild());

  // Lume 3
  site.add([".js", ".ts"]); // Add the files to bundle
  site.use(esbuild());
  ```

### Favicon

- The `cache` option was removed. Use `LUME_NOCACHE=true` env variable to
  disable cache.

### FFF

- The `extension` option was removed.

### Filter pages

- The `extension` option was removed.

### Google fonts

- The default path to export the CSS of the fonts is `/style.css`.
- Renamed `folder` option to `fontsFolder`.

### Inline

- The `extension` option was removed.
- The `attribute` option was removed.

### JSON LD

- The `extension` option was removed.
- The `name` option was removed.

### JSX Preact

- `jsx_preact` plugin was removed. If your site use `jsx_preact`, replace it
  with `jsx`.

  ```js
  import jsx from "lume/plugins/jsx.ts";

  site.use(jsx());
  ```

### JSX

- The `jsx` plugin uses [SSX library](https://github.com/oscarotero/ssx/)
  instead of React to render the HTML. In your `deno.json` file, configure Deno
  to use `npm:@lumeland/ssx`:

  ```jsonc
  {
    "compilerOptions": {
      "jsx": "react-jsx",
      "jsxImportSource": "npm:@lumeland/ssx"
    }
  }
  ```

- SSX exposes the global namespace `JSX` that you can use in your TypeScript
  pages:

  ```jsx
  interface Props {
    children: JSX.Children
  }

  export default function ({ children }: Props) {
    return <div>{ children }</div>
  }
  ```

### Katex

- The `extension` option was removed.
- The plugin downloads automatically the CSS and font files required to render
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

### Lightningcss

- The `extension` option was removed.
- This plugin no longer load all `.css` files. Use `site.add()` to include only
  the files that you want to process.
  ```js
  // Lume 2
  site.use(lightningcss());

  // Lume 3
  site.add([".css"]); // Add the files to process
  site.use(lightningcss());
  ```

### Liquid

- This plugin was removed. Use Nunjucks instead if you want a similar syntax. Or
  Vento if you want to use the default template engine.

### MDX

- The library no longer depends on JSX plugin installed before:

  ```js
  // Lume 2
  site.use(jsx()); // Required by MDX
  site.use(mdx());

  // Lume 3
  site.use(mdx()); // No longer requires JSX
  ```

### Metas

- The `extension` option was removed.
- The `name` option was removed.

### Multilanguage

- The `extension` option was removed.
- Pages with generators and an array of languages are now correctly handled.

  ```js
  export const lang = ["en", "gl"];

  export default function* ({ lang }) {
    console.log(lang);
    // Lume 2: ["en", "gl"]
    // Lume 3: "en" and "gl" in two different calls
  }
  ```

### Nav

- The `name` option was removed.

### OG images

- The `extension` option was removed.
- The `satori` option was renamed to `options`.
- The `cache` option was removed. Use `LUME_NOCACHE=true` env variable to
  disable cache.

### On demand

- This plugin was removed. Use router middleware if you need some server-side
  behavior (i.e. an API).

### Paginate

- The `name` option was removed.

### Picture

- The `name` option was removed.
- This plugin no longer load all image files. Use `site.add()` to include only
  the files that you want to process.
  ```js
  // Lume 2
  site.use(picture());
  site.use(transformImages());

  // Lume 3
  site.add("/img"); // Add the files to process
  site.use(picture());
  site.use(transformImages());
  ```

### Postcss

- The `extension` option was removed.
- The `name` option was removed.
- This plugin no longer load all `.css`. Use `site.add()` to include only the
  files that you want to process.
  ```js
  // Lume 2
  site.use(postcss());

  // Lume 3
  site.add([".css"]); // Add the files to process
  site.use(postcss());
  ```

### Prism

- The `extension` option was removed.
- The default path to export the CSS of the themes is `/style.css`.

### Purge CSS

- The `extension` option was removed.

### Reading info

- The `name` option was removed.

### Relative URLs

- The `extension` option was removed.

### SASS

- The `extension` option was removed.
- This plugin no longer load all `.sass` and `.scss` files. Use `site.add()` to
  include only the files that you want to process.
  ```js
  // Lume 2
  site.use(sass());

  // Lume 3
  site.add([".scss"]); // Add the files to process
  site.use(sass());
  ```

### Search

- The `name` option was removed.

### Sitemap

- Use alias syntax (for consistency with `feed` and `metas` plugins) to define
  the values:
  ```js
  // Lume 2
  site.use(sitemap({
    items: {
      lastmod: "date",
      priorty: "priority",
    },
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

- This plugin no longer handle unicode characters by default. Use the
  `transliterate` option to configure it.

  ```js
  import unidecode from "npm:unidecode@1.1.0";

  // Lume 2
  site.use(slugifyUrls());

  // Lume 3
  site.use(slugifyUrl({
    transliterate: {
      zh: unidecode,
    },
  }));
  ```

### Svgo

- The `extension` option was removed.
- This plugin no longer load all `.svg` by default. Use `site.add()` to include
  only the files that you want to minify.
  ```js
  // Lume 2
  site.use(svgo());

  // Lume 3
  site.add([".svg"]); // Add the files to minify
  site.use(svgo());
  ```

### Tailwind

- Upgraded to Tailwind v4.
- The `extension` option was removed.
- The plugin no longer depends on `postcss`:
  ```js
  // Lume 2
  site.use(tailwind());
  site.use(postcss());

  // Lume 3
  site.use(tailwind()); // No longer requires postcss
  ```
- This plugin no longer load all `.css` files. Use `site.add()` to include only
  the files that you want to process.
  ```js
  // Lume 2
  site.use(tailwind());

  // Lume 3
  site.add("style.css"); // Add the file(s) to process
  site.use(tailwind());
  ```

### Terser

- This plugin no longer load all `.js` and `.ts` by default. Use `site.add()` to
  include only the files that you want to minify.
  ```js
  // Lume 2
  site.use(terser());

  // Lume 3
  site.add([".js", ".ts"]); // Add the files to minify
  site.use(terser());
  ```

### Transform images

- The `name` option was removed.
- The `cache` option was removed. Use `LUME_NOCACHE=true` env variable to
  disable cache.
- This plugin no longer load all image files. Use `site.add()` to include only
  the files that you want to process.
  ```js
  // Lume 2
  site.use(transformImages());

  // Lume 3
  site.add("/img"); // Add the files to process
  site.use(transformImages());
  ```

### Unocss

- The default path to export the CSS of the themes is `/style.css`.
- This plugin no longer load all `.css` files. Use `site.add()` to include only
  the files that you want to process.
  ```js
  // Lume 2
  site.use(unocss());

  // Lume 3
  site.add([".css"]); // Add the files to process
  site.use(unocss());
  ```

### URL

- The `name` option was removed.
