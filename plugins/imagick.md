---
title: Imagick
docs: plugins/imagick.ts/~/Options
description: Image manipulation using Imagick
tags:
  - images
---

## Description

Use the `imagick` plugin to process image files using the
[magick-wasm](https://github.com/dlemstra/magick-wasm) library, a powerful image
manipulation library with support for over 100 major file formats. With this
plugin, you can resize, rotate, and convert any image to other formats.

The plugin reads the data assigned to the image files (specifically the
`imagick` key) to know how to transform the image.

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
`_data` files). The plugin will read the data, resize all images to 200x200, and
convert them to webp format.

The `format` value can be an array of values, in order to output the same file
configuration to different formats:

<lume-code>

```yml { title="/img/_data.yml" }
imagick:
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
imagick:
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
imagick:
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

- **resize:** Accepts two numbers for `width` and `height` or one number that
  will be used for `with` and `height`.
- **crop:** Accepts two numbers for `width` and `height` or one number that will
  be used for `with` and `height`.
- **blur:** Accepts two numbers for `radius` and `sigma`.
- **sharpen:** Accepts two numbers for `radius` and `sigma`.
- **rotate:** Accepts one number for `degrees`.
- **autoOrient:** No argument is needed.

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

This plugin saves the transformed images in the `_cache` folder to improve the
build speed. If you want to disable the cache, set its option to `false`.

```js
import lume from "lume/mod.ts";
import imagick from "lume/plugins/imagick.ts";

const site = lume();

site.use(imagick({
  cache: false, // Disable cache
}));

export default site;
```

This option allows customizing the cache folder. For example:
`cache: "_imagick-cache"`.
