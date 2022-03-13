---
title: Imagick
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

## Description

Use the `imagick` plugin to process image files using the
[magick-wasm](https://github.com/dlemstra/magick-wasm) library, a powerful image
manipulation library with support for over 100 major file formats. With this
plugin you can resize, rotate and convert any image to other format.

The plugin reads the data assigned to image files (specifically the `imagick`
key). Unlike other formats like `.md` or `.njk`, the image files (`.png`, `.jpg`
etc) does not contain front matter, so the way to assign data to these pages is
using a `_data` file.

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

## Multiple outputs

With this code, the plugin will resize all images to 200x200 and convert to webp
format. If you need to create multiple versions of the same image file (for
responsive design, for example), use an array of values. Make sure to include
the `suffix` key to generate different names of the output files:

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
