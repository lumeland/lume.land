---
title: Ignore static files
description: How to ignore files and folders by Lume.
order: 3
---

By default, all files and directories starting with `.` or `_` are ignored. So
one quick way to make Lume to ignore a file or folder is by prepending `_` to
the name. For example the folder `projects` renamed to `_projects`.

You can add more files and folders with the `ignore()` method:

```js
site.ignore("README.md", "CHANGELOG.md", "node_modules");
```

## Paths ignored by default

The following paths will be **always ignored**:

- `node_modules`
- `import_map.json`
- `deno.json`
