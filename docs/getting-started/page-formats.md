---
title: Other page formats
description: Creating pages with Vento, JavaScript and other formats
order: 6
---

We have seen how to create pages from Markdown files in Lume. This is a
convenient format for text-based sites like blogs or documentation, but you may
want to create a complex page with small text, images, videos, animations, etc.
Every page has its own format.

## Create pages with Vento

Vento, the format we have used to create layouts in the previous examples, can
also be used to create pages directly. You simply create a file with the `.vto`
extension. For example:

<lume-code>

```vento {title="vento-page.vto"}
---
title: Welcome to my page
layout: layout.vto
links:
  - text: My Twitter
    url: https://twitter.com/misteroom
  - text: My GitHub profile
    url: https://github.com/oscarotero
---

<article>
  <header>
    <h1>{{ title }}</h1>
  </header>

  <ul>
    {{ for link of links }}
    <li>
      <a href="{{ link.url }}">
        {{ link.text }}
      </a>
    </li>
    {{ /for }}
  </ul>
</article>
```

</lume-code>

This is an example of a page using Vento. Like markdown, it can contain front
matter to store the page data, which is used to render the Vento code. Note that
it has the `layout` variable, so the result of rendering this page will be
passed to the layout in the `content` variable (along with the other variables
`title` and `links`).

## Create pages with JavaScript

JavaScript can be useful for complex pages requiring some logic before
rendering. You have to create a file with the extension `.page.js`. The `.page`
sub-extension is required to distinguish JavaScript files that generate static
pages from other JavaScript files destined to be run in the browser.

The previous Vento example in JavaScript is:

<lume-code>

```js { title="complex-page.page.js" }
export const title = "Welcome to my page";
export const layout = "layout.vto";
export const links = [
  {
    text: "My Twitter",
    url: "https://twitter.com/misteroom",
  },
  {
    text: "My GitHub profile",
    url: "https://github.com/oscarotero",
  },
];

export default function ({ title, links }) {
  return `
  <article>
    <header>
      <h1>${title}</h1>
    </header>

    <ul>
      ${
    links.map((link) => `<li><a href="${link.url}">${link.text}</a></li>`).join(
      "",
    )
  }
    </ul>
  </article>`;
}
```

</lume-code>

As you can see, the variables exported in the front matter in the Vento example
are now exported as named ES modules.

The default export is a function that returns the page content. The first
argument contains all available data for this page (not only the same variables
exported by the page, but also other data provided by `_data` files).

## More formats

Lume supports several formats to generate pages.
[Go to the Plugins section](/plugins/?status=all&data_format=on&template_engine=on)
to see more info about all available formats. Some of them are installed by
default (like [Vento](/plugins/vento.md), [YAML](/plugins/yaml.md),
[Modules](/plugins/modules.md) etc), and others need to be installed in your
`_config.ts` file (like [Nunjucks](/plugins/nunjucks.md),
[Eta](/plugins/eta.md), [JSX](/plugins/jsx.md), [Liquid](/plugins/liquid.md), or
[Pug](/plugins/pug.md)).

## Data model

If you want to better understand how Lume loads pages, go to the
[`Data` model](../advanced/the-data-model.md) page.
