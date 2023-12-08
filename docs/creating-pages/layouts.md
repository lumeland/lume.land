---
title: Layouts
description: Set the layouts to render the pages
order: 3
---

Layouts are templates that wrap around your content. They allow you to have the
source code for your template in one place, so you don’t have to repeat things
like the navigation and footer on every page.

Layout files are loaded from a special directory named `_includes`. This
directory can contain not only layouts but other files, so a good practice is to
save them in a subdirectory like `_includes/layouts`.

In the following page, we have defined the variable `layout` with the name of
the template that we want to use:

```yml
---
title: This is the front matter
layout: layouts/main.vto
---

# This is the page content
Here you can write Markdown content
```

**Lume** has support for many template engines. In this example, the layout file
has the extension `.vto`, used by the [Vento](https://vento.js.org/) template
engine:

```vento
<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
  </head>

  <body>
    <main>
      {{ content }}
    </main>
  </body>
</html>
```

**Lume** will search for the file `_includes/layouts/main.vto` (note that all
layouts are relative to `_includes` directory).

The template can use any variable from the page, for example, `title` to render
the title, and `content` with the rendered Markdown content of the page.

## Layout data

Layouts can have additional data that will be merged with the data from the
page. Note that variables defined in the pages have precedence over the
variables in the layouts. This means that you can set default values in the
layouts and override them within the pages.

A layout can be wrapped around another layout. Just set a `layout` variable in
the front matter. In the following examples, the layout uses the
`layouts/main.vto` layout as a wrapper.

<lume-code>

```yml { title="page.md" }
---
title: This is the front matter
layout: layouts/page.vto
---

# This is the page content
Here you can write Markdown content
```

```vento { title="_includes/layouts/page.vto" }
---
title: Default page title
language: en
layout: layouts/main.vto
---

<article lang="{{ language }}">
  <header>
    <h1>{{ title }}</h1>
  </header>

  {{ content }}
</article>
```

```vento { title="_includes/layouts/main.vto" }
---
title: Default main title
language: en
---
<!doctype html>

<html lang="{{ language }}">
  <head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
  </head>

  <body>
    <main>
      {{ content }}
    </main>
  </body>
</html>
```

</lume-code>
