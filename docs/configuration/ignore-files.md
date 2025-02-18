---
title: Ignore files
description: Configure Lume to ignore some files and folders.
order: 2
---

All files and directories starting with `.` or `_` are automatically ignored by
Lume. Use the `ignore()` method to ignore other files and folders of your `src`
folder:

```js
site.ignore("README.md", "CHANGELOG.md", "node_modules");
```

> [!tip]
>
> One quick way to make Lume ignore a file or folder is by prepending `_` to the
> name. For example, renaming the folder `./projects` to `./_projects`.

## Paths ignored by default

The following paths are **always ignored**, so you don't need to configure them:

- `node_modules`
- `import_map.json`
- `deno.json` / `deno.jsonc`

## Ignore function

Starting from Lume `v1.8.0` you can set functions for more advanced filtering.
Example:

```js
// Ignore all files with ".md" extension inside the "draft" folder
site.ignore((path) => {
  return path.match(/^\/draft\/.*\.md$/) !== null;
});
```

## Draft files

Pages with the `draft` value set to `true` are ignored by Lume unless the
environment variable `LUME_DRAFTS` is set to `true`.
