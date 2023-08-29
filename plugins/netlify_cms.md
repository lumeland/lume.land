---
title: Netlify CMS
description: Run Netlify CMS to update the site content
docs: plugins/netlify_cms.ts/~/Options
mod: plugins/netlify_cms.ts
tags:
  - utils
---

## Description

This plugin generates the code to run [Netlify CMS](https://www.netlifycms.org/)
and update the site content in a faster and easier way in both local and remote
environments. By default the CMS is accesible at the `/admin/` path, but you can
change it in the `path` option.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import netlifyCMS from "lume/plugins/netlify_cms.ts";

const site = lume();

site.use(netlifyCMS());

export default site;
```

See
[all available options in Deno Doc](https://doc.deno.land/https/deno.land/x/lume/plugins/netlify_cms.ts/~/Options).

## Usage

Create the data file `/_data/netlify_cms.yml` in the root of your project. See
the
[configuration options in the Netlify CMS site](https://www.netlifycms.org/docs/configuration-options/).

<lume-code>

```yml {title="/_data/netlify_cms.yml"}
backend:
  name: git-gateway
  branch: master

media_folder: statics

collections:
  - label: Posts
    name: posts
    description: List of posts
    folder: posts
    extension: md
    create: true
    fields:
      - label: Title
        name: title
        widget: string
      - label: Content
        name: body
        widget: markdown
```

</lume-code>

This creates the `netlify_cms` key with the configuration of the CMS. Note that
it's not required to be a yaml file; you can use any data format (JSON,
JavaScript module, TypeScript module, etc). This plugin will generate the pages
`/admin/index.html` and `/admin/config.yml` to run the CMS.

## Local mode

If the site location hostname is `localhost` the local mode is enabled by
default. This means that after running `lume --serve`, you can go to
`http://localhost:3000/admin/` to access the CMS and make changes to the content
of your site.

Keep in mind that local mode runs
`deno run --allow-read --allow-net=0.0.0.0 --allow-write --allow-env npm:netlify-cms-proxy-server`
to start the local proxy server for the CMS. You can change this command with
`proxyCommand` option or disable the local mode, by setting `local: false` in
the plugin configuration.
