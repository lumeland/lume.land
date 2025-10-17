---
title: Git for versions
description: Use Git branches to create different versions of the site.
order: 5
---

LumeCMS can execute git operations in your filesystem like commit, push, pull
and manage branches. This is useful to create different versions of the site. To
enable Git with the default options use the `git()` function:

```js
cms.git();
```

> [!Important]
>
> Keep in mind that the Git integration needs your changes saved in local files.
> If you're using [github](./storage.md#github) or other storage methods that
> don't use the filesystem (like databases, etc) these changes won't be managed
> by git.

The available values are:

- **prodBranch**: The production branch. By default is `main`.
- **branchPrefix**: A prefix for the branches created for other versions. By default is
  `lumecms/`. A version named `v2` is stored in the branch `lumecms/v2`.
- **command**: The command to invoke git. By default is `git`.
- **remote**: The name of the remote repository to push and pull changes. By
  default is `origin`.

```js
cms.git({
  prodBranch: "master", // Change the production branch
});
```

## Events

The Git integration triggers the following events that you can listen to perform
additional code:

- `cms:versionCreated`: A new version was created
- `cms:versionChanged`: The user switched to a different version
- `cms:versionPublished`: A version was published
- `cms:versionDeleted`: A version was deleted

```js
addEventListener("cms:versionPublished", (ev) => {
  const { name } = ev.details;

  console.log(`The version ${name} was published`);
});
```
