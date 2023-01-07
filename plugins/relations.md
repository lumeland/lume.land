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

site.use(relations({
  // Your config here
}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/relations.ts/~/Options).

## Usage

This plugin requires to specify the page types and their foreign key used to
make the relation. For example:

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

In the following example, there are some pages of `type: article` or
`type: author`. The pages of type `article` include the relation with the
author, using the foreign key `author_id`:

<lume-code>

```yml {title=/article-1.md}
---
id: 1
type: article
author_id: 2
---

Content of article 1, by Laura
```

```yml {title=/article-2.md}
---
id: 2
type: article
author_id: 2
---

Content of article 2, by Laura
```

```yml {title=/article-3.md}
---
id: 3
type: article
author_id: 1
---

Content of article 3, by Óscar
```

```yml {title=/oscar.md}
---
id: 1
type: author
title: Óscar Otero
---

Bio of Óscar
```

```yml {title=/laura.md}
---
id: 2
type: author
title: Laura Rubio
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
  {{ content | safe }}
  
  <footer>By {{ author.title }}</footer>
</article>
```

</lume-code>

The plugin also creates the inverse relation (`n:1` relation) and creates the
variable `article` that is an array with all articles related to each author:

<lume-code>

```html{title=_includes/layouts/author.njk}
<article>
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

## Customize the id and type key

By default, the pages are identified by the value of the `type` and `id` keys.
You can change it globally in the config:

```js
site.use(relations({
  typeKey: "kind",
  idKey: "slug",
  foreignKeys: {
    article: "article_id",
    author: "author_id",
  },
}));
```

## Configure individual relations

You can use an object to configure individual relations. The available options
are:

- `foreignKey` (required): The key name use to set a relation (for example
  `article_id`).
- `relationKey`: The key name use to store the relation (for example `article`).
- `pluralRelationKey`: The key name use to store the relation if it's a multiple
  relation (for example `articles` instead of `article`).
- `idKey`: The key name used to identify the entity (by default is `id`).

Let's see an example:

```js
site.use(relations({
  foreignKeys: {
    article: "article_id",
    author: {
      foreignKey: "author_id",
      relationKey: "author",
      pluralRelationKey: "authors"
      idKey: "name",
    },
  },
}));
```

In this example, the pages of type `author` have a custom configuration:

- The foreign key is `author_id`.
- The relation key is `author`. For example, the author related with an article
  is stored in the `author` key.
- The plural relation key is `authors`. If an article has multiple authors, they
  are stored in the `authors` key.
- The id key is `name` instead of `id`.
