---
title: Deployment
description: How to deploy a site built with Lume.
---

${toc}

## Deploy manually with rsync

This is the simplest way to deploy a site: just build the site and upload it to
your server with [rsync](https://en.wikipedia.org/wiki/Rsync). An easy way is by
creating a script in your `_config.ts` file to automate this process:

```ts
site.script(
  "deploy",
  "lume --location=https://my-site.com",
  "rsync -r _site/ user@my-site.com:~/www",
);
```

This is a simple script that execute two commands: It builds the site with the
final location URL and upload the site to the server. Now, to build and deploy
your site, just run:

```sh
lume run deploy
```

## GitHub Pages

To deploy a Lume site using [GitHub Pages](https://pages.github.com/), create
the following workflow:

```yml
name: Publish on GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Clone repository
        uses: actions/checkout@v2

      - name: Setup Deno environment
        uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x

      - name: Build site
        run: |
          deno run -A https://deno.land/x/lume/ci.ts

      - name: Deploy
        uses: crazy-max/ghaction-github-pages@v2.0.1
        with:
          build_dir: _site
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## GitLab Pages

To deploy a Lume site using
[GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/), set a CI/CD
configuration with the following code:

<lume-code>

```yml {title=".gitlab-ci.yml"}
image: oscarotero/lume

stages:
  - pages

pages:
  stage: pages
  script: lume --dest=public

  artifacts:
    paths:
      - public
```

The `--dest=public` argument in the build command set the destination folder as
`./public`. This is the folder that GitLab use to publish the site. This
argument is not needed if you have defined the
[dest folder in the config file](/docs/configuration/config-file.md#dest).

</lume-code>

## Deno Deploy

[Deno Deploy](https://deno.com/deploy) is a distributed deploy system provided
by Deno with support for static files. It requires to have your repo in GitHub.

- Sign up in Deno Deploy and create a new project.
- Configure the Git integration to use the **GitHub Actions** deployment mode.
- In your repository, you need a entrypoint file to server the files. Create the
  file `serve.ts` with the following code:

```ts
import Server from "https:/deno.land/x/lume/core/server.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.start();

console.log("Listening on http://localhost:8000");
```

- Create the following GitHub workflow, replacing `project-name` with the name
  of your project in Deno Deploy.

```yml
name: Publish on Deno Deploy

on:
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - name: Clone repository
        uses: actions/checkout@v2

      - name: Setup Deno environment
        uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x

      - name: Build site
        run: |
          deno run -A https://deno.land/x/lume/ci.ts

      - name: Deploy to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: project-name
          entrypoint: server.ts
```

## Netlify

[Netlify](https://www.netlify.com/) is one of the most popular build & deploy
systems for Jamstack. It doesn't include Deno installed by default but it's
possible to install and use it in the build script.

The most easy way is by creating a `netlify.toml` file in your repository with
the following code:

<lume-code>

```toml {title="netlify.toml"}
[build]
  publish = "_site"
  command = """
    curl -fsSL https://deno.land/x/install/install.sh | sh && \
    /opt/buildhome/.deno/bin/deno run -A https://deno.land/x/lume/ci.ts \
  """
```

</lume-code>

The command download and install deno and then run lume to build the site.

## Vercel

[Vercel](https://vercel.com/) is another popular service to build and deploy
Jamstack site. Like Netlify, it doesn't have Deno available by default so the
build command must install it.

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh && /vercel/.deno/bin/deno run -A https://deno.land/x/lume/ci.ts
```

Remember also to configure the output directory to `_site`.

## Fleek

[Fleek](https://fleek.co/) allows to build websites and apps in the open web:
permissionless, trustless, censorship resitant and free of centralized
gatekeepers. To deploy your site with Fleek, create a `.fleek.json` file in your
repository with the following code:

<lume-code>

```json {title=".fleek.json"}
{
  "build": {
    "image": "oscarotero/lume",
    "command": "lume",
    "publicDir": "_site"
  }
}
```

</lume-code>

This configuration use the Lume Docker image to build the site.
