---
title: Shared data
description: Add custom data that can be shared by all pages in a directory
order: 5
---

${toc}

In addition to the variables defined in the pages and layouts, you can store
data accessible by some or all pages. Shared data must be saved in the `_data`
directory or `_data.*` files with extensions like `.json`, `.yaml`, `.js` or
`.ts`.

The formats `.json` and `.yaml` are useful for static data. `.js` and `.ts` fit
better for dynamic data (for example, data fetch from a API or a database):

<lume-code>

```json { title=_data.json }
{
  "people": [
    {
      "name": "Oscar Otero",
      "color": "black",
    },
    {
      "name": "Laura Rubio",
      "color": "blue",
    },
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

## The `_data.*` files

Any file named as `_data.*` is loaded and its content is accessible by all pages
in the same directory or subdirectory.

```sh
├── _data.yaml      # Data shared with all pages
├── index.md
└── documentation
    └── _data.json  # Shared with pages in this directory and subdirectories
    └── doc1.md
    └── doc2.md
    └── examples
        └── _data.json  # Shared with pages in this directory and subdirectories
        └── example1.md
        └── example2.md
```

As you can see, the shared data is propagated in cascade following the directory
structure. A typical use case is to store those variables that are common to all
pages in the same directory so you don't have to repeat it for every page.

## The `_data` directories

`_data` directories are similar to `_data` files, but instead of using only one
file, the data is stored in several files inside that directory. The _basename_
of each file determines the variable name used to access to the data. Let's see
an example:

```txt
└── _data
    └── users.json
    └── documents
        └── one.js
        └── two.js
        └── three.js
```

In this example, the data stored in the file `_/data/users.json` can be accessed
via `users` variable and documents via `documents.one`, `documents.two` and
`documents.three`. To use this data in your pages:

<lume-code>

```html {title="page.njk"}
<h2>Documents</h2>

<ul>
{% for doc in documents %}
  <li>
      {{ doc.title }}
  </li>
{% endfor %}
</ul>
```

```jsx {title="page.jsx"}
export default function ({ documents }) {
  return <>
    <h2>Documents</h2>

    <ul>
    { documents.map((doc) => <li>{ doc.title }</li>) }
    </ul>
  </>;
}
```

</lume-code>

Like `_data.*` files, you can have `_data` directories in different directories
so they are shared only with all pages in the same directory or subdirectories.
