---
title: Extract order
description: Extract order values from the filenames
mod: plugins/extract_order.ts
category: extract
---

## Description

Sometimes you need to list your pages in a specific order in the menu or indexes
and you want this order is also reflected in the filesystem.

The plugin can detect and extract the order from the name of the source file.
You have to prepend the number to the filename followed by a dot. Note that this
order is removed when generating the final url:

```txt
└── articles
    └── 1.hello-world.md        => /posts/hello-world/index.html
    └── 2.my-second-article.md  => /posts/my-second-article/index.html
```

The order can be defined in folders too, which is works great combined with the
[`nav` plugin](./nav.md).

```txt
└── 1.articles
|   └── 1.hello-world.md        => /posts/hello-world/index.html
|   └── 2.my-second-article.md  => /posts/my-second-article/index.html
└── 2.notes
    └── 1.note-one.md           => /notes/note-one/index.html
    └── 2.note-two.md           => /notes/note-two/index.html
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import extractOrder from "lume/plugins/extract_order.ts";

const site = lume();

site.use(extractOrder(/* Options */));

export default site;
```

## Cascade

By default, the plugin uses the closest value. For example, in the following
structure, the final order of the page is `1` because it's the value assigned to
its filename:

```txt
└── 2.articles
    └── 4.design-and-css
        └── 1.what-is-css.md
```

With the option `cascade` the final order is a combination of all previous order
values:

```js
site.use(extractOrder({
  cascade: true,
}));
```

Now the final order is `020401`. Note that each value is padded with zeros to
ensure it has always two characters. This ensures that the values are correctly
sorted even if they are strings (for example sorting `3` and `12` would result
on `12,3` but `03` and `12` are correctly sorted as `03,12`).
