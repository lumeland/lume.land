---
title: Deno config
description: Default configuration for Deno by Lume
---

After running `deno run -A https://lume.land/init.ts` to initialize a new Lume
project, the file `deno.json` is created automatically. This file is loaded by
Deno and contains the configuration for Deno tools like tasks, imports, linter,
permissions, etc.

After creating the file, you can edit it to adapt for your needs
([go to deno.com](https://docs.deno.com/runtime/fundamentals/configuration/) for
a complete documentation). This is a simple explanation, especially intended for
people not familiar enough with how Deno works.

The JSON file has the following properties:

## Imports

The `imports` property contains a map with specifiers and the URL to resolve
them:

```json
{
  "imports": {
    "lume/": "@LUME_URL/"
  }
}
```

In this example, we have the `lume/` entry mapped to the URL
`@LUME_URL/`. This allows for importing
Lume with:

```ts
import lume from "lume/mod.ts";
```

and Deno automatically resolves the full URL
(`@LUME_URL/mod.ts`). This makes it pretty
easy to change the version of Lume because you only need to change this URL.
It's even possible to map Lume to a local folder, for debug purposes.

```json
{
  "imports": {
    "lume/": "../my-lume-clone/"
  }
}
```

Lume by default adds also the `lume/jsx-runtime` (required for JSX) and
`lume/cms/` (if you are using LumeCMS). More info about the
[Import map standard](https://html.spec.whatwg.org/multipage/webappapis.html#import-maps).

## Tasks

The `tasks` property defines some commands (known as
[tasks](https://docs.deno.com/runtime/reference/cli/task/)) to be executed with
`deno task [name]`. Lume creates three tasks:

- `lume`: It's the base task used by the other tasks. It runs the `lume/cli.ts`
  module (resolved to the URL defined in the imports).
- `build`: It builds the site for production. The command simply runs `lume`
  task, but the idea is to have a more explicit name (`build` instead of the
  generic `lume`) and having two tasks separated makes it easier to add extra
  flags to the build process without modifying the base task (like a custom
  location, environment variables, etc).
- `serve`: It runs the `lume` task but with the `-s` flag (to start a local
  development server). It's intended for local development.

## Unstable

The `unstable` property enables some Deno features that are disabled by default
[because they are unstable](https://docs.deno.com/runtime/reference/cli/unstable_flags/).
Lume enables `temporal` (to use the
[Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)
global object to work with dates) and `fmt-components` (to format `.vto` files
when you run `deno fmt`).

## Lock

Deno, by default, creates a `deno.lock` file to check external module integrity.
The problem is that this file generates a lot of conflicts, especially when
working with git branches. Another problem is that it doesn't delete old
imports. For example, if you're using Lume 3.1.0 and upgrade to Lume 3.1.1, the
lock file will contain both versions. Lume by default disables the creation of
this file with the property `"lock": false`. Remove this line if you want to
enable it.

## Compiler options

This property configures TypeScript and JSX for Deno. Lume configures JSX to use
`lume` (resolved to `lume/jsx-runtime`) for JSX and MDX files and loads the Lume
types so you can use the `Lume` global namespace.

## Lint

Deno has a
[built-in linter](https://docs.deno.com/runtime/fundamentals/linting_and_formatting/)
that automatically checks your files and detects issues. Lume adds a rule to
check the order of the plugins in the `_config.ts` file to warn about possible
issues (for example, some plugins should be registered before others to prevent
unexpected behaviors). It also disables the `no-import-prefix` (enabled by
default by Deno) because it's
[too aggressive](https://github.com/denoland/deno/issues/30681) and doesn't work
well with HTTP imports.

## Permissions

This property contains
[permissions sets](https://docs.deno.com/runtime/fundamentals/configuration/#permissions)
that can be used with the flag `-P`. For example, the task `lume` has the option
`-P=lume`, to use the `lume` permission set.

By default, the `lume` set grants permissions to read, write (only in the
current folder), access to environment variables, run commands, ffi, and access
to some sys info.

The `import` property limits the domains from where you can import modules
(`jsdelivr.com`, `jsr.io`, `deno.land`, and `esm.sh` by default). To import
modules from other domains, you can add the domain name to this list, or use
`"import": true` if you don't want to delimit the domains.

`net` permissions are granted only for `0.0.0.0` (to create local servers) and
`jsr.io`, `*.jsdelivr.net`, and `npmjs.org` (needed to download dependencies
from JSR and NPM).

Some plugins need to change the permissions to work. For example,
[Google Fonts](../../plugins/google_fonts.md) requires adding the Google CDN to
the `net` property to download the fonts.

Not everybody needs this level of security. If you don't want to deal with
permissions errors, you can allow everything with:

```json
{
  "permissions": {
    "lume": {
      "all": true
    }
  }
}
```
