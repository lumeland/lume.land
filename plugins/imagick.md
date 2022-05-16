---
title: Imagick
docs: plugins/imagick.ts/~/Options
description: Image manipulation using Imagick
tags:
  - images
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import imagick from "lume/plugins/imagick.ts";

const site = lume();

site.use(imagick());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/imagick.ts/~/Options).

## Description

Use the `imagick` plugin to process image files using the
[magick-wasm](https://github.com/dlemstra/magick-wasm) library, a powerful image
manipulation library with support for over 100 major file formats. With this
plugin you can resize, rotate and convert any image to other format.

The plugin read the data assigned to the image files (specifically the `imagick`
key) to know how to transform the image.

## Example

Create a `/img` folder in your project to store the images and a `_data.yml`
file inside this folder with the following code:

<lume-code>

```yml { title="/img/_data.yml" }
imagick:
  resize: [200, 200]
  format: webp
```

</lume-code>

This file assigns this data to all image pages in this folder and subfolders
(see [Shared data](../docs/creating-pages/shared-data.md) for more info about
`_data` files). The plugin will read the data, resize all images to 200x200 and
convert them to webp format.

## Multiple outputs

If you need to create multiple versions of the same image file (for responsive
design, for example), use an array of values. Make sure to include the `suffix`
key to generate different names of the output files:

<lume-code>

```yml { title="/img/_data.yml" }
imagick:
  - resize: [200, 200]
    suffix: -small
    format: webp
  - resize: [1000, 1000]
    format: webp
  - resize: [2000, 2000]
    suffix: -big
    format: webp
```

</lume-code>

This code generate three files for every image file. For example, if the input
file is `background.jpg`, it will generate the files `background.webp`,
`background-small.webp` and `background-big.webp`.

## Custom functions

By default, the following functions are available:

- resize
- crop
- blur
- sharpen
- rotate
- autoOrient

You can add more custom functions in the `_config` file. For example:

```js
import lume from "lume/mod.ts";
import imagick from "lume/plugins/imagick.ts";

const site = lume();

site.use(imagick({
  functions: {
    resizeBlur(img, size) {
      img.resize(size, size);
      img.blur(10, 5);
    },
  },
}));

export default site;
```

Now you can use this function in your _data files:

```yml { title="/img/_data.yml" }
imagick:
  resizeBlur: 20
  format: webp
```

## Cache

This plugin save the transformed images in the `_cache` folder to improve the
build speed. If you want to disable the cache, set this option to `false`.

```js
import lume from "lume/mod.ts";
import imagick from "lume/plugins/imagick.ts";

const site = lume();

site.use(imagick({
  cache: false, // Disable cache
}));

export default site;
```

This option allows to customize the cache folder. For example:
`cache: "_imagick-cache"`.
