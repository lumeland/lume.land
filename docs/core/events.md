---
title: Events
description: A list of all events which Lume will dispatch in its lifecycle
order: 10
---

Lume has an events system to run code at certain times during the compilation
process. You can configure those events in your configuration file with the
`addEventListener` function.

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

This event is triggered after building the site. Note that if you are watching
the files with `lume --serve`, this is **only executed once**, after the initial
build. Use **afterUpdate** for subsequent changes.

```js
site.addEventListener("afterBuild", (event) => {
  console.log("The build is finished");
  console.log(event.pages); // The pages that have been build
  console.log(event.staticFiles); // The files that have been copied
});
```

## beforeUpdate

This event is triggered every time a change is detected when building the site
with `lume --serve`.

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

This event is triggered after re-building the site with `lume --serve`.

```js
site.addEventListener("afterUpdate", (event) => {
  console.log("Site updated");
  console.log(event.files); // The files that have changed
  console.log(event.pages); // The pages that have been rebuilt
  console.log(event.staticFiles); // The static files that have been copied again
});
```

## afterLoad

Event triggered after all files in the source folder are loaded (but not
processed). It lets you do low-level operations like renaming files.

## beforeRender

This event is triggered after all pages are loaded, but before they are
rendered.

```js
site.addEventListener("beforeRender", (event) => {
  console.log("Ready to render the pages");
  console.log(event.pages); // The pages to render
});
```

## afterRender

This event is triggered after all pages are rendered, but before they are
processed.

```js
site.addEventListener("afterRender", () => {
  console.log("All pages rendered");
});
```

## beforeSave

This event is triggered before saving the generated pages.

```js
site.addEventListener("beforeSave", () => {
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

This event is triggered after starting the local server (with `lume --server`
command).

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
[web APIs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener),
the third argument of `addEventListener` allows customizing the event listener.
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

Example using signals:

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
