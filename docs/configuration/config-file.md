---
title: The _config file
description: How to use the configuration file to customize Lume
order: 1
---

${toc}

The configuration file is the `_config.ts` or `_config.js`, saved in the site's
root directory. If you don't have it yet,
[see Installation documentation](../overview/installation.md) to know how to
create it.

The minimal required code is:

```js
import lume from "lume/mod.ts";

const site = lume();

export default site;
```

The `lume()` function creates a new instance of Lume and export it. This
function accepts an object with the following configuration values:

## Basic options

### src

This is the directory containing the source files of your site. All files needed
to build your site must be here. Files and folders outside this directory won't
be included in your site. It's relative to `cwd` and by default it's `.` (the
same directory), but some people prefer to store the source files in a subfolder
like `src`.

```ts
const site = lume({
  src: "./src",
});
```

You can override the value from the CLI with `--src`, useful if you have
different sites in the same directory. For example: `deno task lume --src=./src`
{.tip}

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
`deno task lume --dest=./output` { .tip }

### location

This is the public URL of the site. It's useful to generate absolute URLs or fix
the relative urls if your site is published under a subdirectory, for example:
`https://example.com/project-name/`. It only accepts an
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
`deno task lume --location=https://my-site.com/blog/` { .tip }

### prettyUrls

By default it's enabled and generate pretty URLs, for example `/about-us/`
instead of `/about-us.html`. Set `false` to disable it.

```ts
const site = lume({
  prettyUrls: false, // Disable pretty urls
});
```

It also accepts the string value `no-html-extension` to save the files as
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
`deno task lume --serve --port=8888` {.tip}

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
`deno task lume --serve --open` {.tip}

### middlewares

Use this option to add middlewares to the local web server. There are some
middlewares for common needs at `lume/middlewares/*`, but you can create custom
middlewares easily. More info in the
[Server documentation](../core/server.md#middlewares).

```ts
import expires from "lume/middlewares/expires.ts";

const site = lume({
  server: {
    middlewares: [
      expires(),
    ],
  },
});
```

## Watcher options

The `watcher` key contains an object to configure the file watcher, used to
watch file changes with `lume --serve` and `lume --watch`.

- **debounce:** The debounce interval (in milliseconds). By default is `100`.
- **ignore:** An array of strings or functions to filter paths ignored by the
  watcher.

```ts
const site = lume({
  watcher: {
    debounce: 10,
    ignore: [
      "./ignored-folder/",
      "./ignored-file.txt",
      (path) => path.endsWith(".foo"), // ignore extension
    ],
  },
});
```

There are some files and directories that are automatically ignored by the
watcher, like `.git` or `.DS_Store`. {.tip}

## Components options

The `components` object allows to configure the components load and output
files.

- **variable:** The variable name used to access to the loaded components.
- **cssFile:** The file name to export the CSS code of the components.
- **jsFile:** The file name to export the JS code of the components.

```js
import lume from "lume/mod.ts";

const site = lume({
  components: {
    variable: "comp",
    cssFile: "/components.css",
    jsFile: "/components.js",
  },
});

export default site;
```
