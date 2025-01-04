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

### It's cheaper

Unless you have a big site with millions of visits, hosting a static site is
very cheap or even free. There are many hosting services with generous free
tiers for static sites like Netlify, Vercel, Cloudflare, Kinsta, etc. See
[deployment](../advanced/deployment.md) for an extensive list of options. And if
you decide to self-host your site, there are cheap options for less than
$5/month in Digital Ocean, Hetzner, etc.

### Portability

Deploying a static site can't be easier. Due they are only static files, you
only have to upload these files to the server, using `git`, `rsync`, `ftp`, or
your favorite tool. It's even possible to compress a static site into a zip file
and send it by email or messaging!

### Security

Because there's no logic in the server, static sites are much more secure than
dynamic sites. There are no endpoints to exploit, like configuration files, PHP
scripts, or XSS vulnerabilities.

### Performance

Static sites tend to be more performant than dynamic sites, at least as far as
the backend is concerned. The reason is the server only has to deliver the files
as they are, without any additional process, which is really fast. And if you're
using a CDN with replicated content in different parts of the world, and with
proper cache header, your site will be lightning fast.

### Almost no maintenance

A static site can live forever without any kind of maintenance (there's no
database to restart, plugins to update, etc). You can upload a static site and
forget about it for years. As long as browsers continue to exist and support
HTML, CSS, and JavaScript, your static website will continue working like the
first day (or even better because browsers are improving over time).

### Own your content

In most static site generators, like Lume, the content is not stored in a remote
database guarded by a private company, but in files inside your repo, with
formats like Markdown, YAML, or JSON that you can open with any text editor.
This makes your content completely accessible to you, and you can do whatever
you want with it, like modify, export, move, reuse, etc.

### Better for Web sustainability

If you care about the environment (you should), static sites are the preferred
format for the web due to their lower emissions. According to the
[Web Sustainability Guidelines](https://w3c.github.io/sustyweb/#success-criterion-static-vs-dynamic-human-testable):

> If choosing a code generation tool, use a Static Site Generator in preference
> to a bulky content management system. Because SSGs often start using a
> minimalist content entry format (like markdown) and all of the compilation is
> done before the website is uploaded, the emissions benefit comes from the
> server not having to place as much effort into serving pages (as they are
> static) for each visitor.

### No vendor lock-in

Most static site generators have a similar flow: you store your content in simple
formats like markdown files that are converted to web pages. This philosofy of
[*file over app*](https://stephango.com/file-over-app) makes it easy to switch
from a static site generator to another.

Lume can be your current site generator, but maybe you want to switch to other
option in the future like [Astro](https://astro.build/),
[Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/),
[Eleventy](https://www.11ty.dev/) or
[any other](https://jamstack.org/generators/). Or vice versa, you may use one of
these site generators and want to switch to Lume. The effort needed to change
from one static site generator to another is much lower than the effort required
to change a dynamic site generator (i.e. from WordPress to Drupal).

## What if some dynamism is needed?

There are some dynamic features that you may want in your website. Does it mean
that you must switch to a dynamic site? Depending on the feature, some
alternatives can be implemented in static sites:

### Search

Searching is a basic feature of any website. Fortunately, it's possible to have
a good search engine on your static site. There are some options:

- [Pagefind](https://pagefind.app/) is a fast search library for static sites.
  And Lume [has a plugin](../../plugins/pagefind.md) to use it.
- For advanced use cases, you can use a third-party service like
  [Algolia](https://www.algolia.com/) or [Orama](https://orama.com/).
- A very basic implementation is using a search engine like DuckDuckGo to show
  results limited to a specific domain. The hidden input named sites allows us
  to restrict the DuckDuckGo query to a specific domain.

  ```html
  <form role="search" action="https://duckduckgo.com" method="GET">
    <label>Search in lume.land <input type="search" name="q"></label>
    <input type="hidden" name="sites" value="lume.land">
    <button>Search</button>
  </form>
  ```

  Try it now:

  <form role="search" action="https://duckduckgo.com" method="GET">
    <label>Search in lume.land <input type="search" name="q"></label>
    <input type="hidden" name="sites" value="lume.land">
    <button>Search</button>
  </form>

### Comments

There are different options to manage comments in static sites:

- Use the Fediverse.
  [mastodon-comments](https://github.com/oom-components/mastodon-comments) is a
  clever way to show comments on your posts without implementing a comment
  system but using Mastodon and other similar platforms compatible with the
  Fediverse.
- Use GitHub discussions: If you have a technical blog and most of your users
  have an account on GitHub, you can use a solution like
  [giscus](https://giscus.app/) that uses GitHub discussions as a comment
  system.
- Use 3rd party services like [Discus](https://disqus.com/).

### Forms

There are hundreds of solutions to include forms on your website. From free and
simple tools like [Google Forms](https://docs.google.com/forms/) or
[Static Forms](https://www.staticforms.xyz/) to more advanced tools like
[Typeform](https://www.typeform.com/).

### CMS

One of the main issues of static sites was they are not easy to update by
non-technical people. Fortunately, this is not true anymore. There are plenty of
CMS for static sites, some recommendations:

- [LumeCMS](../../cms/index.md) can be a good solution, especially if your site
  is built with Lume (although it can work with any static site).
- [DecapCMS](https://decapcms.org/) is an open-source CMS that can be used with
  any static site generator. Lume [has a plugin](../../plugins/decap_cms.md) to
  use it easier.
- [CloudCannon](https://cloudcannon.com/) is a CMS as a service for static
  sites. It's ideal if you need advanced features for publishers.
  [It supports Lume,](https://cloudcannon.com/lume-cms/) among many other static
  site generators.
- [See more CMS in this list](https://jamstack.org/headless-cms/).
