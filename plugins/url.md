---
title: URL
description: Provide the `url` filter to fix and resolve URLs.
enabled: true
tags:
  - urls
---

## Description

This plugin provides the `url` and `htmlUrl` filters to fix the page URLs in the
pages and layouts.

## Installation

This plugin is installed by default. 🎉

## `url` filter

The filter `url` normalizes a single path with the location value that you have
configured in `_config.js`. It's useful if your site is in a subdirectory or you
want to generate absolute URLs.

```vento
<a href="{{ '/about-us' |> url }}">

<!-- Full URL -->
<a href="{{ '/about-us' |> url(true) }}">
```

> [!tip]
>
> If you don't want to use this filter everywhere, you may be interested in the
> [Base path plugin](./base_path.md).

### URLs from source files

Use the character `~` to use the source file name instead of the final URL. The
plugin automatically will detect the final URL for you. This is useful for
dynamic URLs and automatically updating all links to a page when the URL of this
page changes. For example:

```vento
<a href="{{ '~/about-us.md' |> url }}">

<!-- Will be converted to -->
<a href="/about-us/">
```

Some source files can [generate multiple pages](../docs/core/multiple-pages.md).
You can include a query after the file name to select the specific page
generated by the source file. For example:

```vento
<a href="{{ '~/about-us.page.js(lang=en)' |> url }}">

<!-- Will be converted to -->
<a href="/en/about-us/">
```

In the previous example, the `(lang=en)` query select the page with the `lang`
variable set to `en` among all pages generated by `about-us.page.js` file.

## `htmlUrl` filter

This filter is similar to `url` but it works with HTML code: it searches and
normalizes all URLs found in `href` and `src` attributes:

```yml
---
text: 'Go to <a href="/">Homepage</a>'
---
<div>{{ text | htmlUrl | safe }}</div>
```

## Example

As a good SEO practice, you can consider adding a canonical URL to your `<head>`
section (e.g. in a `base.vto` template) like this:

```vento
<link rel="canonical" href="{{ url |> url(true) }}">
```
