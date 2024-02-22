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

- **tag**: The tag name of the custom element used in the UI.
- **jsImport**: The JavaScript file where the custom element is defined. This
  file will be loaded in the HTML.
- **transformData**: (Optional) A function to transform the value received by
  the web component before save it.
- **init**: (Optional) A function to initialize every instance of the field.

For example, let's create a new field for percentages, that only accepts numbers
between 0-100:

```js
cms.field({
  tag: "percentage-field",
  jsImport: "https://example.com/custom-fields/percentage-field.js",
  transformData(value) {
    return value ? Number(value) : undefined;
  },
});
```

## Creating a custom element

When a custom element is created for a new field, is recommended to extend the
`Field` class from LumeCMS, which provides some basic features that you will
need:

```js
import { Field } from "lume_cms/static/components/field.js";

customElements.define(
  "percentage-field",
  class extends Field {
    init() {
      // Here your code
    }
  },
);
```

The `init()` function will be executed when the component is inserted in the
DOM. The `Field` class also provides the following properties:

- **schema:** The options of the field (name, label, description, attributes,
  etc).
- **value:** The field value.
- **namePrefix:** The prefix of the name attribute. Any form element generated
  by the component **must have this prefix followed by a dot**.

To create the percentage field:

```js
customElements.define(
  "percentage-field",
  class extends Field {
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
import { Field } from "lume_cms/static/components/field.js";
import { push } from "lume_cms/static/components/utils.js";

customElements.define(
  "percentage-field",
  class extends Field {
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
