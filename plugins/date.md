---
title: Date
description: To manipulate date & time values in different locales
docs: plugins/date.ts/~/Options
tags:
  - utils
---

## Description

This plugin registers the `date` filter, which allows manipulating and
formatting a datetime value in different locales. It uses the
[date-fns](https://date-fns.org/) library under the hood.

```html
<time>{{ createdAt | date }}</time>
```

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";

const site = lume();

site.use(date());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/date.ts/~/Options).

## Formats

By default, the value is formatted to `yyyy-MM-dd`, but you can use the first
argument to set a different format. See the
[`date-fns` documentation](https://date-fns.org/v2.22.0/docs/format) for more
info.

```html
<time>{{ createdAt | date('MM/dd/yyyy') }}</time>
```

There are some predefined formats that you can use:

| Name             | Format                     |
| ---------------- | -------------------------- |
| `ATOM`           | `yyyy-MM-dd'T'HH:mm:ssxxx` |
| `DATE`           | `yyyy-MM-dd`               |
| `DATETIME`       | `yyyy-MM-dd HH:mm:ss`      |
| `TIME`           | `HH:mm:ss`                 |
| `HUMAN_DATE`     | `PPP`                      |
| `HUMAN_DATETIME` | `PPPppp`                   |

```html
<time datetime="{{ createdAt | date }}">
  {{ createdAt | date('HUMAN_DATE') }}
</time>
```

After installing the plugin you can edit or add more named formats, so it's
easier to apply them in templates:

<lume-code>

```js {title="_config.ts"}
site.use(date({
  formats: {
    "MY_FORMAT": "MM-dd-yyyy",
  },
}));
```

```html {title=".njk"}
<time>{{ createdAt | date('MY_FORMAT') }}</time>
```

</lume-code>

## Locales

`date-fns` has support for
[multiple locales](https://deno.land/x/date_fns/locale). You can configure them
in `_config.ts`:

```js
import date from "lume/plugins/date.ts";

site.use(date({
  locales: ["gl", "es"],
}));
```

Use the second argument to set the locale:

```html
<time datetime="{{ createdAt | date }}">
  {{ createdAt | date("HUMAN_DATE", "gl") }}
</time>
```

The first locale set in the `_config.js` is also used as the default locale.
{.tip}
