---
title: Command line usage
description: Using the command line interface of Lume
order: 2
---

## Setup Lume CLI on your computer

Lume registers the `lume` binary in your project and the `build` and `serve` scripts.

## Build the site

Run the following to build your website:

<lume-code>

```sh {title="npm"}
npm run build
```

```sh {title="pnpm"}
pnpm build
```

```sh {title="yarn"}
yarn build
```

</lume-code>

This command compiles the source files to HTML and save them into the dest
directory (usually `_site`).

## Start a local server

Typically you will want to start a local server and open the site in your
browser. To do that, use the `serve` script:

<lume-code>

```sh {title="npm"}
npm run serve
```

```sh {title="pnpm"}
pnpm serve
```

```sh {title="yarn"}
yarn serve
```

</lume-code>

This command initializes a **local web server** and starts **watching the
changes** of the source files. If you edit any file, Lume will detect this
change, rebuild the site and refresh your browser automatically. The local
server use the port `3000` by default but you can change it with the `--port`
(or `-p`) argument. For example:

<lume-code>

```sh {title="npm"}
npm run serve -- --port=8000
```

```sh {title="pnpm"}
pnpm serve --port=8000
```

```sh {title="yarn"}
yarn serve --port=8000
```

</lume-code>

To watch changes without starting a local server, use the `--watch` argument:

<lume-code>

```sh {title="npm"}
npm run build -- --watch
```

```sh {title="pnpm"}
pnpm build --watch
```

```sh {title="yarn"}
yarn build --watch
```

</lume-code>

## Debug

Use the `--inspect, -i` flag to start an
[inspect server](https://docs.deno.com/runtime/fundamentals/debugging/). Then,
you can open the `chrome://inspect` URL in any Chromium-based browser and add
breakpoints to debug your code:

```sh
npx lume build --inspect
```

The flag `--dry-run` build the site without writting the output in the disk and
return an error if the build generated any error, which is useful for CI
testing:

<lume-code>

```sh {title="npm"}
npm run build -- --dry-run
```

```sh {title="pnpm"}
pnpm build --dry-run
```

```sh {title="yarn"}
yarn build --dry-run
```

</lume-code>

## Help

Run `npx lume -h` to show all available commands and options.
