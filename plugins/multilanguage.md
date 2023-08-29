---
title: Multilanguage
description: Create multiple language versions of the same page
docs: plugins/multilanguage.ts/~/Options
mod: plugins/multilanguage.ts
tags:
  - utils
---

## Description

This plugin provides some features to make easier the creation of multilanguage
sites.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";

const site = lume();

site.use(multilanguage({
  languages: ["en", "gl", "es"], // Available languages
}));

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/multilanguage.ts/~/Options).

## Create pages in multiple languages

This plugin uses the `id` variable to detect the different translations of the
same page. For example, let's say we have the following two pages:

```yml
---
lang: en
id: about
url: /about-me/
---

# About me
```

```yml
---
lang: gl
id: about
url: /acerca-de-min/
---

# Acerca de min
```

The plugin interprets these two pages as the same content but in different
languages, because they have the same id (`about`).

The pages will be exported as `/en/about-me/`, `/gl/acerca-de-min/`. Note that
the `/en/` and `/gl/` prefixes are automatically added.

It's possible to configure one language as default, so any page in this language
won't have the prefix in the URL. For example, consider the following
configuration:

```js
site.use(multilanguage({
  languages: ["en", "gl", "es"], // Available languages
  defaultLanguage: "en", // The default language
}));
```

Now, the pages will be exported as `/about-me/` and `/gl/acerca-de-min/`. The
english version doesn't have the `/en/` prefix because it's the default
language.

## Create links to translations

### Automatic rel=alternate links

Because this plugin detects the different language version for every page, it
inserts automatically the
`<link rel="alternate" hreflang="{lang}" href="{url}" />` elements in each
pages. For example:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>About me</title>

    <link rel="alternate" hreflang="gl" href="/gl/acerca-de-min/" />
  </head>
  <body>
    ...
  </body>
</html>
```

The attribute `lang` is inserted automatically in the `html` element if it's
missing.{.tip}

### Create a language switcher menu

The plugin also exposes the `alternates` variable, that you can use to build a
menu to change the language of the current page. This is an example in nunjucks:

<lume-code>

```html {title=_includes/layout.njk}
<ul class="languages">
{% for alt in alternates %}
  <li>
    <a href="{{ alt.url }}" {% if alt.lang == lang %}aria-current="page"{% endif %}>
      {{ alt.title }} ({{ alt.lang }})
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

## Multilanguage data

### Language suffixes

With this plugin, you can have your data in different languages that will be
correctly resolved according to the language of each page. For example, let's
say we have the following `_data.yml` file:

```yml
site_name: The Óscar's blog
site_name.gl: O blog de Óscar
site_name.es: El blog de Óscar
```

The variable `site_name` has a different value for each language. Any variable
ending with a dot following by one of the languages defined in the `_config`
file is considered a translation. We can use the `site_name` variable in our
pages and the value will be different depending on the page's language:

<lume-code>

```html{title="english"}
---
lang: en
---

<h1>{{ site_name }}</h1> <!-- Outputs: The Óscar blog -->
```

```html{title="galician"}
---
lang: gl
---

<h1>{{ site_name }}</h1> <!-- Outputs: O blog de Óscar -->
```

```html{title="spanish"}
---
lang: es
---

<h1>{{ site_name }}</h1> <!-- Outputs: El blog de Óscar -->
```

</lume-code>

It's possible to translate variables inside objects and arrays. In the following
example, the `title` value inside the `links` array is different for each
language.

```yml
site_name: The Óscar's blog
site_name.gl: O blog de Óscar
site_name.es: El blog de Óscar

links:
  - title: My personal site
    title.gl: O meu sitio persoal # The link title in galician
    title.es: Mi sitio personal # The link title in spanish
    url: https://oscarotero.com

  - title: Lume
    url: https://lume.land
```

### Language root variables

In addition to the suffixes, another way to define different data per language
is by creating a root variable with the language code. This can be more useful
in some cases. For example:

```yml
en:
  site_name: The Óscar's blog
  subtitle: My personal opinions

gl:
  site_name: O blog de Óscar
  subtitle: As miñas opinións persoais

es:
  site_name: El blog de Óscar
  subtitle: Mis opiniones personales
```

## Multilanguage pages from a single file

With this plugin it's possible to export the same page multiple times, once per
language. To configure a page as multilanguage, just set in the `lang` variable
to an array with the available languages. For example:

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

We can use the language suffixes to assign different data per language:

<lume-code>

```yml {title=about-me.yml}
lang: [en, gl, es]

title: About me # The default title
title.gl: Acerca de min # The title in galician
title.es: Acerca de mí # The title in spanish

layout: base-layout.njk # Common value for all languages
```

</lume-code>

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
