---
title: Relations
description: Create automatic relations between pages
docs: plugins/relations.ts/~/Options
tags:
  - utils
---

## Description

This plugin is useful if you have different types of pages that are related. For
example, let's say there are pages with articles and pages with authors. This
plugin can relate the articles and authors pages automatically.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import relations from "lume/plugins/relations.ts";

const site = lume();

site.use(relations());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/relations.ts/~/Options).

## Usage

First, you need to specify the page types and their foreign key used to make the
relation. For example:

```js
import lume from "lume/mod.ts";
import relations from "lume/plugins/relations.ts";

const site = lume();

site.use(relations({
  foreignKeys: {
    article: "article_id",
    author: "author_id",
  },
}));

export default site;
```

Now, we have to do the following for every page:

- Define the type of the page (in our example "article" or "author").
- Define the id to identify this page.
- Set the foreign keys of the related pages.

In the following example, there are some pages of type `article` and `author`.
The pages of type `article` include the relation with the author, using the
foreign key configured previously:

<lume-code>

```yml {title=/article-1.md}
---
title: This is title 1
type: article
id: 1
author_id: 2
---

Content of article 1
```

```yml {title=/article-2.md}
---
title: This is title 2
type: article
id: 2
author_id: 2
---

Content of article 2
```

```yml {title=/article-3.md}
---
title: This is title 2
type: article
id: 3
author_id: 2
---

Content of article 2
```

```yml {title=/oscar.md}
---
title: Óscar Otero
type: author
id: 1
---

Bio of Óscar
```

```yml {title=/laura.md}
---
title: Laura Rubio
type: author
id: 2
---

Bio of Laura
```

</lume-code>

This plugin automatically creates the variable `author` for each article with
the data of the author (`1:n` relation). To render an article including the
author:

<lume-code>

```html{title=_includes/layouts/article.njk}
<article>
  <header>
    <h1>{{ title }}</h1>
    <p>By {{ author.title }}</p>
  </header>

  {{ content | safe }}
</article>
```

</lume-code>

The plugin also creates the inverse relation (`n:1` relation) and creates the
variable `article` that is an array with all articles related to each author:

<lume-code>

```html{title=_includes/layouts/author.njk}
<article>
  <header>
    <h1>{{ title }}</h1>
  </header>

  {{ content | safe }}

  <h2>Articles created:</h2>

  <ul>
  {% for item in article %}
    <li>
      <a href="{{ item.url }}">
        {{ item.title }}
      </a>
    </li>
  {% endfor %}
  </ul>
</article>
```

</lume-code>

## Multiple relations

You can relate multiple pages (`n:n` relation) from the same page using an array
in the foreign key. For example, an article written by many authors:

<lume-code>

```yml {title=/example.md}
---
title: This is the title
type: article
id: 1
author_id: [1, 2]
---

Content of the article
```

</lume-code>

## Customize the id key

By default the pages are identified by the value in the `id` key. You can change
the key name in the config:

```js
site.use(relations({
  idKey: "slug",
  foreignKeys: {
    article: "article_id",
    author: "author_id",
  },
}));
```

Now, all pages are identified by the `slug` key instead of the `id`.

It's also possible to configure the id key name per type. For example, if you
want to identify the `author` by the field `name`:

```js
site.use(relations({
  idKey: "slug",
  foreignKeys: {
    article: "article_id",
    author: ["author_id", "name"],
  },
}));
```

Using an array with two values in the `foreignKeys` object allows to configure
idKeys per type.
