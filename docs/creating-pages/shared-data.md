---
title: Shared data
description: Add custom data shared by all pages in a directory
order: 5
---

In addition to the variables defined in the pages and layouts, you can store
data accessible by some or all pages. Shared data must be saved in the `_data`
directory or `_data.*` files with extensions like `.json`, `.yaml`, `.js` or
`.ts`.

`.json` and `.yaml` files are useful for static data, while `.js` and `.ts` fit
better for dynamic data (such as data fetched from an API or a database):

<lume-code>

```json { title=_data.json }
{
  "people": [
    {
      "name": "Oscar Otero",
      "color": "black"
    },
    {
      "name": "Laura Rubio",
      "color": "blue"
    }
  ]
}
```

```yml { title=_data.yml }
people:
  - name: Oscar Otero
    color: black

  - name: Laura Rubio
    color: blue
```

```ts { title=_data.ts }
import { db } from "./database.ts";

const people = db.query("select name, color from people");

export { people };
```

</lume-code>

## `_data.*` files

Any file named `_data.*` is loaded and its content is accessible by all pages in
the same directory or subdirectory.

```{.pele}
treeView-beta
src/
├── _data.yaml :::highlight      ## -> Data shared with all pages
├── index.md
└── documentation/
    └── _data.json :::highlight  ## -> Shared with pages in this folder and nested
    └── doc1.md
    └── doc2.md
    └── examples/
        └── _data.json :::highlight  ## -> Shared with pages in this folder and nested
        └── example1.md
        └── example2.md
```

As you can see, the shared data is propagated through the directory structure. A
typical use case is to store variables that are common to all pages in the same
directory, so you don't have to include it on every page.

## The `_data` directories

`_data` directories are similar to `_data` files, but instead of using only one
file, the data is stored in several files inside that directory. The _basename_
of each file determines the variable name used to access the data. Let's see an
example:

```{.pele}
treeView-beta
_data/
    └── users.json ## -> users
    └── documents/
        └── one.js ## -> documents.one
        └── two.js ## -> documents.two
        └── three.js ## -> documents.three
```

In this example, the data stored in the file `_data/users.json` can be accessed
via `users` variable and documents via `documents.one`, `documents.two` and
`documents.three`. To use this data in your pages:

<lume-code>

```vento {title="page.vto"}
<h2>Documents</h2>

<ul>
{{ for doc of documents }}
  <li>
    {{ doc.title }}
  </li>
{{ /for }}
</ul>
```

```jsx {title="page.jsx"}
export default function ({ documents }) {
  return (
    <>
      <h2>Documents</h2>

      <ul>
        {Object.values(documents).map((doc) => <li>{doc.title}</li>)}
      </ul>
    </>
  );
}
```

</lume-code>

Like `_data.*` files, you can have `_data` directories in different locations so
they are shared only with pages in the same directory or subdirectories.
