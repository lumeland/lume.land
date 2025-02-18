---
title: Basename parsers
description: Parse file basenames to extract extra data
order: 10
---

When Lume is scanning the source folder, it can automatically extract some info
from the basename of files (the filename after removing the extension) and
folders.

For example, let's say you want to create the variable `order` to sort pages in
a menu. A way to make this variable explicit is to save your pages with the
`[order].` prefix:

```txt
.
├── 1.welcome.md
├── 2.introduction.md
├── 3.the-basics.md
└── 4.advanced.md
```

One of the advantages of making this variable explicit in the filesystem is that
you can see the source files sorted the same way in your editor as well as on
the final site.

In Lume, the filename is used by default to generate the final URLs
([more info](../creating-pages/page-files.md)), so the page files above
generates the following URLs:

```txt
/1.welcome/
/2.introduction/
/3.the-basics/
/4.advanced/
```

That could work, but what we really want is to remove the order prefix and store
it in the page data. To do that, we can register a basename parser using the
function `site.parseBasename` in our _config.ts file:

<lume-code>

```js {title=_config.ts}
site.parseBasename((basename) => {
  // Regexp to detect the order pattern
  const match = basename.match(/(\d+)\.(.+)/);

  if (match) {
    const [, order, basename] = match;

    // Return the order value and the new basename without the prefix
    return {
      order: parseInt(order),
      basename,
    };
  }
});
```

</lume-code>

As you can see, the function is simple: it receives the basename and, if the
basename matches the regular expression, it return an object with the parsed
values. Note that the returned object contains the `basename` key with the
original basename but without the prefix, that will be used to generate the
final URL.

If the basename doesn't match the regular expression, it doesn't return
anything, so nothing will be changed.

> [!note]
>
> The object returned by the basename parser will be merged later with the page
> data (a.k.a. the front matter). **The front matter can override a variable
> defined in the basename parser.**

The `parseBasename` function is used for both files and folders. This allows
extracting values from a folder name and storing them as
[shared data](../creating-pages/shared-data.md), so they are available to all
pages inside.

## Extract dates

Lume, by default, is configured with a basename parser to extract dates from
filenames. See [page dates](../creating-pages/page-files.md#page-date) for more
info.
