---
title: Order of operations
description: What does Lume do to build your site?
---

This is a high level description of how Lume build your site. When you run
`lume`, the following operations are executed in this order:

1. Dispatch the [event](../core/events.md) `beforeBuild`.
2. Ensure the `dest` folder is empty.
3. Walk the `src` folder recursively and load all files matching with a valid
   file extension, like `.md`, `.njk`, etc.
   - Skip files and folders starting with `_`, `.` or ignored with
     `site.ignore()`.
   - If the file
     [`must be copies staticaly`](../configuration/copy-static-files.md),
     calculate the source and destination paths.
   - If the name of the file is `_data` or is inside a `_data` folder, is shared
     data.
   - If it has a known extension, it's a page.
   - Otherwise, ignore it.
4. Dispatch the [event](../core/events.md) `beforeRender`.
5. Group all pages by [`renderOrder` value](../core/render-order.md) and sort
   them.
6. For each group of pages with the same `renderOrder`:
   - If the [page content is a generator](../core/searching.md#pagination),
     generate all the sub-pages.
   - Calculate the [final url](../creating-pages/urls.md).
   - Run the [preprocessors](../core/processors.md#preprocess) registered.
   - Render the page using the assigned
     [template engine](../core/multiple-template-engines.md) and
     [layout](../creating-pages/layouts.md).
7. Dispatch the [event](../core/events.md) `afterRender`.
8. Run the [processors](../core/processors.md) registered
9. Dispatch the [event](../core/events.md) `beforeSave`.
10. Save all pages to `dest` folder.
11. Dispatch the [event](../core/events.md) `afterBuild`.

## Watch mode

In watch mode (with `lume --serve` or `lume --watch`), the first build is
exactly the same, but the succesive changes have some differences:

- The `dest` folder is not emptied.
- Only the files with changes are reloaded.
- The steps 4 to 8 are exactly the same. All pages (not only the modified) are
  re-rendered. This is because a change in one file can affect to many pages, so
  we have to render all pages again.
- Only the pages that have changed its content are saved in `dest`.
