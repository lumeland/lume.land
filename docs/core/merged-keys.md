---
title: Merged keys
description: Configure how the data is merged
order: 12
---

${toc}

As explained in [Shared data](/docs/creating-pages/shared-data.md), the data
assigned to every page is the result of merging the data directly assigned to
the page (like the front matter) with the data of the parent folders (stored in
the `_data` files and folders).

```txt
├── _data.yaml
├── ...
└── documents
    └── _data.json
    └── ...
    └── examples
        └── _data.json
        └── my-page.md
```

In this example the `/documents/examples/my-page.md` file contains all data from
the page front matter, merged with the data from
`/documents/examples/_data.json`, `documents/_data.json` and `/_data.yaml`
files, **in this order of priority**.

## Object mode merging

On merging variables, **the complete value is overrided**. But you may want to
merge some values in a different way. For example let's say we have the
following two data files, one in the root and other in a subfolder. Both files
have a `site` variable, with different values:

<lume-code>

```yml {title="/_data.yml"}
site:
  title: My humble site
  author: Oscar Otero
```

```yml {title="/subfolder/_data.yml"}
site:
  author: Laura Rubio
```

</lume-code>

All pages in the subfolder (and sub-subfolders) will have the latest version of
the variable, that has the `author` subkey but missing the `title` value,
because the whole variable is overriden. You can change this behaviour using the
special value `mergedKeys`. This value indicates to Lume how to merge some keys:

<lume-code>

```yml {title="/_data.yml"}
mergedKeys:
  site: object

site:
  title: My humble site
  author: Oscar Otero
```

```yml {title="/subfolder/_data.yml"}
site:
  author: Laura Rubio
```

</lume-code>

In this example, we are indicating to Lume that the variable `site` must be
merged using the `object` mode. Now, the result of the variable `site` is an
object including the properties of the parent variable and only override the
properties with the same name. So the result will be something like this:

```yml
site:
  title: My humble site
  author: Laura Rubio
```

The `object` merge mode is not recursive, only works with the first level
properties. A recursive option can be added in the future.

The `mergedKeys` variable is also merged with other `mergedKeys` variables in
subfolders and pages and using always the `object` mode. This means that you can
define this variable in the root `_data` file of the site and override it in
specific subfolders. {.tip}

## array mode

There's another merge mode for arrays. In this mode, the merge result is an
array with all values found in all `_data` levels. For example:

<lume-code>

```yml {title="/_data.yml"}
mergedKeys:
  category: array

category:
  - programming
  - deno
  - javascript
```

```yml {title="/subfolder/_data.yml"}
category: typescript
```

</lume-code>

The result of this merge is:

```yml
category:
  - programming
  - deno
  - javascript
  - typescript
```

It's an array with all values present in all parent `_data` contexts. The result
includes only unique values: if the same value is repeated in different `_data`
contexts, it's included only once in the result.

## stringArray mode

There's a special case in which you want to make sure that all values of the
array are strings. Let's see the following example:

<lume-code>

```yml {title="/_data.yml"}
mergedKeys:
  category: array

category:
  - errors
  - 404
```

```yml {title="/subfolder/_data.yml"}
category: "404"
```

</lume-code>

The result of this merge is:

```yml
category:
  - errors
  - 404
  - "404"
```

As you can see, the value `404` is duplicated, one as a number and other as an
string. To prevent this behavior, you may want to convert all values to string
in order to remove all duplicates. Instead of `array`, use the `stringArray`
mode:

```yml
mergedKeys:
  category: stringArray
```

Now, the result of this merge is:

```yml
category:
  - errors
  - "404"
```

For backward compatibility, Lume assigns the `stringArray` merge mode to the key
`tags` automatically. {.tip}
