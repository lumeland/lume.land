---
title: Picture
description: Create responsive images using the Transform Images plugin
mod: plugins/picture.ts
tags:
  - images
  - optimization
---

## Description

The Picture plugin creates `<picture>` elements, adding all `<source>` as needed
to provide versions in different formats and resolutions for the same image. It
uses the [`transform_images` plugin](./transform_images.md) under the hood to
make the transformations.

## Installation

Import this plugin in your `_config.ts` file to use it and register it before
`transform_images`:

```js
import lume from "lume/mod.ts";
import picture from "lume/plugins/picture.ts";
import transformImages from "lume/plugins/transform_images.ts";

const site = lume();

site.use(picture(/* Options */));
site.use(transformImages());

export default site;
```

## Example

Create an `<img>` element with the `transform-images` attribute containing all
the desired formats and sizes for the image:

```html
<img src="/flowers.jpg" transform-images="avif webp jpg 300@2" />
```

The `transform-images` attribute of this image contains the formats (`avif`,
`webp`, `jpg`) and the different sizes (300 which means 300 pixels). The @2
suffix indicates that this size should support also the 2x resolution. The
output HTML code is:

```html
<picture>
  <source
    srcset="/flowers-300w.avif, /flowers-300w@2.avif 2x"
    type="image/avif"
  />
  <source
    srcset="/flowers-300w.webp, /flowers-300w@2.webp 2x"
    type="image/webp"
  />
  <img src="/flowers-300w.jpg" srcset="/flowers-300w@2.jpg 2x" />
</picture>
```

The plugin not only generates the HTML code but also send to the
`transform_images` plugin the configuration to generate all these images.

## Configuring the img container

If the `transform-images` attribute is assigned to a HTML element that is not an
image, the plugin will search for all `img` elements found inside that element.
This is useful if you don't want to include this attribute in every `<img>`
element, because you want to avoid repetition if all images has the same
configuration, or the html content is generated from markdown content that you
want to keep clean.

```html
<div transform-images="avif webp jpg 300@2">
  <!-- All images inside will be transformed -->
  <img src="/flowers.jpg" />

  <!-- You can override the value for a specific image -->
  <img src="/flowers.jpg" transform-images="avif jpg 600" />

  <!-- This one is not tranformed because the value is empty -->
  <img src="/flowers.jpg" transform-images="" />
</div>
```
