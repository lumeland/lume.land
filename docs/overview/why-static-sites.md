---
title: Why create a static site?
description: Learn why a static site can be a better choice.
order: 0
---

A static website consists only of static files like HTML, CSS, JavaScript,
images, etc. It does not use server-side processing, databases, routers, or
rendering. Everything is pre-built, and your hosting delivers the website files
to the browsers exactly as they appear on the server.

In contrast, in a dynamic website, every page is generated dynamically by the
server after any request. This allows to display of different content for each
visit (i.e. users who are logged in might see a different version of the page).
Dynamic websites need some software installed in the server to work, like a
scripting language (e.g. PHP, JavaScript, Python, or Ruby), a database, etc.

## Why create static sites?

Lume is a static site generator, which means it can only generate static
websites. We believe that most websites existing today could be perfectly static
sites and this would make them better. Why static sites are a better choice in
most cases?

### Pricing

Unless you have a big site with millions of visits, hosting a static site is
very cheap or even free. There are many hosting services with generous free
tiers for static sites like Netlify, Vercel, Cloudflare, Kinsta, etc. See
[deployment](../advanced/deployment.md) for an extensive list of options. And if
you decide to self-host your site, there are cheap options for less than
$5/month in Digital Ocean, Hetzner, etc.

### Portability

Deploying a static site can't be easier. Due they are only static files, you
only have to upload these files to the server, using git, ssh, ftp, or your
favorite tool. It's even possible to compress a static site into a zip file and
send it by email or messaging.

### Security

Because there's no logic in the server, static sites are much more secure than
dynamic sites. There are no endpoints to exploit, like configuration files, PHP
scripts, authentication, or XSS vulnerabilities.

### Almost no maintenance

A static site can live forever without any kind of maintenance (i.e. the
database is down, need to update plugins and other dependencies, etc). You can
upload a static site and forget about it for years. As long as browsers continue
to exist and support HTML, CSS, and JavaScript, your static website will
continue working like the first day (or even better because browsers are
improving over time).

### Own your content

In most static site generators, like Lume, the content is not stored in a remote
database guarded by a company, but in files inside your repo, with formats like
Markdown, YAML, or JSON. This makes your content completely accessible to you,
and you can do whatever you want with it, like modify, export, move it, etc.

### Better for Web sustainability

If you care about the environment (you should), static sites are the preferred
format for your web due to their lower emissions. According to the
[Web Sustainability Guidelines](https://w3c.github.io/sustyweb/#success-criterion-static-vs-dynamic-human-testable):

> If choosing a code generation tool, use a Static Site Generator in preference
> to a bulky content management system. Because SSGs often start using a
> minimalist content entry format (like markdown) and all of the compilation is
> done before the website is uploaded, the emissions benefit comes from the
> server not having to place as much effort into serving pages (as they are
> static) for each visitor.

### No vendor lock-in

Many site generators have a similar way of working: you store your content in a
format like markdown and they convert the content into web pages. This makes it
easy to switch from a static site generator to another.

Lume can be your current site generator, but maybe you want to switch to other
option in the future like [Astro](https://astro.build/),
[Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/) or
[Eleventy](https://www.11ty.dev/). Or vice versa, you may use one of these site
generators and want to switch to Lume. The effort needed to change from one
static site generator to another is much lower than the effort required to
change the dynamic site generator (i.e. from WordPress to Drupal).
