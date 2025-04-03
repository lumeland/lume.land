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
or generates the
[`srcset` property](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset)
to provide versions in different formats and resolutions for the same image. It
uses the [`transform_images` plugin](./transform_images.md) under the hood to
make the transformations.

## Installation

Import this plugin in your `_config.ts` file to use it and make sure to register
it **exactly** above `transform_images`:

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

The plugin not only generates the HTML code but also sends the configuration to
the `transform_images` plugin to generate all these images.

## Sizes

It's possible to create different sizes. Keep in mind that it requires the
[`sizes` attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes):

```html
<img
  sizes="(min-width: 640px) 18rem, 11rem"
  src="/flowers.jpg"
  transform-images="avif webp jpg 640 1080"
>
```

```html
<picture>
  <source
    srcset="/flowers-640w.avif 640w, /flowers-1080w.avif 1080w"
    type="image/avif"
    sizes="(min-width: 640px) 18rem, 11rem"
  >
  <source
    srcset="/flowers-640w.webp 640w, /flowers-1080w.webp 1080w"
    type="image/webp"
    sizes="(min-width: 640px) 18rem, 11rem"
  >
  <img
    sizes="(min-width: 640px) 18rem, 11rem"
    src="/flowers-640w.jpg"
    srcset="/flowers-1080w.jpg 1080w"
  >
</picture>
```

## Responsive images

You can set the `transform-images` attribute to different sources inside a
picture to generate responsive images:

```html
<picture>
  <!-- version for small devices -->
  <source
    srcset="/flowers-detail.jpg"
    media="(min-width: 600px)"
    transform-images="avif webp jpg 1000@2"
  >

  <!-- version for big screens -->
  <source srcset="/flowers-big.jpg" transform-images="avif webp jpg 1000@2">

  <!-- default image -->
  <img src="/flowers-mini.jpg" transform-images="300@2">
</picture>
```

The plugin generates the following code:

```html
<picture>
  <!-- version for small devices -->
  <source
    srcset="/flowers-1000w.avif, /flowers-1000w@2.avif 2x"
    type="image/avif"
    media="(min-width: 600px)"
  >
  <source
    srcset="/flowers-1000w.webp, /flowers-1000w@2.webp 2x"
    type="image/webp"
    media="(min-width: 600px)"
  >
  <source
    srcset="/flowers-1000w.jpg, /flowers-1000w@2.jpg 2x"
    media="(min-width: 600px)"
  >

  <!-- version for big screens -->
  <source
    srcset="/flowers-1000w.avif, /flowers-1000w@2.avif 2x"
    type="image/avif"
  >
  <source
    srcset="/flowers-1000w.webp, /flowers-1000w@2.webp 2x"
    type="image/webp"
  >
  <source srcset="/flowers-1000w.jpg, /flowers-1000w@2.jpg 2x">

  <!-- default image -->
  <img src="/flowers-300w.jpg" srcset="/flowers-300w@2.jpg 2x">
</picture>
```

## Configuring the img container

If the `transform-images` attribute is assigned to a HTML element that is not an
image, the plugin will search for all `img` elements found inside that element.
This is useful if you don't want to include this attribute in every `<img>`
element, because you want to avoid repetition if all images have the same
configuration, or the HTML content is generated from markdown content that you
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
