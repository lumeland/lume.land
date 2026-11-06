---
title: Deployment
description: How to deploy a site built with Lume.
---

## Deploy manually with rsync

This is the simplest way to deploy a site: just build the site and upload it to
your server with [rsync](https://en.wikipedia.org/wiki/Rsync). An easy way is by
creating a NPM script in the `package.json` file:

```json
{
  "scripts": {
    "deploy": "lume build && rsync -r _site/ user@my-site.com:~/www"
  }
}
```

The script **deploy** executes two commands: It builds the site and uploads
it to the server. Now, to build and deploy your site, just run:

```sh
npm run deploy
```

## GitHub Pages

To deploy a Lume site using [GitHub Pages](https://pages.github.com/), go to
Settings > Pages in your repo, configure the source to use GitHub Actions, then
create the following workflow:

<lume-code>

```yml {title=".github/workflows/deploy.yml"}
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

      - name: Setup Node.js
        uses: actions/setup-node@v7

      - name: Build site
        run: npm run build

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

</lume-code>

## GitLab Pages

To deploy a Lume site using
[GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/), create a CI/CD
configuration with the following code:

<lume-code>

```yml {title=".gitlab-ci.yml"}
image: node:lts

stages:
  - pages

pages:
  stage: pages
  script: npm run build -- --dest=public

  artifacts:
    paths:
      - public
```

The `--dest=public` argument in the build command sets the destination folder as
`./public`. This is the folder that GitLab uses to publish the site. This
argument is not needed if you have defined the
[dest folder in the config file](/docs/configuration/config-file.md#dest).

</lume-code>

## Codeberg Pages

To deploy a Lume site using
[Codeberg Pages](https://docs.codeberg.org/codeberg-pages/), go to Settings >
Units > Overview in your repo and enable Forgejo Actions. Then, create an action
file with the following code:

<lume-code>

```yml {title=".forgejo/workflows/deploy.yml"}
name: Publish on Codeberg Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy to Codeberg Pages
    runs-on: codeberg-small
    steps:
      - name: Clone repository
        uses: actions/checkout@v5

      - name: Setup Node.js
        uses: https://github.com/actions/setup-node@v7

      - name: Build site
        run: npm run build
      - uses: https://codeberg.org/git-pages/action@v2
        with:
          site: "https://${{ forge.repository_owner }}.codeberg.page/repo-name"
          token: ${{ forge.token }}
          source: _site/
```

</lume-code>

## Netlify

Create a `netlify.toml` file in your repository with the following code:

<lume-code>

```toml {title="netlify.toml"}
[build]
  publish = "_site"
  command = "npm run build"
```

</lume-code>

## Vercel

Set the following build command:

```sh
npm run build
```

Remember also to configure the output directory to `_site`.

## Cloudflare Pages

To deploy your Lume site with [Cloudflare Pages](https://pages.cloudflare.com/),
configure the build command as follows:

```sh
npm run build
```

Remember to configure the output directory to `_site`.

## Render

To deploy your Lume site with [Render](https://render.com/), create a new
_Static Site_ project and configure the build command as follows:

```sh
npm run build
```

Configure the output directory to `_site`.

## Statichost

[Statichost](https://www.statichost.eu/) is an European static site hosting with
Privacy and GDPR-compliancy from the ground up. To upload your site on
statichost, configure the Docker image to `node:lts`, the build command
`npm run build` and the publish directory to `_site`.

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
        - npm run build
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

In the project settings, set the build command to `npm run build` and the
publish directory to `_site`.

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

## deed.page

[deed.page](https://deed.page) is a static site host that doesn't need an
account. Build the site, pack the `_site` folder and upload it with one HTTP
`PUT`:

```sh
npm run build
tar -C _site -czf site.tar.gz .
curl -T site.tar.gz "https://deed.page/v1/sites?slug=my-lume-site"
```

The response contains the live `https://my-lume-site.deed.page/` URL and a
token. Send the token as `Authorization: Bearer <token>` to publish updates to
the same slug. See the [deed.page docs](https://deed.page/docs) for limits and
larger uploads.

## Getwebup

[Getwebup](https://www.getwebup.in/web-hosting) cPanel hosting serves a Lume
site as static files with LiteSpeed. Build the site, then zip the contents of
the `_site` folder (not the folder itself). In cPanel's File Manager, upload the
zip to `public_html`, extract it there and delete the zip.

To serve the `404.html` page that Lume builds for missing pages, add this line
to `public_html/.htaccess` (create the file if it doesn't exist):

```apache
ErrorDocument 404 /404.html
```

Lume's pretty URLs (`/about/` is `about/index.html`) work without rewrite rules.
