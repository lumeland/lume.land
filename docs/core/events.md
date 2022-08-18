---
title: Events
description: A list of all the events which Lume will dispatch in the lifecycle
order: 10
---

${toc}

Lume has an events system to run some code at certain times during the compiling
process. You can configure those events in the `_config.js` file with the
function `addEventListener`.

## beforeBuild

This event is triggered just before the site build starts. Note that if you are
watching the files with `lume --serve`, this is **only executed once** before
the initial build. Use **beforeUpdate** for subsequent changes.

```js
site.addEventListener("beforeBuild", () => {
  console.log("The build is about to start");
});
```

Note: if the event listener returns `false`, the build process is stopped:

```js
site.addEventListener("beforeBuild", () => {
  return false; // Stop the build
});
```

## afterBuild

This event is triggered after build the site. Note that if you are watching the
files with `lume --serve`, this is **only executed once** after the initial
build. Use **afterUpdate** for subsequent changes.

```js
site.addEventListener("afterBuild", () => {
  console.log("The build is finished");
  console.log(event.pages); // The pages that have been build
  console.log(event.staticFiles); // The files that have been copied
});
```

## beforeUpdate

This event is triggered every time a change is detected on build the site with
`lume --serve`.

```js
site.addEventListener("beforeUpdate", (event) => {
  console.log("New changes detected");
  console.log(event.files); // The files that have changed
});
```

Note: if the event listener returns `false`, the update process is stopped:

```js
site.addEventListener("beforeUpdate", () => {
  return false; // Stop the update
});
```

## afterUpdate

This event is triggered after re-build the site after detecting changes with
`lume --serve`.

```js
site.addEventListener("afterUpdate", (event) => {
  console.log("Site updated");
  console.log(event.files); // The files that have changed
  console.log(event.pages); // The pages that have been rebuilt
  console.log(event.staticFiles); // The static files that have been copied again
});
```

## beforeRender

This event is triggered just after all pages are loaded but before rendered.

```js
site.addEventListener("beforeRender", (event) => {
  console.log("Ready to render the pages");
});
```

## afterRender

This event is triggered just after all pages are rendered but before process.

```js
site.addEventListener("afterRender", (event) => {
  console.log("All pages rendered");
});
```

## beforeSave

This event is triggered just before saving the generated pages.

```js
site.addEventListener("beforeSave", (event) => {
  console.log("All pages are about to be saved");
});
```

Note: if the event listener returns `false`, the save process is stopped:

```js
site.addEventListener("beforeSave", () => {
  return false; // Don't save the files
});
```

## afterStartServer

Event triggered after starting the local server (with `lume --server` command).

```js
site.addEventListener("afterStartServer", () => {
  console.log("Local server started successfully");
});
```

## Execute scripts with events

In addition to functions, you can also execute [scripts](scripts.md) in events
by passing a string with the script name.

```js
// Create the script
site.script("compress", "gzip -r _site site.gz");

// Execute it after build the site
site.addEventListener("afterBuild", "compress").

// Or you can run any script directly
site.addEventListener("afterBuild", "gzip -r _site site.gz").
```

## Events options

Similar to
[web APIs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
the third argument of `addEventListener` allows to customize the event listener.
The available options are:

- **once:** To run the listener only once and then remove it.
- **signal:** To provide an `AbortSignal` to remove the listener at any time.

Example of a listener executed only once:

```js
site.addEventListener("afterUpdate", () => {
  console.log("This is the first update");
}, {
  once: true,
});
```

Example of signal usage:

```js
const controller = new AbortController();
let times = 0;

site.addEventListener("afterUpdate", () => {
  times++;

  // Remove the listener after 5 times
  if (times === 5) {
    controller.abort();
  }

  console.log(`This is the update ${times}`);
}, {
  signal: controller.signal,
});
```
