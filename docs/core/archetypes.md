---
title: Archetypes
description: Scripts to create a templates for new content. 
order: 13
---

Archetypes are scripts that create new files in your source directory with some
preconfigured content. A typical example are the posts of a blog: instead of
creating a new markdown file from scratch every time you want to create a new
post, you can create and run an archetype to do this job for you.

The archetypes in Lume are JavaScript or TypeScript files, stored in the
`_archetypes` directory that default export a function returning an object with
the path and the content of the file that is going to be created. For example:

```ts
// _archetypes/example.js

export default function () {
  return {
    path: "/pages/example.md",
    content: "Content of the file",
  };
}
```

This archetype creates the file `/pages/example.md` inside your `src` directory
with the content `Content of the file`. The archetype filename is `example.js`,
so the name of the archetype is `example`. To execute it just run
`deno task lume new example` (or simply `lume new example` if you're using the
Lume CLI).

## Run archetypes

As you can see, to run an archetype, just run
`deno task lume new [archetype_name]`. The archetype name is the file name
(without extension) and Lume will search that file in the `_archetypes`
directory, inside the `src` folder.

It's possible to run other archetypes using a relative path. In this case you
need to include the path of the file including the extension. For example:

```sh
deno task lume new ./my-templates/new-post.ts
```

Use an URL to run a remote archetype:

```sh
deno task lume new https://example.com/my-templates/new-post.ts
```

## Content

The `content` variable can be a string, a `Uint8Array` (for binary files) or an
object. If the content is an object, it will be converted to a string depending
on the extension of the path:

- If the `path` has the `yml` or `yaml` extension, the object will be
  stringified to YAML.
- If the `path` has the `json` extension, the object will be stringified to
  JSON.
- For other extensions, the object will be converted to frontmatter + text.

This is an example of YAML conversion:

<lume-code>

```ts {title="Archetype"}
export default function () {
  return {
    path: "/pages/example.yml",
    content: {
      title: "Title content",
      content: "Page content",
    },
  };
}
```

```yml {title="/pages/example.yml"}
title: Title content
content: Page content
```

</lume-code>

Same example but for JSON conversion:

<lume-code>

```ts {title="Archetype"}
export default function () {
  return {
    path: "/pages/example.json",
    content: {
      title: "Title content",
      content: "Page content",
    },
  };
}
```

```yml {title="/pages/example.json"}
{
  "title": "Title content",
  "content": "Page content"
}
```

</lume-code>

Same example but for any other extension (for example, `md`):

<lume-code>

```ts {title="Archetype"}
export default function () {
  return {
    path: "/pages/example.md",
    content: {
      title: "Title content",
      content: "Page content",
    },
  };
}
```

```md {title="/pages/example.md"}
---
title: Title content
---

Page content
```

</lume-code>

## Passing arguments

Arguments allow to pass variables to the archetype to configure how the new
content is created. For example, we want to create new pages based on the
provided title:

```ts
// _archetypes/page.ts

export default function (title: string) {
  const slug = title.replace(/\s+/g, "-").toLowerCase();

  return {
    path: `/pages/${slug}.md`,
    content: {
      title: title,
      content: "Page content",
    },
  };
}
```

This function uses the `title` argument to generate the final path and the
content. Now you can run `deno task lume new page "My first page"` (or
`lume new page "My first page"` if you're using the Lume CLI), and the new
`/pages/my-first-page.md` file will be created. Any extra argument passed to the
CLI command will be passed to the archetype's function.

## Multiple files

It's possible to generate multiple files from the same archetype. To do that,
use a generator to yield all files. In the following example, the archetype
creates a new section in the site with several pages and a `_data.yml` file:

```ts
// _archetypes/section.ts

export default function* (title: string) {
  const slug = title.replace(/\s+/g, "-").toLowerCase();

  // Create the shared data
  yield {
    path: `/pages/${slug}/_data.yml`,
    content: {
      layout: "section.njk",
      section_title: title,
    },
  };

  // Create 3 more pages
  const pages = [1, 2, 3];
  for (const page of pages) {
    yield {
      path: `/pages/${slug}/${page}.md`,
      content: {
        title: `Page ${page}`,
        content: "Write the content here",
      },
    };
  }
}
```

As you can see, Lume's archetypes are simple but flexible and powerful. And
because they are just plain JavaScript/TypeScript files, it's possible to reuse
them. For example, you can create an archetype that imports other archetypes.
