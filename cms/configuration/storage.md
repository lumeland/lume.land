---
title: Storage
description: Setup different storages for your CMS
order: 0
---

The function `cms.storage()` allows to register different storages to save the
site data. When a storage is registered, it must have a name that will be used
later in your documents, collections and uploads.

LumeCMS supports several types of storages.

## File system

> [!tip]
>
> Lume automatically configure the `src` storage pointing to the `src` folder.
> So you don't need to setup a file system storage.

To register a filesystem storage, import the class and register it with a name.
For example, let's register a file system storage under the name "my_files",
pointing to the `./files` folder:

```ts
import lumeCMS, { Fs } from "lume/cms.ts";

const cms = lumeCMS();
const root = Deno.cwd() + "/files";

cms.storage("my_files", new Fs({ root }));

export default cms;
```

The `my_files` storage is now available to read and write content by the CMS.
Because the file system is the most common way to read and write data, the
example above can be simplified as following:

```ts
import lumeCMS from "lume/cms.ts";

const cms = lumeCMS();

cms.storage("my_files", "files");

export default cms;
```

As you can see, if you define a string as the storage, LumeCMS assume it's a
folder name, so the file system storage is used automatically. Note also that
you don't need to prepend `Deno.cwd()` to the folder name, because the value of
[root option](./options.md#root) (which by default is `Deno.cwd()`) is used as
the base path.

## KV

[Deno Kv](https://docs.deno.com/deploy/kv/manual) is a key-value database built
directly into the Deno runtime. LumeCMS can use a `Kv` instance to store
content. For example:

```ts
import lumeCMS, { Kv } from "lume/cms.ts";

const cms = lumeCMS();
const kv = await Deno.openKv();

cms.storage("my_values", new Kv({ kv }));

export default cms;
```

## GitHub

Allows to write and read values directly from a GitHub repository using the
GitHub API. It's useful if you want to allow people without GitHub accounts or
permission to edit the site data.

```ts
import lumeCMS, { GitHub } from "lume/cms.ts";
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

### Generate a GitHub access token

1. Log into [GitHub](https://github.com) and make sure you have permissions to
   manage the repository.
2. Go to
   [Fine-grained tokens](https://github.com/settings/tokens?type=beta "Settings > Developer settings > Personal access tokens > Fine-grained tokens")
   and press **Generate new token**.
3. Set a name and expiration date for the token.
4. In _Repository access_ section, select **Only select repositories** and add
   the repository that you want to manage.
5. Open _Repository permissions_ and select **Read and write** access level in
   the **Contents** section.
6. Press the **Generate token**.
