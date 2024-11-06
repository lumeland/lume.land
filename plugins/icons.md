---
title: Icons
description: Import icons from the most popular icon libraries
mod: plugins/icons.ts
tags:
  - images
---

## Description

This plugin register the `icon` filter to download icons from the most popular
icon libraries on demand.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import icons from "lume/plugins/icons.ts";

const site = lume();

site.use(icons(/* Options */));

export default site;
```

## Usage

The `icon` filter downloads the SVG file of the icon and returns the path to
this file so you can use it in your templates. For example to use the
[`fire` icon](https://icons.getbootstrap.com/icons/fire/) from
[Bootstrap](https://icons.getbootstrap.com/) library:

```html
<img src="{{ "fire" |> icon("bootstrap") }}">
```

By default, the SVG files are downloaded to the `/icons` folder, creating a
subfolder per collection. In the previous example, the icon would be saved to
`/icons/bootstrap/fire.svg`. It's possible to configure a different folder with
the `folder` option:

```js
site.use(icons({
  folder: "/img/icons",
}));
```

### Variants

Some icons have different variations. For example,
[Phosphor](https://phosphoricons.com/) has 6 different variations per icon. You
can specify the variation with the `name:variation` syntax:

```html
<img src="{{ "acorn:duotone" |> icon("phosphor") }}">
```

The icon file is saved to `/icons/phosphor/acorn-duotone.svg` (the variation is
appended to the name).

Alternatively, you can set the variation in the second argument of the filter:

```html
<img src="{{ "acorn" |> icon("phosphor", "duotone") }}">
```

This is useful if you want more control of the variant to use, and don't want to
delegate this decision to the person responsible to edit the content.

## Inline icons

To inline the icons in the HTML, you can combine this plugin with the
[`inline` plugin](./inline.md):

```html
<img src="{{ "acorn" |> icon("phosphor") }}" inline>
```

## Available libraries

This is a list of all available libraries suported out of the box by the plugin:

| Library                                                                      | Id(s)                                                                                                          |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [Ant](https://ant.design/components/icon)                                    | `ant`                                                                                                          |
| [Bootstrap](https://icons.getbootstrap.com/)                                 | `bootstrap`                                                                                                    |
| [Boxicons](https://boxicons.com/)                                            | `boxicons`                                                                                                     |
| [Fluent](https://react.fluentui.dev/?path=/docs/icons-catalog--docs)         | `fluent`                                                                                                       |
| [Heroicons](https://heroicons.com/)                                          | `heroicons`                                                                                                    |
| [Iconoir](https://iconoir.com/)                                              | `iconoir`                                                                                                      |
| [Lucide](https://lucide.dev/)                                                | `lucide`                                                                                                       |
| [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)     | `material`                                                                                                     |
| [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) | `material-100`, `material-200`, `material-300`, `material-400`, `material-500`, `material-600`, `material-700` |
| [Mingcute](https://www.mingcute.com/)                                        | `mingcute`                                                                                                     |
| [Myna](https://mynaui.com/icons)                                             | `myna`                                                                                                         |
| [Octicons](https://primer.style/foundations/icons)                           | `octicons`                                                                                                     |
| [Openmoji](https://openmoji.org/)                                            | `openmoji`                                                                                                     |
| [Phosphor](https://phosphoricons.com/)                                       | `phosphor`                                                                                                     |
| [Remix icons](https://remixicon.com/)                                        | `remix`                                                                                                        |
| [Sargam](https://sargamicons.com/)                                           | `sargam`                                                                                                       |
| [Simpleicons](https://simpleicons.org/)                                      | `simpleicons`                                                                                                  |
| [Tabler](https://tabler.io/icons)                                            | `tabler`                                                                                                       |

### Use custom libraries

The `catalogs` option allows configure custom icons catalogs. Each catalog is an
object with the following properties:

<!-- deno-fmt-ignore-start -->
id (required)
: The catalog Id used in the filter

src (required)
: The URL pattern used to download the SVG icon from a CDN. [JsDelivr](https://www.jsdelivr.com/) is highly recommended but you can use any domain. The pattern should contain the `{name}` and `{variant}` placeholders that are replaced with the name and variant to build the final URL.

variants
: If the catalog has different variants, they must be listed in this array. The variants can be a string or an object with the `id` and `path` properties. The first element of the array is considered the default variant.

name
: If the path of the icon file does not correspond with the icon name, you can configure a function to return the final path.

<!-- deno-fmt-ignore-end -->

#### Example

```js
site.use(icons({
  catalog: [
    {
      id: "my-library",
      src: "https://my-cdn.com/icons/{name}-{variant}.svg",
      variants: [
        "filled",
        "outlined",
      ],
    },
  ],
}));
```

To use this library:

```html
<img src="{{ iconName |> icon("my-library", "filled") }}">
```
