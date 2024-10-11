---
title: Components
description: Generic Lume components
order: 8
---

Components are template pieces that you can use in other templates. Some
template engines like Nunjucks, Pug or Liquid have ways to reuse codes (like
includes, macros, etc). The Lume components have the following advantages:

- They are template engine agnostic. For example, you can create your components
  in JSX or JavaScript and use them in Nunjucks.
- They can generate not only the HTML code but also the CSS and JavaScript code
  needed on the client side.
- They are automatically available everywhere; no need to import them manually.
- For ESM module-based components (like JavaScript, TypeScript, JSX or TSX) it's
  the only way to hot-reload components without stopping and restarting the
  local server.

> [!important]
>
> **Lume components don't run in the browser**. They are intended to generate
> static HTML code on building time.
>
> For interactive client-side components (with `onclick` callbacks and similar
> stuff) you may want to use the [esbuild plugin](../../plugins/esbuild.md) to
> compile your JavaScript code. But the code architecture is up to you (**Lume
> is not a frontend framework**).

## Create your own components

Components are stored in the `_components` directory. Like with `_data`, you can
create `_components` directories in different sub-directories to make them
available only to specific pages. To create a new component, just create a file
in this directory with the name of your component and the extension of the
template engine you want to use. For example, a component in Nunjucks that
renders a button could be stored in `_components/button.vto`:

```vento
<button class="button">{{ text }}</button>
```

This component is available in your layouts under the `comp` variable (you can
configure a different variable name in `_config.ts`). It's a global variable
that contains all components. In our example, we can render the button component
with the `comp.button()` function:

```vento
<h1>Welcome to my site.</h1>
{{ comp.button({ text: "Login" }) }}
```

Note that the component accepts an object with the properties. This component is
available in any other template engine. For example, JavaScript:

```js
export default function ({ comp }) {
  return `
  <h1>Welcome to my site.</h1>
  ${comp.button({ text: "Login" })}
`;
}
```

Nunjucks templates:

```html
<h1>Welcome to my site.</h1>
{{ comp.button({ text: "Login" }) | safe }}
```

Eta templates:

```html
<h1>Welcome to my site.</h1>
<%= comp.button({ text: "Login" }) %>
```

Lume components can be used like React components if you're using the JSX
plugin:

```jsx
export default function ({ comp }) {
  return (
    <>
      <h1>Welcome to my site.</h1>
      <comp.Button text="Login" />
    </>
  );
}
```

Note that components created with text-based template engines (like Vento or
Nunjucks) won't work as expected inside JSX templates because the HTML code will
be escaped. To fix it you have to use the `dangerouslySetInnerHTML` property:

```jsx
export default function ({ comp }) {
  // comp.Button is a Vento component: it returns a string, not a JSX element.
  return (
    <>
      <h1>Welcome to my site.</h1>
      <div
        dangerouslySetInnerHTML={{ __html: <comp.Button text="Login" /> }}
      />
    </>
  );
}
```

### Nested components

In Vento you can nest components in this way:

```vento
{{ comp Container }}
  Content of the Container component

  {{ comp Button }}
    This is a button inside the Container component
  {{ /comp }}
{{ /comp }}
```

In Nunjucks it's very similar:

```html
{% comp "Container" %} Content of the Container component {% comp "Button" %}
This is a button inside the Container component {% endcomp %} {% endcomp %}
```

The content of the components are passed through the `content` variable:

<lume-code>

```vento {title="_components/container.vto"}
<section class="container">{{ content }}</section>
```

```vento {title="_components/button.vto"}
<button>{{ content }}</button>
```

</lume-code>

## Component assets

Components can export CSS and JS code. To do that, the component needs to export
`css` or `js` variables.

In our example, we may want to apply some styles to the button. In a Nunjucks
template, the way to export data is using a front matter:

```vento
---
css: |
  .button {
    background-color: blue;
    color: white;
  }
---
<button class="button">{{ text }}</button>
```

This CSS code will be exported in your `dest` folder in the `/components.css`
file together with the CSS code of other used components. Note that if the
component is not used, the CSS code won't be exported. This is an interesting
feature that allows having a library of many components and only exporting the
CSS and JS code that you only need.

## Organize your components

Components can be saved in subdirectories. For example, the `button` component
could be saved in the `ui` subdirectory (`_components/ui/button.vto` in your
`src` folder). In this case, you can access this component with
`comp.ui.button()`.

## Components inside components

Components can use other components internally. Let's say we want to create the
`search` component that uses `button` internally. Let's see an example using a
JS template:

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

In this example, the component exports CSS and JS code in addition to the HTML
code.

## Register components from the _config file

In addition to the `_components` folder, you can register components dynamically
in the `_config` file with the function `site.component()`. This function takes
two arguments: the component context and the component object:

```ts
site.component("ui", {
  name: "button",
  css: ".btn { background: blue; color: white }",
  render({ text }) {
    return `<button class="btn">${text}</button>`;
  },
});
```

Now, you can use the component as always:

```vento
{{ comp.ui.button({ text: "Login" }) }}
```
