---
title: Order of operations
description: What does Lume do to build your site?
---

This is a high-level description of how Lume builds your site. When you run
`lume`, the following operations are executed in this order:

1. Dispatch the [event](../core/events.md) `beforeBuild`.
2. Ensure the `dest` folder is empty (unless
   [`emptyDest` is disabled](../configuration/config-file.md#emptydest)).
3. Walk the `src` folder recursively and build a tree with all files and
   folders. The files [loaded remotely](../core/remote-files.md) are also added.
4. Dispatch the [event](../core/events.md) `afterLoad`.
5. Walk the tree recursively and load all files matching with a valid file
   extension, like `.md`, `.vto`, etc.
   - Skip files and folders starting with `_`, `.` or ignored with
     `site.ignore()`.
   - If the file
     [must be copied statically](../configuration/copy-static-files.md),
     calculate the source and destination paths.
   - If the name of the file is `_data` or is inside a `_data` folder, is shared
     data.
   - If the file is inside a `_components` folder, it is a component.
   - If it has a known extension, it's a page.
   - Otherwise, ignore it (or copy it if
     [`copyRemainingFiles`](../configuration/copy-static-files.md#copy-remaining-files)
     is enabled).
6. Dispatch the [event](../core/events.md) `beforeRender`.
7. Group all pages by [`renderOrder` value](../core/render-order.md) and sort
   them.
8. For each group of pages with the same `renderOrder`:
   - If the [page content is a generator](../core/searching.md#pagination),
     generate all the sub-pages.
   - Calculate the [final url](../creating-pages/urls.md).
   - Run the [preprocessors](../core/processors.md#preprocess) registered.
   - Render the page using the assigned
     [template engine](../core/multiple-template-engines.md) and
     [layout](../creating-pages/layouts.md).
9. Dispatch the [event](../core/events.md) `afterRender`.
10. Run the [processors](../core/processors.md) registered
11. Dispatch the [event](../core/events.md) `beforeSave`.
12. Save all pages to `dest` folder.
13. Dispatch the [event](../core/events.md) `afterBuild`.

## Watch mode

In watch mode (with `lume --serve` or `lume --watch`), the first build is
exactly the same, but the successive changes have some differences:

- The `dest` folder is not emptied.
- Only the files with changes are reloaded.
- Steps 4 to 10 are exactly the same. All pages (not only the modified ones) are
  re-rendered. This is because a change in one file can affect many pages, so we
  have to render all pages again. See
  [scoped updated](../core/scoped-updates.md) to learn how to configure this.
- Only the pages that have changed their content are saved in `dest`.
