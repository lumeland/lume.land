---
title: Components
description: Generic Lume components
order: 8
---

Components are template pieces that you can use in other templates. Some
template engines like Nunjucks, Pug or Liquid have ways to reuse codes (like
includes, macros, etc). The Lume components have the following advantages:

- They are template engine agnostic. For example, you can create your components
  in JSX or Javascript and use them in Nunjucks.
- They generate not only the HTML code but also CSS and Javascript code needed.
- They are available everywhere, no need to import them manually.

## Create your own components

Components are stored in the `_components` directory. You can change it in the
[configuration file](../getting-started/config-file.md). To create a new
component, just create a file in this directory with the name of your component
and the extension of the template engine that you want to use. For example a
component in Nunjucks that renders a button could be stored in
`_components/button.njk`:

```html
<button class="button">{{ text }}</button>
```

This component is available in your layouts under the `comp` variable (this can
be configured also). It's a global variable that contain all components. In our
example, we can render the button component with the `comp.button()` function:

```html
<h1>Welcome to my site.</h1>
{{ comp.button({ text: "Login" }) | safe }}
```

Note that the component accepts an object with the properties that we want to
pass to the component. This component is available in any other template engine.
For example Javascript:

```js
export default function ({ comp }) {
  return `
  <h1>Welcome to my site.</h1>
  ${comp.button({ text: "Login" })}
`;
}
```

Eta templates:

```html
<h1>Welcome to my site.</h1>
<%= comp.button({ text: "Login" }) %>
```

Etc.

## Component assets

Components can export CSS and JS code. To do that, the component need to export
`css` or `js` variables.

In our example, we may want to apply some styles to the button. In a Nunjucks
template, the way to export data is using a front matter:

```html
---
css: |
  .button {
    background-color: blue;
    color: white;
  }
---
<button class="button">{{ text }}</button>
```

This css code will be exported in your `dest` folder in the `/components.css`
file together with the CSS code of other used components. Note that if the
component is not used, the CSS code won't be exported. This is an interesting
feature that allows to have a library of many components and only export the CSS
and JS code that you only need.

## Organize your components

Components can be saved in subdirectories. For example, the `button` component
could be saved in the `ui` subdirectory (`_components/ui/button.njk` in your
`src` folder). In this case, you can access to this component with
`comp.ui.button()`.

## Components inside components

Components can use other components internally. Let's say we want to create the
`search` component that use `button` internally. Let's see an example using a JS
template:

```js
// _components/search.js

export const css = `
.search {
  background: gray;
  padding: 20px;
}
`;

export const js = `
import from "js/search.js"
`;

export default function ({ comp }) {
  return `
<form class="search">
  <label>
    Search:
    <input type="search" name="q">
  </label>
  ${comp.button({ text: "Submit" })}
</form>
`;
}
```

In this example, the component exports CSS and JS code, in addition to the HTML
code.

## JSX and TSX components

If the [JSX plugin](../plugins/jsx.md) is enabled, you can use it to generate
components:

```jsx
export const css = `
.button {
  background-color: blue;
  color: white;
}
`;

export default function ({ text }) {
  return <button>{text}</button>;
}
```

JSX components can be used in any template engine.
