---
title: Order of operations
description: What does Lume do to build your site?
---

```{.pele}
flowchart LR
  subgraph Loading
    Scan[Scan directory]
    LoadPages[Load page files]
    LoadFiles[Load other files to process]
    LoadData[Load _data files]
    LoadComponents[Load _components files]
    StaticFiles[Get static files to copy]
  end
  subgraph Preprocessing
    Preprocess[Preprocess pages and files]
  end
  subgraph Render
    RenderPages[Render pages]
    GeneratorPage[Is a generator]
    NormalPage[Is a regular page]
    GeneratePages[Render generated pages]
  end
  subgraph Processing
    Process[Process pages and files]
  end
  subgraph Output
    Save[Save files in dest]
  end
  Scan --> LoadPages
  Scan --> LoadFiles
  Scan --> LoadData
  Scan --> LoadComponents
  Scan --> StaticFiles
  LoadPages --> Preprocess
  LoadFiles --> Preprocess
  Preprocess --> RenderPages
  LoadData --> RenderPages
  LoadComponents --> RenderPages
  RenderPages --> GeneratorPage
  RenderPages --> NormalPage
  GeneratorPage --> GeneratePages
  GeneratePages --> Process
  NormalPage --> Process
  Process --> Save
  StaticFiles --> Save
```

This is a high-level description of how Lume builds your site. When you run
`lume`, the following operations are executed in this order:

1. Dispatch the `beforeBuild` [event](../core/15.events.md).
2. Ensure the `dest` folder is empty (unless
   [`emptyDest` is disabled](../configuration/config-file.md#emptydest)).
3. Walk the `src` folder recursively and build a tree with all files and
   folders. Any [remote files](../core/11.remote-files.md) are added here.
4. Dispatch the `afterLoad` [event](../core/15.events.md).
5. Walk the tree recursively and load all files matching with a valid file
   extension, like `.md`, `.vto`, etc.
   - Skip files and folders starting with `_`, `.`, or ignored with
     `site.ignore()`.
   - If the name of the file is `_data` or is inside a `_data` folder, it is
     shared data.
   - If the file is inside a `_components` folder, it is a component.
   - If it has a known extension, it's a page.
   - If the file [must be added](../configuration/add-files.md), calculate the
     source and destination paths.
   - Otherwise, ignore it.
6. Dispatch the `beforeRender` [event](../core/15.events.md).
7. Group all pages by [`renderOrder` value](../core/06.render-order.md) and sort
   them.
8. For each group of pages with the same `renderOrder`:
   - If the [page content is a generator](../core/05.searching.md#pagination),
     generate all the sub-pages.
   - Calculate the [final url](../creating-pages/urls.md).
   - Run registered [preprocessors](../core/02.processors.md#preprocess).
   - Render the page file using the assigned
     [template engine](../core/03.multiple-template-engines.md) and store the
     result in the `children` variable.
9. Render all pages using the assigned [layout](../creating-pages/layouts.md).
10. Dispatch the `afterRender` [event](../core/15.events.md).
11. Run registered [processors](../core/02.processors.md).
12. Dispatch the `beforeSave` [event](../core/15.events.md).
13. Save all pages to the `dest` folder.
14. Dispatch the `afterBuild` [event](../core/15.events.md).

## Watch mode

In watch mode (with `lume --serve` or `lume --watch`), the first build is
exactly the same, but any following changes have some differences:

- The `dest` folder is not emptied.
- Only files with changes are reloaded.
- Steps 4 to 10 are exactly the same. All pages (not just the modified ones) are
  re-rendered, because a change in one file can affect many pages, so we have to
  render all pages again. See [scoped updates](../core/13.scoped-updates.md) to
  learn how to configure this.
- All pages that have changed are saved to `dest`.
