---
title: Storage
description: Setup different storages for your CMS
order: 0
---

With LumeCMS you can register different storages to use later to your documents,
collections and uploads. Use the `cms.storage()` function to register a storage
method to your CMS:

```ts
import lumeCMS from "lume_cms/mod.ts";

const cms = lumeCMS();

cms.storage("name" /* Storage instance */);

export default cms;
```

LumeCMS support the following storages:

## Lume sites

For sites built with Lume, **you don't have to customize the storage,** because
Lume automatically register the `src` filesystem storage pointing to the `src`
folder of your site.

## File system

To define a filesystem storage in your config file, import the class and
register it with a name. For example, let's register a file system storage under
the name "my_files":

```ts
import lumeCMS from "lume_cms/mod.ts";
import Fs from "lume_cms/storage/fs.ts";

const cms = lumeCMS();

cms.storage(
  "my_files",
  new Fs({
    root: Deno.cwd() + "/files",
  }),
);

export default cms;
```

Now we can use the `my_files` storage to read and write content by the CMS.
Because the file system is the most common way to read and write data, the
example above can be simplified as following:

```ts
import lumeCMS from "lume_cms/mod.ts";

const cms = lumeCMS();

cms.storage("my_files", "files");

export default cms;
```

As you can see, if you define a string as the storage, LumeCMS assume it's a
folder name, so the file system storage is used automatically.

## KV

[Deno Kv](https://docs.deno.com/deploy/kv/manual) is a key-value database built
directly into the Deno runtime. LumeCMS can use a `Kv` instance to store
content. For example:

```ts
import lumeCMS from "lume_cms/mod.ts";
import Kv from "lume_cms/storage/kv.ts";

const cms = lumeCMS();

cms.storage(
  "my_values",
  new Kv({
    kv: await Deno.openKv(),
    prefix: ["site_values"],
  }),
);

export default cms;
```

The `prefix` argument is optional and allow to add a prefix as namespace.

## GitHub

Allows to write and read values directly from a GitHub repository using the
GitHub API. It's useful if you want to allow people without GitHub accounts or
permission to edit the data.

```ts
import lumeCMS from "lume_cms/mod.ts";
import GitHub from "lume_cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const cms = lumeCMS();

const client = new Octokit({
  auth: "xxx", // A personal access token,
});

cms.storage(
  "gh",
  new GitHub({
    client,
    owner: "username",
    repo: "example",
  }),
);

export default cms;
```
