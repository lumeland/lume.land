---
title: Deploy on Deno Deploy
description: How to setup LumeCMS to use it on Deno Deploy
order: 1
---

[Deno Deploy](https://deno.com/deploy) is a distributed deploy system provided
by Deno that allows to run Deno code on the cloud. **LumeCMS** can run on Deno
Deploy but keep in mind the following limitations:

- In Deno Deploy it's not possible to write in the file system so you have to
  configure a GitHub repository to commit the changes to.
- For the very same reason, it's not possible to live preview the changes. All
  the changes are inmediately commited to the GitHub repository.

If you want to preview the changes before commit, it's recommended to use a VPS.
[See instructions here](./vps.md).

## Requirements

You need an account on **Deno Deploy** and a **repository on GitHub** to send
the changes.

## Setup

Configure your `_cms.ts` file to use
[GitHub as the storage method](../configuration/storage.md#github), instead of
filesystem:

```js
import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const cms = lumeCMS();

cms.storage(
  "src",
  new GitHub({
    client: new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") }),
    owner: "username",
    repo: "example",
  }),
);

// Rest of the configuration....

export default cms;
```

> [!note]
>
> The token to connect to the GitHub repository is stored in the `GITHUB_TOKEN`
> environment variable.

Log in to Deno Deploy and create a new project. Connect it to the GitHub
repository and set the `_cms.ts` file as the entry point. In the **Environment
Variables** option, add the `GITHUB_TOKEN` variable with the access token.

## Protect with an username and password

It's recommended to protect the access to the CMS with a password. Configure the
[`auth` method](../configuration/options.md#auth) in your `_cms.ts` file:

```js
const username = Deno.env.get("USERNAME");
const password = Deno.env.get("PASSWORD");

const cms = lumeCMS({
  auth: {
    method: "basic",
    users: {
      [username]: password,
    },
  },
});
```

Add the `USERNAME` and `PASSWORD` environment variables in Deno Deploy with the
desired values.

## Demo

You can see a demo at [lume-cms-demo.deno.dev](https://lume-cms-demo.deno.dev/).

- User: `admin`
- Password: `demo`

In the demo you can edit the content of a blog and upload files. All changes
will be commited to the repository
[oscarotero/test](https://github.com/oscarotero/test/).

The remote repository for this demo is
[cms-demo](https://github.com/lumeland/cms-demo).

> [!note]
>
> In this demo we have two repositories:
> [one for the CMS](https://github.com/lumeland/cms-demo) and
> [other to save the changes](https://github.com/oscarotero/test/). But you can
> use a single repository for both purposes.
