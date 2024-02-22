---
title: Options
description: Configure LumeCMS instance
order: 0
---

LumeCMS instantation accepts an object with some configuration options:

```js
import lumeCMS from "lume/cms.ts";

const cms = lumeCMS({
  /* Options */
});
```

The available options are:

## Basic options

### root

This is the root directory of the site you want to edit. Lume automatically set
this value to the `src` folder. It's used to file system storage
[when it's defined as a string](./storage.md#file-system).

### basePath

The public base path of the CMS. Lume adapter set this value to `/admin`.

## Site

This is an object to configure the CMS website. You can assign a name, a
description and an URL that will be visible in the homepage:

```js
import lumeCMS from "lume/cms.ts";

const cms = lumeCMS({
  site: {
    name: "My blog CMS",
    description: "Here I can edit the content of my blog",
    url: "https://myblog.com",
  },
});
```

## auth

It's an object to configure the authentication type. For now, only `basic`
method is available:

```js
const cms = lumeCMS({
  auth: {
    method: "basic",
    users: {
      user1: "password1",
      user2: "password2",
    },
  },
});
```
