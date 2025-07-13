---
title: Custom fields
description: How to create custom fields
order: 5
oldUrl: /cms/configuration/custom_fields/
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

The `init()` function is executed the first time the component is inserted in
the DOM. The following properties are also available:

- **schema:** The field options (name, label, description, attributes, etc).
- **value:** The field value.
- **namePrefix:** The prefix of the name attribute. Any form element generated
  by the component **must have this prefix followed by a dot**.
- **isNew:** It's `true` if we are creating a new element (instead of editing).

As of version 0.12.2, this custom element need also the following properties:

- `currentValue`: A property returning the current value of the field. It's used
  to maintain the same value when the field is duplicated in the UI.
- `update(schema, value)`: A function to update the field with a new state
  coming from the backend after saving the data. For example, you might have a
  field with the [`transform` option](./index.md#common-field-options) to
  transform the value before saving it (like converting it to upper case). This
  function allows to reflect this change in the UI.

This is how our percentage field would looks:

```js
customElements.define(
  "percentage-field",
  class extends Component {
    init() {
      // Get the field info
      const { schema, value, namePrefix, isNew } = this;

      // Generate the name of the input and the id
      const name = `${namePrefix}.${schema.name}`;
      const id = `field_${name}`;

      // Calculate the value of the input.
      // If `isNew` is true, we use schema.value as the default value.
      const val = isNew ? value ?? schema.value : value;

      // Print the HTML code
      this.innerHTML = `
      <label for="${id}">${schema.label}</label>
      <input id="${id}" type="number" value="${val}" min=0 max=100 name="${name}>
    `;
    }

    // Return the current value of this field
    get currentValue() {
      return this.querySelector("input").value;
    }

    // Update the field with a new state
    update(schema, value) {
      const input = this.querySelector("input");

      // Update the input value
      input.value = value ?? null;

      // Update the label value
      // since it could be changed from backend
      input.labels[0].innerHTML = schema.label;
    }
  },
);
```

## Working with the DOM

LumeCMS comes with [the `dom` module](https://github.com/oscarotero/dom) to ease
the work with the DOM. The example above can be simplified:

```js
import { Component } from "lume_cms/components/component.js";
import dom from "dom";

customElements.define(
  "percentage-field",
  class extends Component {
    init() {
      // Get the field info
      const { schema, value, namePrefix, isNew } = this;

      // Generate the name of the input and the id
      const name = `${namePrefix}.${schema.name}`;
      const id = `field_${name}`;

      // Append the <label> to this
      dom("label", { for: id, html: schema.label }, this);

      // Append the <input> to this
      // and save the element in this.input to reuse later.
      this.input = dom("input", {
        type: "number",
        name,
        value: isNew ? value ?? schema.value : value,
        id,
        min: 0,
        max: 100,
      }, this);
    }

    // Return the current value of this field
    get currentValue() {
      return this.input.value;
    }

    // Update the field with a new state
    update(schema, value) {
      // Update the input value
      this.input.value = value ?? null;

      // Update the label value
      // since it could be changed from backend
      this.input.labels[0].innerHTML = schema.label;
    }
  },
);
```

See the
[default Lume CMS fields](https://github.com/lumeland/cms/tree/main/static/components)
for more examples.
