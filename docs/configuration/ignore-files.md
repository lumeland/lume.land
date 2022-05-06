---
title: Ignore files
description: Configure Lume to ignore some files and folders.
order: 3
---

Use the `ignore()` method to ignore some files and folders of your `src` folder:

```js
site.ignore("README.md", "CHANGELOG.md", "node_modules");
```

By default, all files and directories starting with `.` or `_` are ignored. So
one quick way to make Lume to ignore a file or folder is by prepending `_` to
the name. For example renaming the folder `./projects` to `./_projects`. {.tip}

## Paths ignored by default

The following paths are **always ignored**:

- `node_modules`
- `import_map.json`
- `deno.json`

## Ignore function

Starting from Lume `v1.8.0` you can set functions for more advanced filtering.
Example:

```js
// Ignore all files with ".md" extension inside the "draft" folder
site.ignore((path) => path.match(/^\/draft\/.*\.md$/));
```
