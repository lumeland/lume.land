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

- Install/update the required packages (Deno, Git, etc).
- Setup [Caddy-Lume](https://github.com/lumeland/caddy-lume), a HTTPS server to
  run Lume and [Caddy](https://caddyserver.com/) securely.
- Configures a firewall with
  [ufw](https://en.wikipedia.org/wiki/Uncomplicated_Firewall).
- Create services with `systemctl` to ensure the server is always live.
- Clone and configure the GIT repository to ensure LumeCMS can pull and push
  changes.

To setup LumeCMS in your VPS, follow the instructions in the
[README.md file of the repo](https://github.com/lumeland/cms-deploy/blob/main/README.md).

## Demo

You can see a demo at [cms-demo.lume.land](https://cms-demo.lume.land/admin).

- User: `admin`
- Password: `demo`

In the demo you can edit the content of a blog, create different versions (which
are stored in local git branches) and even publish the changes of the main
branch (to push the changes of `main` to your remote repository).

The remote repository for this demo is
[cms-demo-live](https://github.com/lumeland/cms-demo-live).
