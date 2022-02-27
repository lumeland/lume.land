---
title: Scripts
description: A guide to use Lume as a script runner
order: 11
---

${toc}

Lume includes a simple script runner that you can use to execute commands or
custom functions. To create a new script, use the function `script()` in your
`_config.js` file:

```js
site.script("deploy", "rsync -r _site/** user@server.com:/var/www/");
```

Now, you can run this script from the CLI with `lume run deploy`.

## Running multiple commands

You can create a script to execute multiple commands, **one after other.** There
are two ways to do that: by adding more arguments or joining the different
commands with `&&`. For example:

```js
site.script(
  "save-site",
  "gzip -r _site site.gz",
  "scp site.gz user@host.com:/home/user/archive",
);

// Alternative way using "&&"
site.script(
  "save-site",
  "gzip -r _site site.gz && scp site.gz user@host.com:/home/user/archive",
);
```

Now, by running `lume run save-site`, these two commands will be executed.

If you don't need to execute the commands in serie but in **parallel**, use an
array of commands or the character `&`:

```js
site.script(
  "compress-assets",
  [
    "gzip -r _site/images images.gz",
    "gzip -r _site/videos videos.gz",
  ],
);

// Alternative way using the character "&"
site.script(
  "compress-assets",
  "gzip -r _site/images images.gz & gzip -r _site/videos videos.gz",
);
```

## Compose scripts

Scripts can execute other scripts, just use the name of a registered script as a
command in another script. For example:

```js
// Create two scripts
site.script("compress", "gzip -r _site site.gz");
site.script("upload", "scp site.gz user@host.com:/home/user/archive");

// Create a third scripts that runs the two previous scripts
site.script("compress-and-upload", "compress", "upload");
```

## Custom functions

Scripts not only can execute CLI commands but also JavaScript functions. For
example:

```js
site.script("add-date-published", () => {
  Deno.writeTextFileSync(
    site.dest("published.txt"),
    `Site published at: ${Date.now()}`,
  );
});
```

## Running scripts from JavaScript

To run a script from JavaScript instead of the CLI, use the `site.run()`
function:

```js
// Create the script
site.script("compress", "gzip -r _site site.gz");

// Run it
site.run("compress");
```
