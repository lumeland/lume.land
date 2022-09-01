---
title: Multilanguage
description: Create multiple language versions of the same page
docs: plugins/multilanguage.ts/~/Options
tags:
  - utils
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";

const site = lume();

site.use(multilanguage({/* your config here */}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/multilanguage.ts/~/Options).

## Description

This plugin allows to export the same page multiple times, one per language. To
configure a page as multilanguage, just set in the `lang` variable an array with
the available languages. For example:

<lume-code>

```yml {title=about-me.yml}
# This page is in 3 different languages: english, galician and spanish.
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

### Define the data

You may want to set different data per language. One way adding a suffix to the
variable name with a dot plus the language code. For example:

<lume-code>

```yml {title=about-me.yml}
# This page is in 3 different languages: english, galician and spanish.
lang: [en, gl, es]
title: About me
title.gl: Acerca de min
title.es: Acerca de mí
layout: base-layout.njk
```

</lume-code>

In the example above, the `title` value has different values for `gl` and `es`
languages. Any unsuffixed value (like `layout`) is used by all languages, unless
there's another suffixed value for a specific language.

You can use suffixed variables inside other objects or arrays. For example:

<lume-code>

```yml {title=about-me.yml}
# This page is in 3 different languages: english, galician and spanish.
lang: [en, gl, es]
title: About me
title.gl: Sobre min
title.es: Acerca de mí
layout: base-layout.njk

links:
  - title: My personal site
    title.gl: O meu sitio persoal
    title.es: Mi sitio personal
    url: https://oscarotero.com

  - title: Lume
    url: https://lume.land
```

</lume-code>

The `links` array contains a list of links. Some titles needs to be translated
to other languages (like the first one), others don't.

### Customize the urls

You can customize the urls of the multilanguage pages by adding the language
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
is creating a root variable with the language code. This can be more useful in
some case. For example:

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

## Links to the translated languages

### Automatic rel=alternate links

This plugin not only create the different languages, but also insert
automatically the `<link rel="alternate" hreflang="{lang}" href="{url}" />`
element in the multilanguage pages. For example:

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

Note that the attribute `lang` will be inserted automatically to the `html`
element if it's missing.

### Create a language switcher menu

If you want to include the links to the other translations, this plugin also
create the variable `alternates` with all alternative pages. This is an example
in nunjucks:

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
posts translated to several languages), this plugin includes also the
`mergeLanguages` helper to make it more easy.

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
