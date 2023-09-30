---
title: Cheat sheet
description: All configuration options in a simple page
---

## Lume instantation

These are all available options (and the default values) when create a new site:

```js
const site = lume(
  {
    /** The path of the site source */
    src: "./",

    /** The path of the built destination */
    dest: "./_site",

    /** Whether the empty folder should be emptied before the build */
    emptyDest: true,

    /** The default includes path */
    includes: "_includes",

    /**
     * Set `true` to enable the `dev` mode
     * @deprecated (will be removed in Lume 2)
     */
    dev: false,

    /** The site location (used to generate final urls) */
    location: new URL("https://localhost:3000"),

    /** Set true to generate pretty urls (`/about-me/`) */
    prettyUrls: true,

    /**
     * Set `true` to skip logs
     * @deprecated (will be removed in Lume 2)
     */
    quiet: false,

    /** The local server options */
    server: {
      /** The port to listen on */
      port: 3000,

      /** To open the server in a browser */
      open: false,

      /** The file to serve on 404 error */
      page404: "/404.html",

      /** Optional middlewares for the server */
      middlewares: [];
    },

    /** The local watcher options */
    watcher: {
      /** Paths to ignore by the watcher */
      ignore: [
        "/.git",
        (path) => path.endsWith("/.DS_Store"),
      ],

      /** The interval in milliseconds to check for changes */
      debounce: 100,
    },

    /** The components options */
    components: {
      /** The variable name used to access to the components */
      variable: "comp",

      /** The name of the file to save the components css code */
      cssFile: "/components.css",

      /** The name of the file to save the components javascript code */
      jsFile: "/components.js",
    }
  },
  {
    /** Options for url plugin loaded by default */
    url: undefined,

    /** Options for json plugin loaded by default */
    json: undefined,

    /** Options for markdown plugin loaded by default */
    markdown: undefined,

    /** Options for modules plugin loaded by default */
    modules: undefined,

    /** Options for nunjucks plugin loaded by default */
    nunjucks: undefined,

    /** Options for search plugin loaded by default */
    search: undefined,

    /** Options for paginate plugin loaded by default */
    paginate: undefined,

    /** Options for yaml plugin loaded by default */
    yaml: undefined,
  }
)
```

## Lume site configuration

All available functions to configure the site build:

```js
/** Register a event listener */
site.addEventListener(eventType, fn);

/** Register a plugin */
site.use(plugin);

/** Register a script under a name */
site.script(name, commandOrFunction);

/** Register a data loader */
site.loadData(extensions, loader);

/** Register a HTML page loader, optionally a template engine */
site.loadPages(extensions, loader, engine);

/** Register an assets page loader */
site.loadAssets(extensions, loader);

/**
 * Register a component loader
 * @deprecated (will be removed in Lume 2)
 */
site.loadComponents(extensions, loader, engine);

/**
 * Register a custom includes folder path for some extensions
 * @deprecated (will be removed in Lume 2)
 */
site.includes(extensions, path);

/**
 * Register a template engine for some extensions
 * @deprecated (will be removed in Lume 2)
 */
site.engine(extensions, engine);

/** Register a preprocessor */
site.preprocess(extensions, fn);

/** Register a preprocessor passing all matched pages */
site.preprocessAll(extensions, fn);

/** Register a processor */
site.process(extensions, fn);

/** Register a processor passing all matched pages */
site.processAll(extensions, fn);

/** Register a template filter */
site.filter(name, fn, async = false);

/** Register a template helper */
site.helper(name, fn, options);

/** Register a data variable */
site.data(name, value, scope = "/");

/** Register a page */
site.page(pageData, scope = "/");

/** Register a component */
site.component(context, component, scope = "/");

/** Configure the strategy to merge a key in the data cascade */
site.mergeKey(key, merge, scope = "/");

/** Copy a static file/folder */
site.copy(from, to);

/** Copy the remaining files */
site.copyRemainingFiles(filter);

/** Ignore files or folder */
site.ignore(...paths);

/** Configure independent scopes to optimize the build after updating */
site.scopedUpdates(...scopes);

/** Define a remote file */
site.remoteFile(filename, url);

/**
 * Save the content of a file in the cache
 * @deprecated (will be removed in Lume 2)
 */
site.cacheFile(filename, data);
```

## Lume functions

Other useful functions in the `site` instance:

```js
/** Returns the absolute path to the root directory */
site.root(...subdirs);

/** Returns the absolute path to the src directory */
site.src(...subdirs);

/** Returns the absolute path to the dest directory */
site.dest(...subdirs);

/** Dispatch an event */
site.dispatchEvent(event);

/** Run a script registered with `site.script()` */
site.run(script);

/** Clear the dest directory */
site.clear();

/** Build the site */
site.build();

/** Rebuild the site reloading the changed files */
site.update(changedFiles);

/** Render a single page (used by on_demand plugin) */
site.renderPage(file, extraData);

/** Returns the final URL of any page/file */
site.url(path, absolute = false);

/** Get the content of any file */
site.getContent(file, loader);
```
