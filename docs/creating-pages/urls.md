---
title: URLs
description: Set custom urls for pages using the `url` variable.
order: 8
---

As explained in [Page files](../creating-pages/page-files.md), the output
filename is generated using the original source file path:

```txt
posts/my-first-post.md  =>  /posts/my-first-post/index.html
```

By default, the pages are saved as "pretty URLs", using directories for the path
and a `index.html` file. So the final URL is `/posts/my-first-post/`. To disable
this behaviour, set the option `prettyUrls` to `false` in your `_config.js` file
(see [Configuration](../configuration/config-file.md#prettyurls)).

```js
const site = lume({
  prettyUrls: false,
});
```

```txt
/posts/my-first-post.md  =>  /posts/my-first-post.html
```

## The `url` variable

The variable `url` defined in a page allows customizing the output file
individually. For example:

```yml
---
title: My first post
url: /posts/welcome/
---
```

In this example, the `url` value changes the output file name:

```txt
/posts/my-first-post.md  =>  /posts/welcome/index.html
```

Note that manually defining the URL of a page means that the `prettyUrls` option
**won't have any effect.** For example:

```yml
# Use a trailing / to create pretty urls.
# For example, this outputs /posts/welcome/index.html
url: /posts/welcome/

# This outputs /posts/welcome (a file without extension)
url: /posts/welcome

# This outputs /posts/welcome.html
url: /posts/welcome.html
```

## Relative URLs

If you only want to change the last part of the URL, you can use relative paths.
For example:

```yml
---
title: My first post
url: ./welcome/
---
```

In this example, the page will be saved using the directory path where the
source file is saved but adding `welcome` in the last part of the URL.

```txt
/posts/my-first-post.md  =>  /posts/welcome/index.html
```

Using `../welcome/` as URL will also remove the last directory.

```txt
/posts/my-first-post.md  =>  /welcome/index.html
```

## URLs as functions

The variable `url` also accepts a function to generate the final value
dynamically. This function has the current page object as the first argument.

For example, let's say that we want to automatically generate all URLs of our
posts using the title value. We can create a `_data.js` file in the `/posts/`
directory with the following code:

```js
export function url(page) {
  return `./${page.data.title}/`;
}
```

Now, all pages in this directory share the same `url` function. The function
returns the title of the page as a relative URL, for example ,`./My first post/`
(See [Shared data](../creating-pages/shared-data.md)).

Because the URL is relative, the current directory is appended automatically (it
will be resolved to `/post/My first post/`). And if you are using the
`slugify_urls` plugin, all output paths are slugified automatically, so the
final URL would be `/post/my-first-post/`.

Using functions as URLs gives a lot of flexibility to generate URLs exactly the
way you want.

## Setting url to `false`

Setting the `url` variable to `false` prevents the page from being processed by
Lume.

```yml
---
title: This is a title
url: false # Ignore this page for now
---
```

## Basename

As of Lume v2, the new variable `basename` is introduced to better customize URL
generation. It's a special value affecting to the page or directory where it's
defined, and allows changing how the name of the file/directory affects the
final URL.

If the `basename` is defined in a `_data.*` file, it affects the directory where
the _data file is. For example, let's say we have the following file:

```txt
/blog/posts/hello-world.md
```

This file is exported with the URL `/blog/posts/hello-world/`. If we want to
replace the part `/posts/` with `/articles/`, we can create a `_data.yml` file
in the `/blog/posts` folder with the following code:

```yml
basename: articles
```

Now, this folder will use the name `articles` for URL generation, so the final
URL of the file is `/blog/articles/hello-world/`.

You can set the `basename` variable to empty to not use the folder name in the
final URL:

```yml
basename: ""
```

The final URL of the file is now `/blog/hello-world/`, with the `/post/` part
removed. You can also remove the previous folder with:

```yml
basename: "../"
```

The final URL of the file is now `/hello-world/`.
