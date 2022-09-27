---
title: Using TypeScript
description: How to use Lume with TypeScript
order: 6
---

Lume is built on top of Deno so it has native support for
[TypeScript](https://www.typescriptlang.org/) and comes with built-in types for
core features and plugins.

## Getting Started with TypeScript

Running `lume init`(see
[installation](/docs/overview/installation/#install-lume-globally-on-your-computer)),
you will be asked to use TypeScript:

```shell
Use TypeScript for the configuration file? [y/N]
```

When confirmed, Lume will automatically create a `_config.ts` file in your
project. You're now ready to start creating files using `.ts` and `.tsx`
extension.

### JSX Plugins

To create pages and layouts with JSX, you can either use the Lume
[JSX](/plugins/jsx/) ([React](https://reactjs.org/)) or
[JSX Preact](/plugins/jsx_preact/) ([Preact](https://preactjs.com/)) plugin.

### IDE Support

- Using [Visual Studio Code](https://code.visualstudio.com/), it's highly
  recommended installing the
  [Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
- Additionally [configure](https://lint.deno.land/) and enable Deno's built-in
  [code linter](https://deno.land/manual@v1.25.1/tools/linter).

## TypeScript configuration

TypeScript in Deno comes with a lot of different options, but works out of the
box. If you want to specify
[compiler options](https://deno.land/manual@v1.25.1/typescript/configuration#how-deno-uses-a-configuration-file),
the recommended way is to use `compilerOptions` within the projects `deno.json`
or `deno.jsonc` file.

[Go to Overview of TypeScript in Deno](https://deno.land/manual@v1.25.1/typescript/overview)
for more info. {.tip}

### JSX Plugin configuration

We recommend configuring the JSX import source using an import map.

[Go to Using an import map](https://deno.land/manual@v1.25.1/jsx_dom/jsx#using-an-import-map)
for more info about using JSX in Deno. {.tip}

#### Example configurations

Example configuration using Lume with TypeScript and [JSX](/plugins/jsx/)
(React) plugin.

<lume-code>

```json {title="deno.json"}
{
  "importMap": "import_map.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

```json {title="import_map.json"}
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.11.4/",
    "react/jsx-runtime": "https://deno.land/x/lume@v1.11.4/deps/react_runtime.ts"
  }
}
```

</lume-code>

Example configuration using Lume with TypeScript and
[JSX Preact](/plugins/jsx_preact/) plugin.

<lume-code>

```json {title="deno.json"}
{
  "importMap": "import_map.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

```json {title="import_map.json"}
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.11.4/",
    "preact/jsx-runtime": "https://deno.land/x/lume@v1.11.4/deps/preact_runtime.ts"
  }
}
```

</lume-code>

## TypeScript in Templates

You can import, use and extend Lume's built-in types, within your TypeScript
files. For the most common use case these are the following `interfaces`.

```ts
// Page specific interfaces
import type { Page, PageData } from "lume/core.ts";

// Helper function specific interface
import type { PageHelpers } from "lume/core.ts";
```

[Go to source code](https://github.com/lumeland/lume/blob/master/core.ts) for
more info about the `PageData` interface. {.tip}

### Extending Lume's Types

To use custom types with Lume, extend the existing interfaces with custom
defined properties.

<lume-code>

```ts {title="types.ts"}
import type { Page, PageData } from "lume/core.ts";

// To handle all types in one place, use re-export
export type { PageHelpers } from "lume/core.ts";

// Example interface for `custom.tsx` PageData
export interface CustomPageData extends PageData {
  // Define your own properties
  readingTime?: string;
}

// Create a new interface for `custom.tsx`
export interface CustomPage extends Page {
  data: CustomPageData;
}
```

</lume-code>

Example of using the custom types in your template files.

<lume-code>

```ts {title="custom.tsx"}
import type { CustomPageData, PageHelpers } from "./types.ts";

// TypeScript is aware of `readingTime`
export default (
  { children, date, readingTime, title }: CustomPageData, 
  filters: PageHelpers) => {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <time dateTime={filters.date(date, "DATE")}>
          {filters.date(date, "HUMAN_DATE")}
        </time>
        <span>{readingTime?}</span>
      </header>
      {children}
    </article>
  );
};
```

</lume-code>

To overwrite the default `Page | Page[]` interface, assign your custom interface
when dealing with type `Page` e.g.
`search.pages("type=post", "date=desc") as CustomPage[]`. {.tip}
