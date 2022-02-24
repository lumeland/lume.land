---
title: Shared data
description: Creating shared data that can be used between different pages
order: 5
---

In addition to the variables defined in the front matter of the pages and
layouts, you can store other data accessible by some or all pages and layouts.
Shared data must be saved in the `_data` directory or `_data.*` files with
extensions like `.json`, `.yaml`, `.js` or `.ts`.

## The `_data.*` files

Any file named as `_data.*` is loaded and its content is accessible by all pages
in the same directory or subdirectory.

```sh
├── _data.yaml      # Data shared with all pages
├── index.md
└── documentation
    └── _data.json  # Shared with pages in this directory or subdirectories
    └── doc1.md
    └── doc2.md
    └── examples
        └── _data.json  # Shared with pages in this directory or subdirectories
        └── example1.md
        └── example2.md
```

As you can see, the shared data is propagated in cascade following the directory
structure. A typical use case is to store those variables that are common to all
pages in the same directory so you don't have to repeat it for every page.

## The `_data` directories

`_data` directories are similar to `_data` files, but instead of using only one
file, the data is stored in several files inside that directory. The _basename_
of each file determines the variable name used to store the data. Let's see an
example:

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
`documents.three`. To use this data in your templates:

```html
<h2>Documents</h2>

<ul>
{% for doc in documents %}
  <li>
      {{ doc.title }}
  </li>
{% endfor %}
</ul>
```

Like `_data.*` files, you can have `_data` directories in different directories
so they are shared only with all pages in the same directory or subdirectories.
