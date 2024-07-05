---
title: Transform Images
description: Image manipulation plugin using Sharp
mod: plugins/transform_images.ts
tags:
  - images
---

## Description

Use the `transform_images` plugin to process image files using the
[sharp](https://sharp.pixelplumbing.com/) library. With this plugin, you can
resize, rotate, and convert any image to other formats.

The plugin reads the data assigned to the image files (specifically the
`transformImages` key) to know how to transform the image.

> [!note]
>
> This plugin supports the formats `jpeg`, `jp2`, `png`, `webp`, `gif`, `avif`,
> `heif` and `tiff`.
>
> `jxl` is not supported at the moment.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import transformImages from "lume/plugins/transform_images.ts";

const site = lume();

site.use(transformImages(/* Options */));

export default site;
```

## Example

Create a `/img` folder in your project to store the images and a `_data.yml`
file inside this folder with the following code:

<lume-code>

```yml { title="/img/_data.yml" }
transformImages:
  resize: [200, 200]
  format: webp
```

</lume-code>

This file assigns this data to all image pages in this folder and subfolders
(see [Shared data](../docs/creating-pages/shared-data.md) for more info about
`_data` files). The plugin will read the data, resize all images to 200x200, and
convert them to webp format.

To transform the images to 200px width preserving the aspect ratio, use only one
value:

<lume-code>

```yml { title="/img/_data.yml" }
transformImages:
  resize: [200] # Set 200px width, calculate the height automatically
  format: webp
```

</lume-code>

The `format` value can be an array of values, in order to output the same file
configuration to different formats:

<lume-code>

```yml { title="/img/_data.yml" }
transformImages:
  resize: [200, 200]
  format: [webp, jpg]
```

</lume-code>

## Multiple outputs

If you need to create multiple versions of the same image file (for responsive
design, for example), use an array of transforms. Make sure to include the
`suffix` key to generate different names for the output files:

<lume-code>

```yml { title="/img/_data.yml" }
transformImages:
  - resize: [200, 200]
    suffix: -small
    format: [webp, jpg]
  - resize: [1000, 1000]
    format: webp
  - resize: [2000, 2000]
    suffix: -big
    format: webp
```

</lume-code>

This code generates 4 files for every image file (note the first transform with
2 formats). For example, if the input file is `background.png`, it will generate
the files `background.webp`, `background.jpg`, `background-small.webp` and
`background-big.webp`.

## Matches

The property `matches` allows to set a regular expression so the transform is
executed only to these files matching the pattern.

In the following example, the images containing `-cover` will be resized to
1000x1000, and the images containing `-icon` to 100x100.

<lume-code>

```yml { title="/img/_data.yml" }
transformImages:
  - resize: [1000, 1000]
    matches: -cover

  - resize: [100, 100]
    matches: -icon
```

</lume-code>

The `matches` value must be a
[RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
or a valid string that can be used to create a RegExp instance.

## Custom functions

By default, the following functions are available:

- **resize:** Accepts two numbers for `width` and `height` and optionally an
  object with the resize options. See
  [sharp resize api](https://sharp.pixelplumbing.com/api-resize) for more info.
- **blur:** Accepts a number for `sigma`.
- **rotate:** Accepts a number for `degrees`.

You can add more custom functions in the `_config` file. For example:

```js
import lume from "lume/mod.ts";
import transformImages from "lume/plugins/transform_images.ts";

const site = lume();

site.use(transformImages({
  functions: {
    resizeBlur(img, size) {
      img.resize(size, size);
      img.blur(10);
    },
  },
}));

export default site;
```

Now you can use this function in your _data files:

```yml { title="/img/_data.yml" }
transformImages:
  resizeBlur: 20
  format: webp
```

## Cache

This plugin saves the transformed images in the `_cache` folder to improve the
build speed. If you want to disable the cache, set its option to `false`.

```js
import lume from "lume/mod.ts";
import transformImages from "lume/plugins/transform_images.ts";

const site = lume();

site.use(transformImages({
  cache: false, // Disable cache
}));

export default site;
```

This option allows customizing the cache folder. For example:
`cache: "_image-cache"`.
