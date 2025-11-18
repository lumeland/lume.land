---
title: Cheat sheet
description: All configuration options in a simple page
---

## Lume instantiation

These are all the available options (and their default values) when creating a
new site:

```js
const site = lume(
  {
    /** Where the site's source is stored */
    src: "./",

    /** Where the built site will go */
    dest: "./_site",

    /** Whether the destination folder (defined in `dest`) should be emptied before the build */
    emptyDest: true,

    /** The default includes path, relative to the `src` folder */
    includes: "_includes",

    /** The default css file */
    cssFile: "/style.css";

    /** The default js file */
    jsFile: "/script.js";

    /** The default folder for fonts */
    fontsFolder: "/fonts";

    /** The site location (used to generate final urls) */
    location: new URL("http://localhost"),

    /** Set true to generate pretty urls (`/about-me/`) */
    prettyUrls: true,

    /** To consider two urls the equal if the only difference is the case */
    caseSensitiveUrls: true;

    /** Local server options(when using `lume --serve`) */
    server: {
      /** The port to listen on */
      port: 3000,

      /** The hostname to listen on */
      port: "localhost",

      /** Open the server in a browser after starting the server */
      open: false,

      /** The file to serve when getting a 404 error */
      page404: "/404.html",

      /** Whether to use the debug bar or not */
      debugBar: true;

      /** Optional middleware for the server */
      middlewares: [];
    },

    /** Local file watcher options */
    watcher: {
      /** Paths to ignore */
      ignore: [
        "/.git",
        (path) => path.endsWith("/.DS_Store"),
      ],

      /** The interval in milliseconds to check for changes */
      debounce: 100,

      /** Extra files and folders to watch (ouside the src folder) */
      include: [];
    },

    /** Component options */
    components: {
      /** The name of the file to save component css code to */
      cssFile: "/style.css",

      /** The name of the file to save component javascript code to */
      jsFile: "/script.js",

      /** Placeholder used to replace with the final content */
      placeholder: ""
    }
  },
  {
    /** Options for the url plugin, which is loaded by default */
    url: undefined,

    /** Options for the json plugin, which is loaded by default */
    json: undefined,

    /** Options for the markdown plugin, which is loaded by default */
    markdown: undefined,

    /** Options for the modules plugin, which is loaded by default */
    modules: undefined,

    /** Options for the nunjucks plugin, which is loaded by default */
    nunjucks: undefined,

    /** Options for the search plugin, which is loaded by default */
    search: undefined,

    /** Options for the paginate plugin, which is loaded by default */
    paginate: undefined,

    /** Options for the yaml plugin, which is loaded by default */
    yaml: undefined,
  }
)
```

## Lume site configuration

All available functions for configuring the site build:

```js
/** Register an event listener */
site.addEventListener(eventType, fn);

/** Register a plugin */
site.use(plugin);

/** Register a data loader */
site.loadData(extensions, loader);

/** Register a HTML page loader and other options */
site.loadPages(extensions, loader);
site.loadPages(extensions, options);

/** Register a preprocessor */
site.preprocess(extensions, fn);

/** Register a processor */
site.process(extensions, fn);

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

/** Configure the strategy for merging a specfic key in the data cascade */
site.mergeKey(key, merge, scope = "/");

/** Add a file/folder */
site.add(from, to);

/** Ignore files or folder */
site.ignore(...paths);

/** Configure independent scopes to optimize builds when source files update */
site.scopedUpdates(...scopes);

/** Define remote files */
site.remote(filename, url);
site.remote(baseLocal, baseUrl, globOrFilenames);
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

/** Clear the dest directory */
site.clear();

/** Build the site */
site.build();

/** Rebuild the site reloading the changed files */
site.update(changedFiles);

/** Returns the final URL of any page/file */
site.url(path, absolute = false);

/** Get the content of any file */
site.getContent(file, loader);
```
