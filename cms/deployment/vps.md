---
title: Deploy on a VPS
description: How to setup LumeCMS on a VPS with live preview and versioning.
order: 2
---

The best experience using LumeCMS is when it's connected to Lume, so it can
generate live-previews with the changes. It can also manage the git repository
in order to pull and push changes to the remote repository and create different
versions using branches.

## Requirements

You need a **server with Ubuntu 24.04**. Other Linux versions can work but only
Ubuntu 24.04 has been tested so far. [Hetzner](https://www.hetzner.com/) or
[Digital Ocean](https://www.digitalocean.com/) are good solutions if you need a
cheap and fast VPS for less than 5$/month.

You also need a **domain or subdomain** to run the CMS. To do that, in the DNS
settings of your domain, add a `A` record with the IPv4 address of the hosting
server.

> [!tip]
>
> A good idea is to use a subdomain like `cms` or `admin`. For example, if the
> site you want to manage is `example.com`, the CMS would be at
> `cms.example.com` or `admin.example.com`.

## Setup

In the repository [cms-deploy](https://github.com/lumeland/cms-deploy) there's a
script to setup LumeCMS automatically. The script does not only install LumeCMS
but also:

- Install/update the required packages of the OS (Deno, Git, Caddy, etc).
- Setup a HTTPS server with [Caddy](https://caddyserver.com/) and configures a
  firewall with [ufw](https://en.wikipedia.org/wiki/Uncomplicated_Firewall).
- Clone the Git repository of the website and configure LumeCMS to push/pull
  changes to it.
- Create services with `systemctl` to ensure the CMS is always live, restarting
  it if something fails.
- Configures a cron to restart the service if the CPU usage is above 95%
  ([see this Deno issue](https://github.com/denoland/deno/issues/23033)).

To execute the script, log in to the server throught SSH and run the following:

```sh
curl https://lumeland.github.io/cms-deploy/install.sh > install.sh && sh install.sh
```

This command will download the `install.sh` script from the repository and
execute it.

> [!note]
>
> At some points, the script will ask you to confirm some steps (like install
> packages, etc) that you have to allow.

The installation process will ask you for some info:

<!-- deno-fmt-ignore-start -->
URL of the repository
: The SSH URL of the git repository, like `git@github.com:user/repo.git`.

Email
: It's used for git commits and to create the SSL certificate.

Domain
: The domain for the CMS, for example `cms.example.com`.

Username
: It's used to log in the CMS. By default is `admin`

Password
: The password to access to the CMS.
<!-- deno-fmt-ignore-end -->

During the process, it will generate a deploy key that you must add to GitHub:

- When you see the key in the terminal, copy it to the clipboard.
- Go to the GitHub repository: _Settings > Deploy keys > Add deploy key_
- Paste the key.
- Check the **Allow write access** option. It's required to push changes to the
  repository.
- Once the key is added, press Enter in the terminal to continue the
  installation.

When the script finishes, you should be able to access to the CMS from your
browser.

> [!note]
>
> The first time to access to the CMS may take a little longer because the site
> is being build and Deno needs to download all dependencies.

## Demo

You can see a demo at [cms-demo.lume.land](https://cms-demo.lume.land/admin).

- User: `admin`
- Password: `demo`

In the demo you can edit the content of a blog, create different versions (which
are stored in local git branches) and even publish the changes of the main
branch (to push the changes of `main` to your remote repository).

The remote repository for this demo is
[cms-demo-live](https://github.com/lumeland/cms-demo-live).
