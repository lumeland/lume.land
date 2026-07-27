---
title: Well known
description: Generate some `.well-known` urls
mod: plugins/well_known.ts
tags: 
 - utils
---

## Description

This plugin makes it easier to generate some
[`.well_known` URLs](https://en.wikipedia.org/wiki/Well-known_URI). Since Lume
is a static page generator, this plugin is limited to the specs that can be
implemented statically and doesn't require dynamic server-side behaviours. In
this first version, the implemented standards are:

- [atProto handle](https://atproto.com/specs/handle#https-well-known-method)
- [security.txt](https://securitytxt.org/)
- [trust.txt](https://journallist.net/reference-document-for-trust-txt-specifications)
- [webfinger](https://webfinger.net/), (it only supports a single fixed
  subject, not dynamic `?resource=` lookups)
- [gpc](https://w3c.github.io/gpc/)
- [PWA origin migration](https://developer.chrome.com/blog/seamless-pwa-origin-migration)
- [matrix](https://spec.matrix.org/v1.19/client-server-api/#well-known-uris)

## Installation

Import this plugin in your `_config.ts` file to use it and pass the desired data:

```js
import lume from "lume/mod.ts";
import wellKnown from "lume/plugins/well_known.ts";

const site = lume();

site.use(wellKnown({
  gpc: {
    gpc: true,
    lastUpdate: Temporal.PlainDate.from("2026-07-01"),
  },
  atProto: "did:plc:lqbfqodxim3n27heuou7do3g",
  trust: {
    contact: "mailto:oom@oscarotero.com",
    social: "https://fosstodon.org/@lume",
    dataTrainingAllowed: false,
  },
}));

export default site;
```
