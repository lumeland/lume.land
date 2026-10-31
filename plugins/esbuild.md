---
title: ESbuild
description: Bundle JavaScript, TypeScript and JSX files using esbuild library.
category: js
---

## Description

The plugin `esbuild` processes your JavaScript and TypeScript files using
[esbuild bundler](https://esbuild.github.io/).

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "@lumeland/lume";
import esbuild from "@lumeland/plugin-esbuild";

const site = lume();

site.use(esbuild(/* Options */));
site.add("script.ts"); //Add the files to process

export default site;
```
