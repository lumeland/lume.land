---
title: Other page formats
description: Other available formats to create pages
order: 4
---

We have seen how to create pages from markdown files with a front matter to
include arbitrary data and a layout file to render the content to output HTML
code. This is great if your pages contain large articles, such documentation or
posts. But it's not so practical for other use cases. Luckily, Lume supports
many other formats to generate pages:

## Pages in YAML

If your page has a more complicated data structure than a post, you can use the
YAML format to store this data. The YAML format is exactly the same as the front
matter in the markdown, but without the markdown content and triple-dashed
delimiters. Example:

```yml
title: Contact with us
subtitle: Please, fill the following form
url: /contact-with-us/
layout: layouts/contact-form.njk

form:
  name: What's your name?
  email: Your email
  comment: Leave a comment here
  submit: Send data

footer: Thanks for contact us!
```

This page doesn't contain a large article, but many microcopies. So YAML format
is great because allows to better structure the data that will be used in the
layout (configured as `layouts/contact-form.njk`).

The support for YAML depends on the [YAML plugin](../core/yaml.md) that is
**enabled by default**, so you don't need to configure anything. Just create
pages with `.yml` extension and that's all.

## Pages in JSON

JSON format has the same benefits as YAML but it's easy to generate and consume
by computers, so it's great if the data of your page is fetched by an API or
something like that. The previous example in JSON:

```json
{
  "title": "Contact with us",
  "subtitle": "Please, fill the following form",
  "url": "/contact-with-us/",
  "layout": "layouts/contact-form.njk",

  "form": {
    "name": "What's your name?",
    "email": "Your email",
    "comment": "Leave a comment here",
    "submit": "Send data"
  },

  "footer": "Thanks for contact us!"
}
```

The support for JSON depends on the [JSON plugin](../core/json.md) that is
**enabled by default**, so you don't need to configure anything. Just create
pages with `.tmpl.json` extension and that's all (note that `.tmpl` subextension
is important to indicate that the file must generate a page).

## Pages in Nunjucks

To create a page using HTML code instead of markdown, you can write the code
using the syntax of any template engine, like Nunjucks. This gives more
flexibility and is convenient for unique pages, specially if you don't want to
create layout files that won't be reused by other pages except this one. Like
with markdown, you can create a front matter to store the variables:

```html
---
title: Contact with us
subtitle: Please, fill the following form
url: /contact-with-us/
layout: layouts/base.njk

form:
  name: What's your name?
  email: Your email
  comment: Leave a comment here
  submit: Send data

footer: Thanks for contact us!
---

<header>
  <h1>{{ title }}</h1>
  <p>{{ subtitle }}</p>
</header>

<form>
  <p>
    <label for="name">{{ form.name }}</label>
    <input type="text" id="name">
  </p>
  <p>
    <label for="email">{{ form.email }}</label>
    <input type="email" id="email">
  </p>
  <p>
    <label for="comment">{{ form.comment }}</label>
    <textarea id="email"></textarea>
  </p>

  <button>{{ form.submit }}</button>
</form>

<footer>
  {{ footer }}
</footer>
```

The support for Nunjucks depends on the [Nunjucks plugin](../core/nunjucks.md)
that is **enabled by default**, so you don't need to configure anything. Just
create pages with `.njk` extension and that's all.

You can use other template engines like [Pug](../plugins/pug.md) or
[Eta](../plugins/eta.md) to generate pages using their syntax but they are
disabled by default, so first you need to enable them in the `_config.js` file.

## Pages in Javascript or Typescript

For more advanced use cases, with dynamic data, you can use javascript or
typescript modules. The way it works is the same as in other formats: you have
to export the variables needed to generate this page. For example, this is an
example to generate the same page as in the YAML example:

```js
export const title = "Contact with us";
export const subtitle = "Please, fill the following form";
export const url = "/contact-with-us/";
export const layout = "layouts/contact-form.njk";

export const form = {
  name: "What's your name?",
  email: "Your email",
  comment: "Leave a comment here",
  submit: "Send data",
};

export const footer = "Thanks for contact us!";
```

As you can see, the named exports are equivalent to the values of YAML, JSON,
etc. And these values will be used by the layout (`layouts/contact-form.njk`) to
generate the final html code.

But this is a very basic example that doesn't provide much advantage over using
YAML or JSON. Javascript and Typescript are much more powerful than that! For
example, the default export can be used to generate the html code:

```js
export const url = "/contact-with-us/";
export const layout = "layouts/base.njk";

const title = "Contact with us";
const subtitle = "Please, fill the following form";

export default `
  <header>
    <h1>${title}</h1>
    <p>${subtitle}</p>
  </header>
`;
```

In the above example (more simple for clarity), we are generating the HTML code
and use the layout `layouts/base.njk` to wrap this code with the minimum HTML
needed.

The `default` export is what provide the power of javascript/typescript pages.
In the previous example it contain a string with the rendered html. But we can
export a function, so it will be executed to generate the final code:

```js
export const url = "/contact-with-us/";
export const layout = "layouts/base.njk";

export default function () {
  const title = "Contact with us";
  const subtitle = "Please, fill the following form";

  return `
    <header>
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </header>
  `;
}
```

You can use generators to generate several pages using the same
javascript/typescript file. See [Pagination](../core/pagination.md) for
examples.

The support for Javascript and Typescript modules depends on the
[Modules plugin](../core/modules.md) that is **enabled by default**, so you
don't need to configure anything. Just create pages with `.tmpl.js` or
`.tmpl.ts` extension and that's all (the `.tmpl` subextension is important to
indicate that the file must generate a page).

You also can use `JSX` and `TSX` syntax, but **is disabled by default**, so you
need to enable the [JSX plugin](../plugins/jsx.md) in the `_config.js` file.
