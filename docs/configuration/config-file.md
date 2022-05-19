---
title: The _config file
description: How to create a configuration file to customize Lume
order: 1
---

${toc}

**Lume** has a default behaviour that is enough for simple cases, but if you
want to copy or process additional files, use plugins or change some default
settings, you must create a configuration file.

The configuration file is a `_config.ts` or `_config.js`, saved in the site's
root directory, which you can create yourself or with the following command:

```sh
lume init
```

It's a JavaScript/TypeScript module that exports a Lume instance. The minimal
required code is:

```js
import lume from "lume/mod.ts";

const site = lume();

export default site;
```

The `lume()` function create a new instance of Lume, used to build your site.
This function accepts an object with the following configuration values:

## Basic options

### src

This is the directory of the sources of your site. All files needed to build
your site must be here. Files and folders outside this directory won't be
included in your site. It's relative to `cwd` and by default it's `.` (the same
directory), but some people prefer to store the source files in a subfolder like
`src`.

```ts
const site = lume({
  src: "./src",
});
```

You can override the value from the CLI with `--src`, useful if you have
different sites in the same directory. For example: `lume --src=./src` {.tip}

### dest

This is the folder to export the generated site. It's relative to `cwd` and by
default is `_site`.

```ts
const site = lume({
  dest: "./output",
});
```

You can override the value from the CLI with `--dest`, useful if you want to
generate the site without override the previous one. For example:
`lume --dest=./output` { .tip }

### location

This is the public URL where the site will be published. Useful to generate
absolute URLs or if your site is published in a subdirectory, for example:
`https://username.github.io/project-name/`. The value must be an
[URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), for
example:

```ts
const site = lume({
  location: new URL("https://example.com"),
});
```

This value is ignored by the local server (started with `lume --serve`), that
always use `http://localhost:3000` (or the defined port if you change it).

You can override the value from the CLI with `--location`, useful if you want to
build and deploy the site to different locations. For example:
`lume --location=https://my-site.com/blog/` { .tip }

### dev

Set `true` to build the site in development mode (by default is `false`). The
only difference is that pages with the value `draft: true` will be included in
the build (otherwise, they would be ignored). This value can be used also to
load or configure plugins depending on the environment. For example: minify the
JavaScript code only in production mode.

```ts
const site = lume({
  dev: true,
});

if (site.options.dev) {
  // Custom dev configuration
}
```

You can override the value from the CLI, with `lume --dev` {.tip}

### prettyUrls

By default it's enabled and generate pretty URLs, for example `/about-us/`
instead of `/about-us.html`. Set `false` to disable it.

```ts
const site = lume({
  prettyUrls: false, // Disable pretty urls
});
```

The string value `no-html-extension` allows to save the files as
`/about-us.html` but generate the urls without extension extension
(`/about-us`).

## Server options

The `server` key contains the configuration for the local server. It has the
following options:

### port

By default the local server use the port `3000`. Use this option to set a
different port.

```ts
const site = lume({
  server: {
    port: 8000,
  },
});
```

This value can be overrided from CLI with `--port`. For example:
`lume --serve --port=8888` {.tip}

### page404

This option allows to configure the HTML page to display for 404 errors. By
default is `/404.html`. If you are building a SPA with dynamic urls, you may
want to change it to `/index.html`.

```ts
const site = lume({
  server: {
    page404: "./not-found.html",
  },
});
```

### open

Set `true` to automatically open the generated site in your default web browser
after starting the local web server.

```ts
const site = lume({
  server: {
    open: true,
  },
});
```

This value can be set from CLI with `--open` or `-o`. For example:
`lume --serve --open` {.tip}

## Watcher options

The `watcher` key contains an object to configure the file watcher, used to
watch file changes with `lume --serve` and `lume --watch`.

- **debounce:** The debounce interval (in milliseconds). By default is `100`.
- **ignore:** An array of paths that the watcher will ignore.

```ts
const site = lume({
  watcher: {
    debounce: 10,
    ignore: [
      "./ignored-folder/",
      "./ignored-file.txt",
    ],
  },
});
```

There are some files and directories that are automatically ignored, for example
`.git`, `.DS_Store` or the `dest` directory. {.tip}

## Components options

The `components` object allows to configure the components load and output
files.

- **directory:** The directory where the components files are stored.
- **variable:** The variable name used to access to the loaded components.
- **cssFile:** The file name to export the CSS code of the components.
- **jsFile:** The file name to export the JS code of the components.

```js
import lume from "lume/mod.ts";

const site = lume({
  components: {
    directory: "/_components",
    variable: "comp",
    cssFile: "/components.css",
    jsFile: "/components.js",
  },
});

export default site;
```
