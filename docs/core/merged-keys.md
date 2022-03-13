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
├── _data.yaml          # title: Title 1
├── page1.md
└── documents
    └── _data.json      # title: Title 2
    └── page2.md
    └── examples
        └── _data.json  # title: Title 3
        └── page3.md
        └── page4.md    # title: Title 4
```

In this example the `_data.yaml` in the root define the variable `title` with
the value "Title 1". The `page1.md` has this variable because it's in the same
directory as the `_data.yaml` file.

In the `/documents` subfolder we have a `_data.json` file that override the
`title` variable to "Title 2". So the `page2.md` that is in the same directory
will have this variable with the new value.

In `/documents/examples` subfolder, another `_data.json` file overrides the
`title` variable again, so `page3.md` will have this variable with the value
"Title 3". The `page4.md` has the `title` variable in the front matter, so the
final value is "Title 4".

## object mode

You may want to merge some values in a different way. For example let's say we
have a site with the following two data files, one in the root and other in a
subfolder:

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
the variable, including only the author, but not the site title, because the
whole variable is overriden. You can change this behaviour using the special
value `mergedKeys`. This value indicates to Lume how to merge some keys:

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

The `object` merge is not recursive, only works with the properties of the first
level of the object. A recursive option can be added in the future.

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
