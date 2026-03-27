---
title: FAQ
description: Most frequent questions
order: 10
---

## Why is the project called Lume? What does the logo mean?

**Lume** (pronounced `/lume/` [🔈](https://ilg.usc.es/pronuncia/mp3/l/1833.mp3))
is the [Galician](https://en.wikipedia.org/wiki/Galician_language) word for
_fire_. This project is not only a static site generator, but also a way to
**discover and learn about my culture**. That's why I chose a Galician word as
the name, and every minor version is dedicated to a relevant Galician person.

Fire is also a good metaphor for what this tool does: it gets a list of files
from a folder and "burns" them, creating a site. It reminds me of when people
"burned" or "toasted" CDs or DVDs with music and movies.

The logo is a firefly (a.k.a lightning bug) because I wanted an animal as a
mascot that was related to fire. In Galician, they are called "vagalumes"
(wander fires). You can learn more about the logo design
[in this post](https://lume.land/blog/posts/new-logo/).

## Why does Lume only work on Deno?

Deno is a modern JavaScript runtime with some nice features that other runtimes
don’t have, like support for some web standards and a great permissions system.
But the most important feature is **HTTP imports**. With Deno you only need to
import a single URL and you can inmediately use Lume and all its plugins. For
Lume we believe HTTP imports is a cleaner, faster and more straightforward
system compared to Node or Bun, where you need to install every plugin
individually and manage a `node_modules` folder with thousands of dependencies.
If other JS runtimes implemented HTTP imports, Lume would support them.

## But Deno is a company. What happens if it disappears?

**I’m sure this won’t happen**. But if it did, the open source Deno runtime
would probably be maintained by the community. As a last resort, Lume would be
ported to Node. We would lose HTTP imports but at least we could keep using
Lume. This is a long-term project, not tied to the Deno company. It doesn’t
depend on VC funding, and does not need to be a viable business. It’s just an
tool with a community that uses and supports it. If Deno
[removed support for HTTP imports](https://deno.com/blog/http-imports), we would
port Lume to Node, since there wouldn’t be any reason or motivation to keep
maintaining a Deno-only project.

## Why are HTTP imports better than JSR imports?

JSR isn't a bad product, but it's not the solution that the JavaScript ecosystem
needs. The principal problem of JSR is that it's a copy of NPM (a "superset of
NPM" as it was advertised) and reproduces the same mistakes:

- It's **incompatible with Web standards and import maps**. You can't simply
  import modules stored on disk or HTTP. This led Deno to create the property
  `links` in the `deno.json` file only for this specific use case, but it's more
  limited and less straightforward than import maps.
- It's **centralized and vendor lock-in**. This means that if JSR stops working,
  it's blocked in your country or becomes evil, there's no easy exit. We have
  the experience of NPM being maintained by VC funding for years and acquired
  then by Microsoft. JSR is not a company, but it's operated by one (Deno), and
  the governance board consists of members from other companies. In the same way
  that Deno deprecated `deno.land/x`, there is no guarantee that the same thing
  won't happen to JSR.
- With HTTP imports it's easy to import a **stable version or a hash commit**,
  which is great because it allows us to test a new feature and provide feedback
  easily without the pressure of releasing a new version. This decentralized
  nature that "simply works" is something impossible with JSR.
- Under some circumstances, the command `deno install` **downloads all
  dependencies**. Lume and all plugins are in a single package, which means that
  all dependencies of all plugins would be downloaded, even if you don't need
  them. To prevent that, Lume should be splitted into different packages: a core
  package, one package per plugin (+50), and each package with different
  versions and dependencies. This complicates the development and testing of
  Lume, making the use of plugins by final users more cumbersome. Basically, JSR
  encourages the creation of micropackages and dependency hell.
- JSR is very picky about the code that you can publish. It's not fully
  compatible with JSX or some TypeScript features like declaring global
  namespaces. It doesn't allow importing modules from URLs or from the disk
  (like your `_config.ts` file or other JavaScript/TypeScript files in your
  source folder that Lume needs to load).
- JSR by default uses semantic version ranges (like `^1.0`). This means that
  depending on when you install the package, the dependencies installed are
  different. This has advantages (automatic updates), but also drawbacks like
  **security threats** (hijacked packages) and **instability** (semantic
  versioning is great in theory, but is an act of faith in practice, since
  packages may introduce breaking changes in minor or patch versions). You have
  to use a lock file to pin all versions to avoid this problem, but this doesn't
  work when you create a new project from scratch, because the lock file hasn't
  been created yet. HTTP imports do the opposite: **they're stable and secure by
  default**, because they use fixed versions, there are no moving parts, and the
  update action must be intentional and conscious.

## What are your plans for Lume?

I created Lume as a tool to build websites. I’m using it actively in my personal
projects and in my job. It’s not a product that I must monetize and I have no
intention of doing so. I enjoy working on Lume a lot, writing the code by myself
(not with AI), talking with the community, and helping them. I love when people
donate money to the project without asking for anything in return, or contribute
with a pull request, or just give feedback and ideas. I’m learning a lot on this
journey, more than I expected when I started. Lume is 5 years old now, but my
intention is to keep maintaining it for many years to come.

All of Lume will stay open source and free to use, forever. There won’t be a
Lume Pro version or anything like that. Never. If I decide at some point to
create a company, it would be something separate, and won’t affect Lume at all.
