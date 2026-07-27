---
title: Using TypeScript
description: How to use Lume with TypeScript
order: 6
---

Lume is built on top of Deno, so it has native support for
[TypeScript](https://www.typescriptlang.org/) and comes with built-in types for
core features and plugins. The file `deno.json` includes the Lume types in the
`compilerOptions.types` array.

```json
{
  "imports": {
    "lume/": "@LUME_URL/"
  },
  "tasks": {
    "lume": "deno run lume/cli.ts",
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

To create pages and layouts with TSX, you can use the Lume [JSX](/plugins/jsx/)
plugin and configure the `deno.json` file:

```jsonc
{
  "imports": {
    "lume/jsx-runtime": "@SSX_URL/jsx-runtime.ts"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "lume"
  }
}
```

## TypeScript in Templates

The `Lume` global namespace has the `Lume.Data` and `Lume.Helpers` interfaces
that you can use in your pages. For example:

<lume-code>

```tsx {title="index.tsx"}
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

You can also extend the interface with additional types, for example:

<lume-code>

```tsx {title="custom.tsx"}
// Custom interface to extend Lume.Data
interface Post {
  title: string;
  description?: string;
}

export default (data: Lume.Data<Post>, filters: Lume.Helpers) => {
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

## Global data

Extend the `Lume.GlobalData` interface to provide types for all pages. For example, add the following code to your `_config.ts`:

<lume-code>

```ts {title="_config.ts"}
declare global {
  namespace Lume {
    export interface GlobalData {
      title: string;
      author: {
        name: string;
        email: string;
      }
    }
  }
}
```

</lume-code>

Now, `Lume.Data` will have the `title` and `author` types everywhere:

<lume-code>

```tsx {title="article.tsx"}
export default (data: Lume.Data, filters: Lume.Helpers) => {
  const { title, author } = data;

  return (
    <header>
      <h1>{title}</h1>
      <p>By { author.name } ({author.email})</p>
    </header>
  );
};
```

</lume-code>

## Strict types

By default, any undeclared property of `Lume.Data` has the `any` type:

```ts
export default (data: Lume.Data, filters: Lume.Helpers) => {
  data.foo // any
};
```

You can configure Lume to use strict types and apply `unknown` to all unknown properties. Just add the `strict: true` property to the `Lume.TypeConfig` interface:

<lume-code>

```ts {title="_config.ts"}
declare global {
  namespace Lume {
    export interface TypeConfig {
      strict: true
    }
  }
}
```

</lume-code>

```ts
export default (data: Lume.Data, filters: Lume.Helpers) => {
  data.foo // unknown
};
