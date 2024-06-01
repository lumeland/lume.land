---
title: LumeCMS in a VPS
description: How to setup the CMS in a VPS with live preview and versioning.
order: 1
---

The best experience using LumeCMS is when it's connected to Lume, so it can
generate live-previews of the changes. It can also manage the git repository in
order to push/pull changes to the remote repository and create different
versions using branches.

## Requirements

You need a **server with Ubuntu 24.04**. Other Linux versions can work but only
Ubuntu 24.04 has tested so far. [Hetzner](https://www.hetzner.com/) or
[Digital Ocean](https://www.digitalocean.com/) are good solutions if you need a
cheap and fast VPS for less than 5$/month.

You also need a domain or subdomain to run the CMS. A good idea is to use a
subdomain like `cms`. For example, if the site you want to manage is
`example.com`, the CMS would be at `cms.example.com`. To do that, in the DNS
settings of your domain, add a `A` record with the IPv4 address.

## Setup

The repository [cms-deploy](https://github.com/lumeland/cms-deploy) contains a
script that you can run and automatically setup a CMS for you. The script not
only install LumeCMS but also connect it to the remote repository, setup a
server and generate a Let's Encrypt SSL certificate.

Log in the server from SSH and run the following:

```sh
curl https://lumeland.github.io/cms-deploy/install.sh > install.sh && sh install.sh
```

This will download the `install.sh` script from the repository and execute it.

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

During the process, it will generate a public/private RSA key pair and will ask
you for a passphrase. Leave it empty.

Once the RSA key is generated it will ask you to add the deploy key to GitHub:

- Go to the GitHub repository: Settings > Deploy keys > Add deploy key
- Paste the key printed in the terminal
- Check the **Allow write access** option. It's required to push changes to your
  repository.
- Once the key is added, press Enter in the terminal to continue the
  installation.

> [!note]
>
> At some points, the script will ask you to confirm some steps (like install
> packages, etc) that you have to allow.

When the script finishes, you should be able to access to the CMS by typing in
your browser the domain selected. The first time may take a little longer
because the site is being build for first time and Deno needs to download all
dependencies.

## Demo

You can see a demo at [cms-demo.lume.land](https://cms-demo.lume.land/admin).

- User: `admin`
- Password: `lume`

In the demo you can edit the content of a blog, create different versions (which
are stored in local git branches) and even publish the changes of the main
branch (to push the changes of `main` to your remote repository).

The remote repository for this demo is
[cms-demo-live](https://github.com/lumeland/cms-demo-live).
