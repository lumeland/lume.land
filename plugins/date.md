---
title: Date
description: To manipulate date & time values in different locales
docs: plugins/date.ts/~/Options
tags:
  - utils
---

${toc}

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";

const site = lume();

site.use(date({/* your config here */}));

export default site;
```

To see all configuration options, click in the "See available Options in Deno
Doc" button above.

## Description

This plugin register the `date` filter, that allows to manipulate and format a
datetime value in different locales. It uses [date-fns](https://date-fns.org/)
library under the hood.

```html
<time>{{ createdAt | date }}</time>
```

## Formats

By default, the value is formatted to `yyyy-MM-dd` but you can use the first
argument to set a different format. See the
[`date-fms` documentation](https://date-fns.org/v2.22.0/docs/format) for more
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

On install the plugin you can edit or add more formats under a name, so it's
more easy to apply them in the templates:

<lume-code>

```js {title="Configuration"}
site.use(date({
  formats: {
    "MY_FORMAT": "MM-dd-yyyy",
  },
}));
```

```html {title="Nunjucks"}
<time>{{ createdAt | date('MY_FORMAT') }}</time>
```

</lume-code>

## Locales

`date-fns` has support for
[multiple locales](https://deno.land/x/date_fns@v2.22.1/locale). If you want to
use them, just import and register them in `_config.js`:

```js
import date from "lume/plugins/date.ts";
import gl from "https://deno.land/x/date_fns@v2.22.1/locale/gl/index.js";
import es from "https://deno.land/x/date_fns@v2.22.1/locale/es/index.js";

site.use(date({
  locales: { gl, es },
}));
```

Use the second argument to set the locale:

```html
<time datetime="{{ createdAt | date }}">
  {{ createdAt | date('HUMAN_DATE', 'gl') }}
</time>
```

The first locale set in the `_config.js` is used also as the default locale.
{.tip}
