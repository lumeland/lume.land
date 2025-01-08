---
title: JSON-LD
description: Generate JSON-LD tags in the HTML pages.
mod: plugins/json_ld.ts
tags:
  - html
  - utils
---

## Description

[JSON-LD](https://json-ld.org/) (JSON for Linking Data) is a way to provide
[structured data](https://www.schema.org/) to web pages using JSON format, which
is easier to parse and doesn't require to modify the HTML code. It's defined
with a `<script type="application/ld+json">` element containing the JSON code.
For example:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://oscarotero.com/",
    "headline": "Óscar Otero - Web designer and developer",
    "name": "Óscar Otero",
    "description": "I’m just a designer and web developer",
    "author": {
      "@type": "Person",
      "name": "Óscar Otero"
    }
  }
</script>
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import jsonLd from "lume/plugins/json_ld.ts";

const site = lume();

site.use(jsonLd());

export default site;
```

## Usage

Create the `jsonLd` variable in your pages. For example:

<lume-code>

```yml {title="/about-me.yml"}
jsonLd:
  "@type": WebSite
  url: /
  headline: Óscar Otero - Web designer and developer
  name: Óscar Otero
  description: I’m just a designer and web developer
  author:
    "@type": Person
    name: Óscar Otero
```

</lume-code>

The output HTML page will include the `<script type="application/ld+json">` tag
with the full object:

```html
<html>
  <head>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://oscarotero.com/",
        "headline": "Óscar Otero - Web designer and developer",
        "name": "Óscar Otero",
        "description": "I’m just a designer and web developer",
        "author": {
          "@type": "Person",
          "name": "Óscar Otero"
        }
      }
    </script>
  </head>
  <body>
    <p>This is my first post</p>
  </body>
</html>
```

- The plugin automatically adds the `@context` property.
- URLs can omit the protocol and host. The plugin automatically resolves all
  URLs based on the `location` of the site.

## Field aliases

Field aliases allow to use an existing value in the LD object.

- Use `={fieldname}` to get the value of any field. For example `=title`.
- Use `$ {css selector}` to get the value of any HTML element. For example
  `$ h1`.
  - Use `attr()` to get the value of any attribute. For example:
    `$ img.main attr(src)`.
- You can use different fallbacks separated with `||`. For example:
  `=title || $ h1 || Default title`.

```yml
title: Óscar Otero - Web designer and developer
header:
  title: Óscar Otero
  description: I’m just a designer and web developer

jsonLd:
  "@type": WebSite
  url: /
  headline: $ h1.headline
  name: =header.title
  description: =header.description
  author:
    "@type": Person
    name: =header.title
```

## TypeScript

If you want to use TypeScript, there's the `Lume.Data["jsonLd"]` type (powered
by [schema-dts](https://www.npmjs.com/package/schema-dts) package):

```ts
export const jsonLd: Lume.Data["jsonLd"] = {
  "@type": "WebSite",
  url: "/",
  headline: "Óscar Otero - Web designer and developer",
  description: "I’m just a designer and web developer",
  name: "Óscar Otero",
  author: {
    "@type": "Person",
    name: "Óscar Otero",
  },
};
```
