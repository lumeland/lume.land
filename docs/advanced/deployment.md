---
title: Deployment
description: How to deploy a site built with Lume.
---

${toc}

## Deploy manually with rsync

This is the simplest way to deploy a site: just build the site and upload it to
your server with [rsync](https://en.wikipedia.org/wiki/Rsync). An easy way is by
creating a deno task in the `deno.json` file:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "build": "deno task lume",
    "serve": "deno task lume -s",
    "lume": "deno eval \"import 'lume/task.ts'\" --",
    "deploy": "deno task build && rsync -r _site/ user@my-site.com:~/www"
  }
}
```

In addition to the regular Lume task, we have added a new task, named **deploy**
that execute two commands: It builds the site and upload it to the server. Now,
to build and deploy your site, just run:

```sh
deno task deploy
```

## GitHub Pages

To deploy a Lume site using [GitHub Pages](https://pages.github.com/), create
the following workflow:

```yml
name: Publish on GitHub Pages

on:
  push:
    branches: [ main ]

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
        run: deno task build

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
image: denoland/deno

stages:
  - pages

pages:
  stage: pages
  script: deno task build --dest=public

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
import Server from "lume/core/server.ts";

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
    branches: [ main ]

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
        run: deno task build

      - name: Deploy to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: project-name
          import-map: "./import_map.json"
          entrypoint: serve.ts
```

## Netlify

[Netlify](https://www.netlify.com/) doesn't include Deno installed by default
but it's possible to install and use it in the build command.

Create `netlify.toml` file in your repository with the following code:

<lume-code>

```toml {title="netlify.toml"}
[build]
  publish = "_site"
  command = """
    curl -fsSL https://deno.land/x/install/install.sh | sh && \
    /opt/buildhome/.deno/bin/deno task build \
  """
```

</lume-code>

## Vercel

[Vercel](https://vercel.com/), doesn't have Deno available by default so the
build command must install it.

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh && /vercel/.deno/bin/deno task build
```

Remember also to configure the output directory to `_site`.

## Fleek

To deploy your Lume site with [Fleek](https://fleek.co/), create a `.fleek.json`
file in your repository with the following code:

<lume-code>

```json {title=".fleek.json"}
{
  "build": {
    "image": "denoland/deno",
    "command": "deno task build",
    "publicDir": "_site"
  }
}
```

</lume-code>

## Cloudflare Pages

To deploy your Lume site with [Cloudflare Pages](https://pages.cloudflare.com/),
configure the build command as follow:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh && /opt/buildhome/.deno/bin/deno task build
```

Remember to configure the output directory to `_site`.

## AWS Amplify

To deploy your Lume site with [AWS Amplify](https://aws.amazon.com/amplify/)
create a `amplify.yml` file with the following code:

<lume-code>

```yaml {title="amplify.yml"}
version: 1
frontend:
  phases:
    build:
      commands:
        - curl -fsSL https://deno.land/x/install/install.sh | sh
        - /root/.deno/bin/deno task build
  artifacts:
    baseDirectory: /_site
    files:
      - '**/*'
  cache:
    paths: []
```

</lume-code>

Remember to ignore `amplify.yml` file in the Lume `_config.ts` file. If you
don't want to create this file in your repository, you can configure it in the
AWS control panel.
