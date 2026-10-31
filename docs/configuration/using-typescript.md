---
title: Using TypeScript
description: How to use Lume with TypeScript
order: 6
---

Lume is built on top of Node v24, so it has native support for
[TypeScript](https://www.typescriptlang.org/) and comes with built-in types for
core features and plugins. The file `tsconfig.json` is similar to this.

```json
{
  "compilerOptions": {
    "moduleResolution": "NodeNext",
    "module": "NodeNext",
    "jsx": "react-jsx",
    "jsxImportSource": "@lumeland/ssx",
    "allowImportingTsExtensions": true,
    "rewriteRelativeImportExtensions": true,
    "erasableSyntaxOnly": true,
  },
}
```

- The `jsxImportSource` entry configures `@lumeland/ssx` as the library to compile JSX, TSX and MDX files. It's a library created specially for static sites.
- `allowImportingTsExtensions` allows to import files using their extensions, which is more standard and adds compatibility with sites build with Deno that requires the extension.
- `rewriteRelativeImportExtensions` is required by TypeScript when `allowImportingTsExtensions` is enabled.
- `erasableSyntaxOnly` configures TypeScript to only allow syntax not requiring runtime semantics, which is the mode supported natively by Node.

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

Extend the `Lume.GlobalData` interface to provide types for all pages. For
example, add the following code to your `_config.ts`:

<lume-code>

```ts {title="_config.ts"}
declare global {
  namespace Lume {
    export interface GlobalData {
      title: string;
      author: {
        name: string;
        email: string;
      };
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
      <p>By {author.name} ({author.email})</p>
    </header>
  );
};
```

</lume-code>

## Strict types

By default, any undeclared property of `Lume.Data` has the `any` type:

```ts
export default (data: Lume.Data, filters: Lume.Helpers) => {
  data.foo; // any
};
```

You can configure Lume to use strict types and apply `unknown` to all unknown
properties. Just add the `strict: true` property to the `Lume.TypeConfig`
interface:

<lume-code>

```ts {title="_config.ts"}
declare global {
  namespace Lume {
    export interface TypeConfig {
      strict: true;
    }
  }
}
```

</lume-code>

```ts
export default (data: Lume.Data, filters: Lume.Helpers) => {
  data.foo; // unknown
};
```
