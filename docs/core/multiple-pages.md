---
title: Create multiple pages
description: Generators allows to create multiple pages from an unique source file
order: 8
---

${toc}

It's possible with Lume to generate more than one page from the same source
file. This is useful to generate pages programatically using a external source
like a database or an API.

## Basic example

To generate pages, the source file must return a
[generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
Every element yielded by the generator is a new page and must contain, at least,
the `url` property.

```js
export default function ()* {
  yield {
    url: "/page-1/",
    content: "This is the first page",
  };
  yield {
    url: "/page-2/",
    content: "This is the second page",
  };
  yield {
    url: "/page-3/",
    content: "This is the third page",
  };
}
```

In the example above, this page generate three pages. It's important that the
urls of the pages to be unique.

## Multiple pages with layouts

Every page is an object with the page data. In the previous example, every page
has the `url` and `content` properties, to define the content and url of every
page. If you want to use a layout to generate the page content, you have to
export the `layout` keyword with the layout name and the data that will be used
in the layouts:

<lume-code>

```js {title="pages.tmpl.js"}
export default function ()* {
  yield {
    url: "/page-1/",
    layout: "layouts/article.njk",
    title: "Article 1",
    body: "Welcome to the article 1"
  };
  yield {
    url: "/page-2/",
    layout: "layouts/article.njk",
    title: "Article 2",
    body: "Welcome to the article 2"
  };
  yield {
    url: "/page-3/",
    layout: "layouts/article.njk",
    title: "Article 3",
    body: "Welcome to the article 3"
  };
}
```

```html {title=_includes/layouts/article.njk}
---
layout: layouts/base.njk
---

<article>
  <h1>{{ title }}</h1>
  <div>
    {{ body | md | safe}}
  </div>
</article>
```

</lume-code>

Due the layout is the same for all pages, we can use a named export to define it
once, instead of duplicating it in every yielded page:

<lume-code>

```js {title="pages.tmpl.js"}
export const layout = "layouts/article.njk";

export default function ()* {
  yield {
    url: "/page-1/",
    title: "Article 1",
    body: "Welcome to the article 1"
  };
  yield {
    url: "/page-2/",
    title: "Article 2",
    body: "Welcome to the article 2"
  };
  yield {
    url: "/page-3/",
    title: "Article 3",
    body: "Welcome to the article 3"
  };
}
```

```html {title=_includes/layouts/article.njk}
---
layout: layouts/base.njk
---

<article>
  <h1>{{ title }}</h1>
  <div>
    {{ body | md | safe}}
  </div>
</article>
```

</lume-code>

## Generate pages from other sources

This simple concept of using generators to generate pages is very flexible and
can be used to any use case. For example, we can generate pages from a Database
or an API:

```js
import database from "./my-database.ts";

export const layout = "layouts/article.njk";

export default function* () {
  const articles = database.query("select * from articles");

  for (const article of articles) {
    yield {
      url: `/articles/${article.slug}/`,
      ...article,
    };
  }
}
```

In this example, we use a database to get all articles and a generator to
generate a new page per article. Each yielded article contains the url and other
properties you like (title, category, tag, body etc). We are exporting the
`layout` value so all pages will use the same layout to be rendered.

Other common use case is for pagination. Go to
[Search and paginate](./searching.md) for more info.
