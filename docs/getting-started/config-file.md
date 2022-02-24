---
title: Configuration
description: Configuring Lume
order: 3
---

**Lume** processes your files based on the file extension. Which file extensions
are processed how is determined by tying the extensions to **template engines**
or **processors**. Some extensions are enabled by default, for example
**Markdown** (`*.md`) or **Nunjucks** (`*.njk`). This means that all `*.md`, and
`*.njk` files will be loaded, processed and saved as `*.html` files.

You can customize this by adding a `_config.ts` or `_config.js` file, which adds
to or overrides the default options; for example, to use a different template
engine or to process different file types with other extensions. Although you
can code this in the config file, for convenience, **Lume** includes **plugins**
for common transformations, such as Markdown and Nunjucks.

The config file must be placed in the site's root directory, which you can
create yourself or with the following command:

```sh
lume init
```

The `_config.js` file is a JavaScript module that exports a Lume instance. The
minimal required code is:

```js
import lume from "lume/mod.ts";

const site = lume();

export default site;
```

You can pass an object with configuration data to your site. The available
options are:

### cwd

The `cwd` option defines the root of your project. The `src` and `dest`
directory are relative to this path. By default is the value of `Deno.cwd()` and
you may not modify it (unless you have a good reason).

You can override it in the CLI, with the option `--root`. This is useful to
execute Lume in a project in a different folder:

```sh
# Run lume in the projects/my-blog subdirectory
lume --root ./projects/my-blog
```

### src

This is the directory of the sources of your site. All files needed to build
your site must be here. Files and folders outside this directory won't be
included in your site. It's relative to `cwd` and by default it's `.` (the same
directory), but some people prefer to store the source files in a subfolder like
`src`.

You can override the value from the CLI with `--src`, useful if you have
different sites in the same directory:

```sh
lume --src ./src
```

### dest

This is the destination of your site, the output files will be saved here. It's
relative to `cwd` and by default is `_site`. The `dest` directory can be inside
the `src` directory (in fact, it is by default).

You can override the value from the CLI with `--dest`, useful if you want to
generate the site without override the previous one:

```sh
lume --dest ./output
```

### location

This is the URL where the site will be published. Useful to generate absolute
URLs or if your site is published in a subdirectory, for example:
`https://username.github.io/project-name/`. The value must be an
[URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), for
example:

```ts
const site = lume({
  location: new URL("https://example.com"),
});
```

If you start a local server (with `lume --serve`), **this value is always
`http://localhost:3000`** (or the defined port if you change it).

You can override the value from the CLI with `--location`, very useful if you
want to build and deploy the site to different locations:

```sh
lume --location https://my-site.com/blog/
```

### dev

Set `true` to build the site in development mode. The only difference is that
pages with the value `draft: true` will be included in the build (in production
mode they are ignored). This value can be used also to load or configure plugins
differently according to the environment. For example: minify the Javascript
code only in production mode.

By default is `false`, and you can override the value from the CLI with `--dev`.

```sh
lume --dev
```

### prettyUrls

To generate pretty URLs, for example `/about-us/` instead of `/about-us.html`.
It only has effect on pages without `url` variable
([see URLs documentation](../creating-pages/urls.md)). It's enabled by default,
set `false` to disable it.

### server

This is an object to configure the local server. It has the following options:

- **port:** to configure the port of the server. By default is `3000`. It can be
  override also from CLI with `--port`.
- **page404:** to configure the HTML page to display for 404 errors. By default
  is `/404.html`. If you are building a SPA with dynamic urls, you may want to
  change it to `/index.html`.
- **open:** set `true` to automatically open the site in the browser after
  starting the local web server.

### watcher

An object to configure the file watcher:

- **debounce:** The debounce interval (in milliseconds). By default is `100`.
- **ignore:** An array of paths that the watcher will ignore.

### Components

An object to configure the components load and output files.

- **directory:** The directory where the components files are stored.
- **variable:** The variable name used to access to the loaded components.
- **cssFile:** The file name to export the CSS code of the components.
- **jsFile:** The file name to export the JS code of the components.

This is an example with all options with the default values:

```js
import lume from "lume/mod.ts";

const site = lume({
  cwd: Deno.cwd(),
  src: ".",
  dest: "_site",
  location: new URL("http://localhost:3000"),
  dev: false
  prettyUrls: true,
  server: {
    port: 3000,
    page404: "/404.html",
    open: false,
  },
  watcher: {
    debounce: 100,
    ignore: []
  },
  components: {
    directory: "/_components",
    variable: "comp",
    cssFile: "/components.css",
    jsFile: "/components.js",
  },
});

export default site;
```

## Installing plugins

As stated above, plugins add extra functionality or support for new formats.
There are some basic plugins installed by default (like support for `markdown`,
`yaml` or `json` formats), but there are other plugins that you can enable. For
example, to add the `svg` plugin (that optimizes SVG files), you have to import
the plugin and enable it with `use()` in the config file:

```js
import lume from "lume/mod.ts";
import svgo from "lume/plugins/svgo.ts";

const site = lume();

// Add svgo plugin
site.use(svgo());

export default site;
```

For convenience, the command `lume init` accepts also the `--plugins` argument
that automatically create the code to install and register a plugin. For
example, to create a config file including the `postcss` and `svg` plugins:

```sh
lume init --plugins=postcss,svg
```

## Copy static files

Static files are files that don't have to be processed, like images, PDFs,
videos or audios. So it's better (and faster) to copy these files directly to
dest directory with the `copy` method:

```js
// Copy the "img" directory to _site/img
site.copy("img");

// Copy the file to _site/favicon.ico
site.copy("favicon.ico");
```

The path is relative to the source directory of your site (configured in `src`)
and the files and directories are copied as is, maintaining the same directory
structure. If you want to change the output directory, use the second parameter:

```js
// Copy the "img" directory to _site/images
site.copy("img", "images");

// Copy the "static-files/favicons/favicon.ico" to _site/favicon.ico
site.copy("static-files/favicons/favicon.ico", "favicon.ico");

// Copy the content of "assets" directory to the root of your site
site.copy("assets", ".");
```

The method `site.copy()` only accepts files and folders. Patterns like
`img/*.png` are not supported. The files and folders copied are not processed,
even if they have known extensions like `.md`, `.njk`, etc.

## Ignore files and directories

By default, all files and directories starting with `.` or `_` are ignored, in
addition to files and folders copied with `site.copy()`. You can add more by
using the `ignore()` method:

```js
site.ignore("README.md", "CHANGELOG.md", "node_modules");
```

The following paths are ignored by default:

- `node_modules`
- `import_map.json`
- `deno.json`

## Template filters

Template filters are functions that you can use in your layouts to modify
content. Some template engines, like Nunjucks,
[have several builtin filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters),
but you can add your own:

```js
// Filter to convert a string to uppercase
site.filter("uppercase", (value) => value.toUpperCase());
```

Now, use it in your Nunjucks templates:

```html
<h1>{{ title | uppercase }}</h1>
```

If your filter is asynchronous, set `true` as the third argument:

```js
site.filter("async_filter", async (value) => value, true);
```

Note that not all template engines support async filters.

## Helpers

Some templates engines allows to add other helpers different to filters, like
custom tags. To configure that, there's the `helper()` method that allows to add
any generical helper. Example:

```js
site.helper("uppercase", (text) => text.toUpperCase(), { type: "tag" });
```

```html
{% uppercase user.name %}
```

The third argument is an object with different properties:

| Name    | Description                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------- |
| `type`  | The type of helper. It can be `tag`, `filter` or any other, depending on the template engine.  |
| `async` | Set `true` to configure as async helper                                                        |
| `body`  | Set `true` to configure that the helper accept a body (supported only by nunjucks custom tags) |

Example of custom tag with body:

```js
site.helper("uppercase", (body) => body.toUpperCase(), {
  type: "tag",
  body: "true",
});
```

Now the tag includes a body:

```html
{% uppercase %}
Hello, {{ user.name }}
{% enduppercase %}
```

Note: The function `filter` is just a shortcut of `helper` with some
configurations:

```js
// This:
site.filter("uppercase", (text) => text.toUpperCase());

// is equivalent to:
site.helper("uppercase", (text) => text.toUpperCase(), { type: "filter" });
```
