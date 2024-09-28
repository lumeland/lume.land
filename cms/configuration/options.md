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

## site

This is an object to configure the CMS website. You can assign a name, a
description, URL and a body, that will be visible in the homepage:

```js
import lumeCMS from "lume/cms.ts";

const cms = lumeCMS({
  site: {
    name: "My blog CMS",
    description: "Here I can edit the content of my blog",
    url: "https://myblog.com",
    body: `
    <p>Long text, for instructions or other content that you want to make it visible in the homepage</p>
    `,
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

## data

It's where you can pass arbitrary data to use later inside the fields. Lume
automatically insert the `lume` instance. More info at
[Fields configuration](./fields.md#the-init-function)

## log

To configure the method to store the logs. For now, there's only a property to
define the filename to store the error logs. Useful for self-hosted CMS.

```js
const cms = lumeCMS({
  log: {
    filename: "errors.log",
  },
});
```

## extraHead

A string that you can use to include extra HTML code in the CMS. Useful to
customize the appearance:

```js
const cms = lumeCMS({
  extraHead: `
<style>
  body {
    color: pink;
  }
</style>
  `,
});
```
