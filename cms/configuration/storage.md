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
import lumeCMS from "lume/cms/mod.ts";
import Fs from "lume/cms/storage/fs.ts";

const cms = lumeCMS();
const storage = Fs.create(Deno.cwd() + "/files");

cms.storage("src", storage);

export default cms;
```

The `my_files` storage is now available to read and write content by the CMS.
Because the file system is the most common way to read and write data, the
example above can be simplified as following:

```ts
import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

cms.storage("src", "files");

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
import lumeCMS from "lume/cms/mod.ts";
import Kv from "lume/cms/storage/kv.ts";

const cms = lumeCMS();
const storage = await Kv.create();

cms.storage("src", storage);

export default cms;
```

> [!note]
>
> If you run into `TypeError: Deno.openKv is not a function`, it means
> `Deno.openKv() is currently an unstable API`. You need to add the unstable key
> in deno.json
> ([info](https://docs.deno.com/runtime/reference/cli/unstable_flags/#configuring-flags-in-deno.json)):
>
> ```
> {
>   "unstable": ["kv"]
> }
> ```

## GitHub

Allows to write and read values directly from a GitHub repository using the
GitHub API. It's useful if you want to allow people without GitHub accounts or
permission to edit the site data.

```ts
import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";

const cms = lumeCMS();

const token = "xxx"; // A personal access token
const storage = GitHub.create("username/repo", token);

cms.storage("src", storage);

export default cms;
```

If you want to set a different root path:

```js
GitHub.create("username/repo/path/to/root", token);
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
6. Press **Generate token**.

## GitLab

It's similar to GitHub but for [GitLab](https://gitlab.com/):

```ts
import lumeCMS from "lume/cms/mod.ts";
import GitLab from "lume/cms/storage/gitlab.ts";

const cms = lumeCMS();

const token = "xxx"; // A personal access token
const storage = GitLab.create("username/repo", token);

cms.storage("src", storage);

export default cms;
```

### Generate a GitLab access token

1. Log into [GitLab](https://gitlab.com) and make sure you have permissions to
   manage the repository.
2. Go to
   [Personal access tokens](https://gitlab.com/-/user_settings/personal_access_tokens "Preferences > Personal access tokens")
   and press **Add new token**.
3. Set a name and expiration date for the token.
4. In _Select scopes_ section, select `api`
5. Press **Create token**.

## Codeberg

It's similar to GitHub but for GitLab:

```ts
import lumeCMS from "lume/cms/mod.ts";
import Codeberg from "lume/cms/storage/codeberg.ts";

const cms = lumeCMS();

const token = "xxx"; // A personal access token
const storage = Codeberg.create("username/repo", token);

cms.storage("src", storage);

export default cms;
```

### Generate a Codeberg access token

1. Log into [Codeberg](https://codeberg.org) and make sure you have permissions to
   manage the repository.
2. Go to
   [Access tokens](https://codeberg.org/user/settings/applications "Settings > Applications").
3. Set a token name.
4. Open _Select permissions_ and in the _repository_ selector, select "Read and write" 
5. Press **Generate token**.

## Memory

It creates an in-memory storage. Useful for testing purposes.

```ts
import lumeCMS from "lume/cms/mod.ts";
import Memory from "lume/cms/storage/memory.ts";

const cms = lumeCMS();

const storage = Memory.create();

cms.storage("src", storage);

export default cms;
```
