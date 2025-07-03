---
title: Components
description: Generic Lume components
order: 8
---

Components are template pieces that you can use in other templates. Some
template engines like Vento, Nunjucks, Pug or Liquid already have ways to reuse
code (like includes, macros, etc). Lume components have the following
advantages:

- They are template engine agnostic. For example, you can create your components
  in JSX or JavaScript and use them in Nunjucks.
- They don't just output HTML, but can content the CSS and JavaScript needed on
  the client side. And the CSS and JS code is output only if the component is
  used.
- They are automatically available everywhere; no need to import them manually.
- For ESM module-based components (like JavaScript, TypeScript, JSX or TSX) it's
  the only way to hot-reload components without stopping and restarting the
  local server.

> [!important]
>
> **Lume components don't run in the browser**. They are intended to generate
> static HTML code at build time.
>
> For interactive client-side components (with `onclick` callbacks and similar
> stuff) you may want to use the [esbuild plugin](../../plugins/esbuild.md) to
> compile your JavaScript code, but the architecture is up to you. **Lume is not
> a frontend framework**.

## Create your own components

Components are stored in the `_components` directory. Like with `_data`, you can
create `_components` directories in different sub-directories to make them
available only to specific pages. To create a new component, just create a file
in this directory with the name of your component and the extension of the
template engine you want to use. For example, a component in Vento that renders
a button could be stored in `_components/button.vto`:

```vento
<button class="button">{{ text }}</button>
```

This component is available in your layouts under the `comp` variable. This is a
global variable that contains all components. In our example, we can render the
button component with the `comp.button()` function:

```vento
<h1>Welcome to my site.</h1>
{{ await comp.button({ text: "Login" }) }}
```

Components are **case insensitive**, so `comp.button`, `comp.Button` or
`comp.BuTtOn` returns the same component:

```vento
{{ await comp.Button({ text: "Login" }) }}
```

Components can be saved in subdirectories. For example, the `button` component
could be saved in the `ui` subdirectory (`_components/ui/button.vto`). In this
case, you can access this component with `comp.ui.button()`.

The component is an **async function** that accepts an object with the
properties. This component is available in all template engines.

### JS/TS templates:

Example of using the `button` component in a JavaScript page:

```js
export default async function ({ comp }) {
  return `
  <h1>Welcome to my site.</h1>
  ${await comp.button({ text: "Login" })}
`;
}
```

More info at [Modules plugin documentation](../../plugins/modules.md#components)

### Vento templates

```html
<h1>Welcome to my site.</h1>
{{ await comp.button({ text: "Login" }) }}
```

More info at [Vento plugin documentation](../../plugins/vento.md#components)

### Nunjucks templates:

```html
<h1>Welcome to my site.</h1>
{{ comp.button({ text: "Login" }) | await | safe }}
```

More info at
[Nunjucks plugin documentation](../../plugins/nunjucks.md#components)

### Eta templates:

```html
<h1>Welcome to my site.</h1>
<%~ await comp.button({ text: "Login" }) %>
```

### JSX

Lume components can be used like JSX components if you're using the JSX plugin:

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

Like any JSX component, you can pass children to the component.

```jsx
export default function ({ comp }) {
  return <comp.title>This is a title</comp.title>;
}
```

The children content is passed as `children` and `content` properties (both are
equivalent):

```jsx
// _components/title.tsx

export default function title({ children }) {
  return <h1>{children}</h1>;
}
```

More info at [JSX plugin documentation](../../plugins/jsx.md#components)

## Nested components

You can nest components inside other components. In JSX this is easy:

```jsx
export default function ({ comp }) {
  return (
    <comp.container>
      Content of the Container component
      <comp.button>This is a button inside a container</comp.button>
    </comp.container>
  );
}
```

### Vento

In other template engines like Vento, due the components are functions, it's
possible to pass the content in this way:

```vento
{{ await comp.container({
  content: `
    Content of the Container component
    ${await comp.button({ content: "This is a button inside a container" })}
    `
}) }}
```

But this way to consume components is not very practical. To make this easier,
Vento has the `comp` special tag that allows to consume components similarly to
JSX:

```vento
{{ comp container }}
  Content of the Container component

  {{ comp button }}
    This is a button inside the Container component
  {{ /comp }}
{{ /comp }}
```

### Nunjucks

Nunjucks has a very similar tag:

```txt
{% comp "Container" %}
  Content of the Container component

  {% comp "Button" %}
    This is a button inside the Container component
  {% endcomp %}
{% endcomp %}
```

## Components inside components

Components receive automatically the `comp` property. This allows to invoke
components inside other components. Let's say we want to create the `search`
component that uses `button` internally. This is an example using a JSX
template:

```jsx
// _components/search.jsx

export default async function ({ comp }) {
  return (
  <form class="search">
    <label>
      Search:
      <input type="search" name="q">
    </label>
    <comp.Button>Submit</comp.Button>
  </form>
  );
}
```

## Component assets

Components can export CSS and JS code. To do this, the component needs to export
`css` or `js` variables.

In our example, we may want to apply some styles to the button. In a Vento
template, the way to export data is using the front matter:

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

This CSS code will be exported to your `dest` folder in the `/style.css` file
(or other [configured file](../configuration/config-file.md#components-options))
together with the CSS code of other used components. Note that if the component
is not used, **the CSS code won't be exported**. This is a useful feature that
allows having a library of many components and only exporting the CSS and JS
code that you only need.

### Folder components

To make easier to create components with CSS and JS, it's possible to create a
component in a folder, with the CSS and JS code in different files. To do that,
you have to use the following structure:

```txt
_components
  └── button
      ├── comp.vto
      ├── style.css
      └── script.js
```

Any folder containing a `comp.*` file will be loaded as a component using the
folder name as the component name, and the `style.css` and `script.js` files
will be loaded as the CSS and JavaScript code for the component. This makes the
creation of components more ergonomic, especially for cases with a lot of CSS
and JS code.

Additionally, it's possible to add a `script.ts` file instead of `script.js` to
use TypeScript. Lume will compile it to JavaScript automatically.

## Register components from the _config file

In addition to the `_components` folder, you can register components dynamically
in the `_config` file with the function `site.component()`, which is useful for
plugins. This function takes two arguments: the component context and the
component object:

```ts
site.component("ui", {
  name: "button",
  css: ".btn { background: blue; color: white }",
  render({ text }) {
    return `<button class="btn">${text}</button>`;
  },
});
```

Now, you can use the component like this:

```vento
{{ comp.ui.button({ text: "Login" }) }}
```
