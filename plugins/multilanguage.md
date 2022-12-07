---
title: Multilanguage
description: Create multiple language versions of the same page
docs: plugins/multilanguage.ts/~/Options
tags:
  - utils
---

## Description

This plugin makes easier the creation of a multilanguage site by generating
different language versions from the same page or detect and create
`<link rel="alternate" hreflang="{lang}" href="{url}" />` elements
automatically.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";

const site = lume();

site.use(multilanguage());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/multilanguage.ts/~/Options).

## Multilanguage pages from a single file

You can export the same page multiple times, once per language. To configure a
page as multilanguage, just set in the `lang` variable to an array with the
available languages. For example:

<lume-code>

```yml {title=about-me.yml}
# This page is in 3 different languages: English, Galician, and Spanish.
lang: [en, gl, es]
title: About me
layout: base-layout.njk
```

</lume-code>

Lume will generate three pages, one per language, prefixing the output path of
each page with the language code:

```txt
/en/about-me/index.html
/gl/about-me/index.html
/es/about-me/index.html
```

This makes no sense if all pages have the same content. We need to set different
values for each language. One way to do this is by adding a suffix to the
variable name with a dot plus the language code. For example:

<lume-code>

```yml {title=about-me.yml}
# This page is in 3 different languages: english, galician and spanish.
lang: [en, gl, es]

title: About me # The default title
title.gl: Acerca de min # The title in galician
title.es: Acerca de mí # The title in spanish

layout: base-layout.njk # Common value for all languages
```

</lume-code>

In the example above, the `title` value has different values for `gl` and `es`
languages. Any unsuffixed value (like `layout`) is used by all languages unless
there's a suffixed value for that specific language.

You can use suffixed variables inside other objects or arrays. For example:

<lume-code>

```yml {title=about-me.yml}
# This page is in 3 different languages: English, Galician, and Spanish.
lang: [en, gl, es]
title: About me
title.gl: Sobre min
title.es: Acerca de mí
layout: base-layout.njk

links:
  - title: My personal site
    title.gl: O meu sitio persoal # The link title in galician
    title.es: Mi sitio personal # The link title in spanish
    url: https://oscarotero.com

  - title: Lume
    url: https://lume.land
```

</lume-code>

The `links` array contains a list of links. Some titles need to be translated to
other languages (like the first one), others don't.

### Customize the URLs

You can customize the URLs of the multilanguage pages by adding the language
suffix to the `url` variable:

<lume-code>

```yml {title=about-me.yml}
lang: [en, gl, es]
title: About me
title.gl: Sobre min
title.es: Acerca de mí
layout: base-layout.njk

url.en: /about-me/
url.gl: /sobre-min/
url.es: /acerca-de-mi/
```

</lume-code>

### Alternative way to define data

In addition to the suffixes, another way to define different data per language
is by creating a root variable with the language code. This can be more useful
in some cases. For example:

<lume-code>

```yml {title=about-me.yml}
lang: [en, gl, es]
en:
  title: About me
  url: /about-me/
gl:
  title: Sobre min
  url: /sobre-min/
es:
  title: Acerca de mí
  url: /acerca-de-mi/

layout: base-layout.njk
```

</lume-code>

## Multilanguage pages from multiple files

Creating multiple language versions from a single file is useful to avoid
duplicated content in cases in which the different languages have many common
data.

But in other cases is more convenient to have a file per language. This plugin
can detect these files if they fulfill the following requirements:

- They are in the same directory.
- They have the `lang` variable defined.
- They have the same filename ending with the `_[lang]` suffix.

In the following example we can see three files containing the same post but in
different languages:

```txt
|_ /posts
  |_ /about-me_en.md
  |_ /about-me_gl.md
  |_ /about-me_es.md
```

The plugin can identify these three pages as language versions of the same page,
and they will be exported as `/en/about-me/`, `/gl/about-me/` and
`/es/about-me/`. Note that you can customize the `url` of the pages.

If there's a page without the language defined in the filename it will be
detected too:

```txt
|_ /posts
  |_ /about-me.md
  |_ /about-me_gl.md
  |_ /about-me_es.md
```

In this example, the first file doesn't have the language suffix, but it's
identified as another language version. This is useful if you already have a
site with only one language and want to add other languages progressively
without affeting to the existing urls. In this case, the URLs generated are
`/posts/about-me/`, `/gl/about-me/` and `/es/about-me/`.

## Links to the translated languages

### Automatic rel=alternate links

This plugin not only creates the pages for the different languages, but also
automatically inserts the
`<link rel="alternate" hreflang="{lang}" href="{url}" />` element in the
multilanguage pages. For example:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>About me</title>

    <link rel="alternate" hreflang="gl" href="/sobre-min/" />
    <link rel="alternate" hreflang="es" href="/acerca-de-mi/" />
  </head>
  <body>
    ...
  </body>
</html>
```

Note that the attribute `lang` will be inserted automatically in the `html`
element if it's missing.

### Create a language switcher menu

If you want to create a menu to see the current page in other languages, you can
use the variable `alternates` with all alternative pages. This is an example in
nunjucks:

<lume-code>

```html {title=_includes/layout.njk}
<ul class="languages">
{% for pageLang, page in alternates %}
  <li>
    <a href="{{ page.data.url }}" {% if pageLang == lang %}aria-current="page"{% endif %}>
      {{ page.data.title }} ({{ pageLang }})
    </a>
  </li>
{% endfor %}
</ul>
```

</lume-code>

This code outputs something like:

```html
<ul class="languages">
  <li>
    <a href="/about-me/" aria-current="page">
      About me (en)
    </a>
  </li>
  <li>
    <a href="/sobre-min/">
      Sobre min (gl)
    </a>
  </li>
  <li>
    <a href="/acerca-de-mi/">
      Acerca de mí (es)
    </a>
  </li>
</ul>
```

## Multilanguage paginations

If you want to search and paginate multilanguage pages (for example a blog with
posts translated to several languages), this plugin also includes the
`mergeLanguages` helper to make it easier.

<lume-code>

```js {title=posts.js}
export default function* ({ search, paginate, mergeLanguages }) {
  // Search all posts in english, galician and spanish
  const enPages = search.pages("lang=en type=post");
  const glPages = search.pages("lang=gl type=post");
  const esPages = search.pages("lang=es type=post");

  // Paginate the results
  const en = paginate(enPages, { url: (n) => `/en/posts/${n}/` });
  const gl = paginate(glPages, { url: (n) => `/gl/posts/${n}/` });
  const es = paginate(esPages, { url: (n) => `/es/posts/${n}/` });

  // Merge and yield all paginations
  yield* mergeLanguages({en, gl, es});
}
```

</lume-code>
