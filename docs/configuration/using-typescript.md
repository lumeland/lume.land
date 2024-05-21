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
project. You're now ready to start creating files using the `.ts` and `.tsx`
extensions.

Lume also creates the `deno.json` file importing the Lume types using the
`compilerOptions.types` array.

```json
{
  "imports": {
    "lume/": "https://deno.land/x/lume/"
  },
  "tasks": {
    "lume": "echo \"import 'lume/cli.ts'\" | deno run -A -",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  },
  "compilerOptions": {
    "types": [
      "lume/types.ts"
    ]
  }
}
```

The `lume/types.ts` file exposes the global namespace `Lume` that you can use in
your TypeScript files.

> [!note]
>
> [Go to Overview of TypeScript in Deno](https://docs.deno.com/runtime/manual/advanced/typescript/overview)
> for more info.

### JSX Plugins

To create pages and layouts with JSX, you can either use the Lume
[JSX](/plugins/jsx/) ([React](https://reactjs.org/)) or
[JSX Preact](/plugins/jsx_preact/) ([Preact](https://preactjs.com/)) plugins.

### IDE Support

- Using [Visual Studio Code](https://code.visualstudio.com/), it's highly
  recommended to install the
  [Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
- Additionally, [configure](https://lint.deno.land/) and enable Deno's built-in
  [code linter](https://deno.land/manual@v1.25.1/tools/linter).

## TypeScript in Templates

Example of using the custom types in your template files.

<lume-code>

```ts {title="custom.tsx"}
interface CustomPageData extends Lume.PageData {
  // Define your own properties
  readingTime?: string;
}

export default (
  { children, date, readingTime, title }: CustomPageData, 
  filters: Lume.PageFilters
  ) => {
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
