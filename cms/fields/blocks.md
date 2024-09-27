---
title: Blocks
description: Field to use Gutenberg blocks
---

The field of type `blocks` is used to store HTML blocks using
[Gutenberg editor](https://wordpress.org/gutenberg/).

> [!note]
>
> This field is **disabled by default** and it's not yet stable.

To enable it:

```ts
import lumeCMS from "lume/cms/mod.ts";
import blocks from "lume/cms/fields/blocks.ts";

const cms = lumeCMS();

// Enable blocks
cms.use(blocks());

export default cms;
```

## Example

```ts
{
  name: "content",
  type: "blocks",
}
```

## Available options

This field only has
[the common options](../configuration/fields.md#common-field-options).
