---
title: Deployment
description: How to deploy a site built with Lume.
---

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
    "lume": "echo \"import 'lume/cli.ts'\" | deno run -A -",
    "deploy": "deno task build && rsync -r _site/ user@my-site.com:~/www"
  }
}
```

In addition to the regular Lume tasks, we have added a new task named **deploy**
that executes two commands: It builds the site and uploads it to the server.
Now, to build and deploy your site, just run:

```sh
deno task deploy
```

## GitHub Pages

To deploy a Lume site using [GitHub Pages](https://pages.github.com/), go to
Settings > Pages in your repo, configure the source to use GitHub Actions, then
create the following workflow:

```yml
name: Publish on GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Clone repository
        uses: actions/checkout@v4

      - name: Setup Deno environment
        uses: denoland/setup-deno@v2
        with:
          cache: true

      - name: Build site
        run: deno task build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "_site"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## GitLab Pages

To deploy a Lume site using
[GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/), create a CI/CD
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

The `--dest=public` argument in the build command sets the destination folder as
`./public`. This is the folder that GitLab uses to publish the site. This
argument is not needed if you have defined the
[dest folder in the config file](/docs/configuration/config-file.md#dest).

</lume-code>

## Deno Deploy

[Deno Deploy](https://deno.com/deploy) is a distributed deploy system provided
by Deno with support for static files. It requires having your repo on GitHub.

- Sign up to Deno Deploy and create a new project.
- Configure the Git integration to use the **GitHub Actions** deployment mode.
- In your repository, you need an entrypoint file to serve the files. Create the
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
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - name: Clone repository
        uses: actions/checkout@v4

      - name: Setup Deno environment
        uses: denoland/setup-deno@v2

      - name: Build site
        run: deno task build

      - name: Deploy to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: project-name
          import-map: "./deno.json"
          entrypoint: serve.ts
```

## Netlify

According to the
["Available software at build time"](https://docs.netlify.com/configure-builds/available-software-at-build-time/#tools)
page at Netlify's documentation website, Deno is one of several supported
runtimes when building. In order to build your project, you'll need to tell
Netlify which command to run at build time, which is `deno task build` in this
case.

Create a `netlify.toml` file in your repository with the following code:

<lume-code>

```toml {title="netlify.toml"}
[build]
  publish = "_site"
  command = "deno task build"
```

```toml {title="Latest version of Deno"}
[build]
  publish = "_site"
  command = """
  curl -fsSL https://deno.land/install.sh | sh && \
  /opt/buildhome/.deno/bin/deno task build \
"""
```

</lume-code>

## Vercel

[Vercel](https://vercel.com/), doesn't have Deno available by default, so the
build command must install it.

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh && /vercel/.deno/bin/deno task build
```

Remember also to configure the output directory to `_site`.

## Cloudflare Pages

To deploy your Lume site with [Cloudflare Pages](https://pages.cloudflare.com/),
configure the build command as follows:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh && /opt/buildhome/.deno/bin/deno task build
```

Remember to configure the output directory to `_site`.

## Render

To deploy your Lume site with [Render](https://render.com/), create a new
_Static Site_ project and configure the build command as follows:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh && /opt/render/.deno/bin/deno task build
```

Configure the output directory to `_site`.

## Statichost

[Statichost](https://www.statichost.eu/) is an European static site hosting with
Privacy and GDPR-compliancy from the ground up. To upload your site on
statichost, configure the Docker image to `denoland/deno`, the build command
`deno task build` and the publish directory to `_site`.

## AWS Amplify

To deploy your Lume site with [AWS Amplify](https://aws.amazon.com/amplify/),
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
      - "**/*"
  cache:
    paths: []
```

</lume-code>

Remember to ignore the `amplify.yml` file in the Lume `_config.ts` file. If you
don't want to create this file in your repository, you can configure it in the
AWS control panel.

## Kinsta

[Kinsta](https://kinsta.com/) is a hosting service that allows hosting
[up to 100 static sites for free](https://kinsta.com/static-site-hosting/).
Because Kinsta only has support for NodeJS, to host a Lume site you need to
create the following `package.json` file:

```json
{
  "scripts": {
    "build": "deno task lume"
  },
  "devDependencies": {
    "deno-bin": "^1.37.2"
  }
}
```

In the project settings, set the build command to `npm run build` and the
publish directory to `_site`.

Kinsta provides [this nice template](https://github.com/kinsta/hello-world-lume)
that you can use.

## Surge

[Surge](https://surge.sh/) is a CLI-based static web publishing host with
unlimited sites and custom domain support. To upload your site on Surge, you
need to first install the CLI tool with `npm install --global surge`. Then, in
the `_dest` directory, run `surge` to login/register and upload the site.

## Clever Cloud

[Clever Cloud](https://www.clever-cloud.com/) is an European Platform as a
Service that allows to host Lume projects among other popular frameworks.
[Follow the instructions](https://www.clever-cloud.com/developers/guides/lume-deno/)
in the documentation site.
