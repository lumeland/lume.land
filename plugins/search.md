---
title: Search
description: Provide a helper to search pages from other pages.
mod: plugins/search.ts
enabled: true
tags:
  - nav
---

## Description

This plugin registers the `search` helper to search pages from other pages. It's
useful to build menus or other navigation stuff.

## Installation

This plugin is installed by default. 🎉

## Searching pages

The function `search.pages()` returns an array of pages that you can filter and
sort.

To search by tags, just include the tag names as the first argument, separated
by spaces. For example, to search all pages containing the tags `post` and
`html`, you would execute `search.pages("post html")`:

```vento
<ul>
  {{ for post of search.pages("post html") }}
  <li>{{ post.title }}</li>
  {{ /for }}
</ul>
```

You can use quotes to search for tags containing spaces. For example to search
by the tags `post` and `static site generator`:

```vento
<ul>
  {{ for post of search.pages("post 'static site generator'") }}
  <li>{{ post.title }}</li>
  {{ /for }}
</ul>
```

Use the exclamation mark to search pages that doesn't contain a specific tag.
For example, to search pages with the tag "post" not containing the tag "html":

```vento
<ul>
  {{ for post of search.pages("post !html") }}
  <li>{{ post.title }}</li>
  {{ /for }}
</ul>
```

## Sort pages

The second argument is the value used to sort. By default, the pages are sorted
by `date`, but you can use any field. For example, if you want to sort by title:

```vento
<ul>
  {{ for post of search.pages("post html", "title") }}
  <li>{{ post.title }}</li>
  {{ /for }}
</ul>
```

Note: You can use dot notation to sort by any subfield. For example:
`header.title`.

Sorting allows specifying multiple fields. For example let's sort by the "order"
and "title" fields:

```vento
{{ for post of search.pages("post html", "order title") }}
  ...
{{ /for }}
```

By default, sort is ascendening, but this can be changed by appending `=desc` to
the field name:

```vento
{{ for post of search.pages("post html", "order=asc title=desc") }}
  ...
{{ /for }}
```

As of Lume 2.3.0 there are two new sorting options, useful for strings with
accents or different cases: the `asc-locale` and `desc-locale`. Under the hood,
it uses the
[localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
comparison method, so these options must be used only with strings.

```vento
{{ for post of search.pages("post html", "order=asc title=desc-locale") }}
  ...
{{ /for }}
```

### Limit the results

The third argument of `search.pages()` allows limiting the number of results.
You can use a positive number to return the first `n` results or a negative
number to return the last `n` results:

```vento
<!-- Get the 3 first values -->
{{ for post of search.pages("post html", "order title", 3) }}
  ...
{{ /for }}

<!-- Get the 3 last values -->
{{ for post of search.pages("post html", "order title", -3) }}
  ...
{{ /for }}
```

### Filtering by a field

You can filter pages not only by tags but also by any other field that you want.
For example, to search all pages with the value `menu` as `true`, simply include
the query `menu=true`:

```vento
{{ for option of search.pages("menu=true") }}
<a href="{{ option.url }}">
  {{ option.title }}
</a>
{{ /for }}
```

The available operators for the conditions are:

- `=` to search coincidences, for example `menu=true`. The strings `true` and
  `false` are converted to booleans automatically. `undefined` and `null` are
  also converted so you can filter pages without a value with
  `keyname=undefined`. The strings with numeric values are also converted to
  numbers.
- `^=` to search values starting with another value. For example all categories
  starting with the letter `A`: `category^=A`.
- `$=` to search values ending with another value. For example all categories
  ending with the letter `b`: `category$=b`.
- `*=` to search values containing another value. For example all titles
  containing the string `security`: `title*=security`.
- `<`, `>`, `<=`, `>=` to search values lower or greater than the other value.
  For example, all pages with level greater than 2: `level>2`.

You can use the dot notation and even combine queries with tags. For example,
let's say you want to select all pages with the value `taxonomy.category=sport`
and with the tag `football`:

```vento
{{ for post of search.pages("taxonomy.category=sport football") }}
<a href="{{ post.url }}">
  {{ post.title }}
</a>
{{ /for }}
```

### Negative conditions

You can prepend the `!` character to the operator to negate the condition. For
example while `menu=true` returns pages whose `menu` variable is `true`,
`menu!=true` returns pages whose `menu` variable is NOT `true`.

All operators accepts NOT operators. For example `category!^=A` (pages which
categories that does NOT start with the letter `A`), or `title!*=security`
(pages whose title does NOT contain the word "security").

Alternatively, you can prepend the `!` character at the begining of the
condition. For example `!menu=true` is equivalent to `menu!=true`, and
`!category^=A` is equivalent to `category!^=A`.

### Using `|` for OR conditions

You can assign several values for any condition using the pipe character `|`.
For example, if you want to search pages having the tag `html` OR `css`, you can
do it with `search.pages("html|css")`. You can combine AND and OR using spaces
and pipes. For example, to search all pages with the tag `post` and also one of
the tags `html` or `css`: `search.pages("post html|css")`.

OR conditions can be used with other fields. For example, to search pages with
titles containing the words "html", "css" or "javascript":
`search.pages("title*=html|css|javascript")`.

## Search one page

The function `search.page()` is very similar to `search.pages()` but only
returns the first page found. Note the `limit` argument is not available.

## Searching next and previous page

If the current page belongs to a list of pages (for example, a list of pages
under the same tag), you can get the previous and next page in this list. To do
that we have the functions `search.previousPage()` and `search.nextPage()`. The
syntax is the same as `search.pages()`, but the first argument is the URL of the
current page. Let's see an example:

```vento
<h2>More articles tagged as "html"</h2>

{{ set post = search.previousPage(url, "html") }}

{{ if post }}
  <a href="{{ post.url }}" rel="prev">← {{ post.title }}</a>
{{ /if }}

{{ set post = search.nextPage(url, "html") }}

{{ if post }}
  <a href="{{ post.url }}" rel="next">{{ post.title }} →</a>
{{ /if }}
```

## Get all values of a key

The function `values()` returns all values found for a specific key, removing
duplicates. For example, let's say your pages have the variable `author` and you
want to list all authors:

```vento
<strong>List of authors:</strong>

<ul>
  {{ for author of search.values("author") }}
  <li>
    {{ author }}
  </li>
  {{ /for }}
</ul>
```

Use the second argument to filter the pages to get the values. For example, to
get the authors of pages in the category `sport`:
`search.values("author", "category=sport")`.

## Searching data

The function `data` returns the data associated with any file or directory in
the source directory. This is useful to get the data stored in any `_data` of
any directory. For example:

```vento
{{ set companyData = search.data("about/the-company") }}
```

## Search files

The function `files()` allows to search any file that will be copied to the
`dest` folder and returns its URL. It accepts an regular expression or a string
with a glob expression. For example, to search all CSS files:

```vento
This site uses the following CSS files:

<ul>
  {{ for file of search.files("*.css") }}
  <a href="{{ file }}">
    {{ file }}
  </a>
  {{ /for }}
</ul>
```
