---
title: Using TypeScript
description: How to use Lume with TypeScript
order: 6
---

Lume is built on top of Deno so it has native support for
[TypeScript](https://www.typescriptlang.org/) and comes with built-in types for
core features and plugins. It also creates the `deno.json` file importing the Lume types using the
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

### TSX pages

To create pages and layouts with TSX, you can either use the Lume
[JSX](/plugins/jsx/) ([React](https://reactjs.org/)) or
[JSX Preact](/plugins/jsx_preact/) ([Preact](https://preactjs.com/)) plugins.

## TypeScript in Templates

`Lume` global namespace has the `Lume.Data` and `Lume.Helpers` interfaces that you can use in your pages. For example:

<lume-code>

```ts {title="index.tsx"}
export default (data: Lume.Data, filters: Lume.Helpers) => {
  const { title, date } = data;

  return (
    <header>
      <h1>{title}</h1>
      <time>{filters.date(date)}</time>
    </header>
  );
};
```

</lume-code>

Or extend the interface with your own types, for example:

<lume-code>

```ts {title="custom.tsx"}
  // Your own interface
interface MyData {
  description?: string;
}

export default (data: MyData & Lume.Data, filters: Lume.Helpers) => {
  const { title, date, description } = data;

  return (
    <header>
      <h1>{title}</h1>
      <time>{filters.date(date)}</time>
      {description}
    </header>
  );
};
```

</lume-code>
