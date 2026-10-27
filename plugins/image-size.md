---
title: Image size
description: Generate automatically the width and height attributes of images
category: html
oldUrl: /plugins/image_size/
---

## Description

This plugin generate the width and height attributes of the images which is
recommended to prevent layout shift.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import imageSize from "@lumeland/plugin-image-size";

const site = lume();

site.use(imageSize());

export default site;
```

Add the `image-size` attribute to the images you want the plugin to calculate
the size:

```html
<img src="/image.png" image-size>
```

And the plugin automatically adds the `width` and `height` attributes:

```html
<img src="/image.png" width="600" height="300">
```
