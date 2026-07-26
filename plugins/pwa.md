---
title: PWA
description: Generate the manifest.json file to create a Progressive Web Application.
mod: plugins/pwa.ts
tags:
  - utils
---

## Description

[Progressive web apps](https://developer.mozilla.org/docs/Web/Progressive_web_apps)
allow you to convert websites to apps installable in your operating system. This
plugin makes the job of creating a PWA easier, generating the `manifest.json`
file and the minimal icons required by all platforms.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import pwa from "lume/plugins/pwa.ts";

const site = lume();

site.use(pwa());

export default site;
```

## Usage

Create the `app` variable in the page that you want to use as
the entry point (typically the homepage). Let's see an example.

```yml
---
title: Page title
description: Page description
tags:
  - one
  - two
metas:
  color: "#cc104a"
app:
  name: =title
  search_params: source=pwa
  short_name: "My app"
  description: =description
  color: =metas.color
  categories: =tags
  icon: favicon.svg
---

Page content
```

Just like with other plugins like [metas](./metas.md) or [feed](./feed.md), it's possible to use aliases to other variables (i.e. `app.name`
is an alias to `title`). The plugin will generate the manifest file and the
icons in different sizes using the `favicon.svg` file as the input image.

PWA can have shortcuts (additional pages shown in a submenu). Use the `shortcut`
variable in other pages to add shortcuts to your application:

```yml
---
title: Page title
description: Page description

shortcut:
  name: =title
  description: =description
---

Page content
```
