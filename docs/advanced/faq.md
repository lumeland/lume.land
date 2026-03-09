---
title: FAQ
description: Most frequent questions
order: 10
---

## Why Lume only works on Deno?

Deno is a modern JavaScript runtime with some nice features that other runtimes
don’t have, like support for some web standards and a great permissions system.
But the most important feature is **HTTP imports**. With Deno you only need to
import a single URL and you can inmediately use Lume and all its plugins. For
Lume we believe HTTP imports is a cleaner, faster and more straightforward
system compared to Node or Bun, where you need to install every plugin
individually and manage a `node_modules` folder with thousands of dependencies.
If other JS runtimes implemented HTTP imports, Lume would support them.

## But Deno is a company. What happens if it disappears?

I’m sure this won’t happen. But if it did, the open source Deno runtime would
probably be maintained by the community. As a last resort, Lume would be ported
to Node. We would lose HTTP imports but at least we could keep using Lume. This
is a long-term project, not tied to the Deno company. It doesn’t depend on VC
funding, and does not need to be a viable business. It’s just an tool with a
community that uses and supports it. If Deno
[removed support for HTTP imports](https://deno.com/blog/http-imports), we would
port Lume to Node, since there wouldn’t be any reason or motivation to keep
maintaining a Deno-only project.

## What's your plans for Lume?

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
