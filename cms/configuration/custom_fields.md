---
title: Custom fields
description: How to create custom fields
order: 5
---

In LumeCMS, the fields are standard
[Web components](https://developer.mozilla.org/docs/Web/API/Web_Components),
which makes very easy to extend it with new fields.

To define a new field, use the `cms.field()` function with the field definition,
which is an object with the following values:

- **tag**: The tag name of the custom element used in the HTML code.
- **jsImport**: The URL of the JavaScript file with the custom element. This
  file will be loaded in the HTML.
- **applyChanges**: A function to store the new value received by the web
  component in the document object before store it.
- **init**: (Optional) A function to initialize every instance of the field.

For example, let's create a new field for percentages, that only accepts numbers
between 0-100:

```js
cms.field("percentage", {
  tag: "percentage-field",
  jsImport: "https://example.com/custom-fields/percentage-field.js",
  applyChanges(data, changes, field) {
    const { name } = field;
    const value = changes[name];
    data[name] value ? Number(value) : undefined;
  },
});
```

## Creating a custom element

When a custom element is created, it's recommended to extend the `Component`
class from LumeCMS, which provides some basic features that you will need.

```js
import { Component } from "lume_cms/components/component.js";

customElements.define(
  "percentage-field",
  class extends Component {
    init() {
      // Here your code
    }
  },
);
```

The `init()` function will be executed the first time the component is inserted
in the DOM. The following properties are also available:

- **schema:** The options of the field (name, label, description, attributes,
  etc).
- **value:** The field value.
- **namePrefix:** The prefix of the name attribute. Any form element generated
  by the component **must have this prefix followed by a dot**.

To create the percentage field:

```js
customElements.define(
  "percentage-field",
  class extends Component {
    init() {
      // Get the field info
      const { schema, value, namePrefix } = this;

      // Generate the name of the input and the id
      const name = `${namePrefix}.${schema.name}`;
      const id = `field_${name}`;

      // Print the HTML code
      this.innerHTML = `
      <label for="${id}">${schema.label}</label>
      <input id="${id}" type="number" value="${value}" min=0 max=100 name="${name}>
    `;
    }
  },
);
```

## Utils

LumeCMS provides a `utils.js` file with some utilities. The `push` function
creates a new DOM element and append it to the element passed in the first
argument. The example above can be improved in this way:

```js
import { Component } from "lume_cms/components/component.js";
import { push } from "lume_cms/components/utils.js";

customElements.define(
  "percentage-field",
  class extends Component {
    init() {
      // Get the field info
      const { schema, value, namePrefix } = this;

      // Generate the name of the input and the id
      const name = `${namePrefix}.${schema.name}`;
      const id = `field_${name}`;

      // Add the <label>
      push(this, "label", { for: id }, schema.label);

      // Add the <input type="number">
      push(this, "input", {
        name,
        value,
        id,
        type: "number",
        min: 0,
        max: 100,
      });
    }
  },
);
```

See the
[default Lume CMS fields](https://github.com/lumeland/cms/tree/main/static/components)
for more examples.
