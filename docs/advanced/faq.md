---
title: FAQ
description: Most frequent questions
order: 10
---

## Why Lume only works on Deno?

Deno is a modern JavaScript runtime with some nice features that other runtimes
don't have, like support for some Web standards or a great permissions system.
But the most important feature is **HTTP imports**. With Deno you only need to
import a single URL and you can inmediately use Lume and all its plugins.
Compared with Node or Bun, where you need to install individually every plugin
and manage a `node_modules` folder with thousand of dependencies, in Lume we
believe HTTP imports is cleaner, faster and straightforward system.

If other JS runtimes implemented HTTP imports, Lume would support them.

## But Deno is a company. What happens if it disappears?

I'm sure this won't happen. But if did, probably the runtime would be maintained
by the community. As a last resort, Lume would be ported to Node. We would lose
HTTP imports but at least we could keep using Lume. This is a long-term project,
not tied to the Deno company. It doesn't depend on VC funding or must be a
viable business. It's just an tool with a community that use and support it. The
same would be happen if Deno
[removed the support for HTTP imports](https://deno.com/blog/http-imports),
since there wouln't be any reason or motivation to keep maintaining a Deno-only
project.

## What's your plans for Lume?

I created Lume as a tool to build websites. I'm using it actively in my personal
projects and in my job. It's not a product that I must monetize and I have no
intention of doing so. I enjoy a lot working on Lume, writing the code by myself
(not by AI), talking with the community and help them. I love when some people
donate money to the project without asking for anything in return, or contribute
with a pull request, or just giving feedback and ideas. I'm learning a lot on
this journey and this is more than I expected when I started. Lume is 5 years
now, but my intention is to keep maintaining it for much more years.

There won't be a Lume PRO version or something like this. Never. If I decide at
some point to create a company, it would be something different and won't affect
Lume at all.
