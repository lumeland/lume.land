---
title: Ignore files
description: Configure Lume to ignore some files and folders.
order: 2
---

Lume loads all files with known extensions like `.md`, `.vto`,
`.page.{js,ts,json}`. Files and directories starting with `.` or `_` are
automatically ignored. Use the `ignore()` function to ignore other files and
folders in your `src` folder:

```js
site.ignore("README.md", "CHANGELOG.md");
```

> [!tip]
>
> One quick way to make Lume ignore a file or folder is by prepending `_` to the
> name. For example, renaming the folder `./private` to `./_private`.

## Paths ignored by default

The following paths are **always ignored**, so you don't need to configure them:

- ./node_modules
- ./import_map.json
- ./deno.json
- ./deno.jsonc
- ./deno.lock
- *.d.ts

## Ignore function

You can use functions for more advanced filtering. Example:

```js
// Ignore all files with ".md" extension inside the "draft" folder
site.ignore((path) => {
  return path.match(/^\/draft\/.*\.md$/) !== null;
});
```

## Draft files

Pages with the `draft` value set to `true` are ignored by Lume unless the
environment variable `LUME_DRAFTS` is set to `true`.

## Adding ignored files

If you have a file or folder starting with `_` but don't want to ignore it, use
the [`site.add()`](./add-files.md) function.

```js
site.add("/_posts"); // The _posts folder is not ignored
```
