---
title: URLs
description: How define the output filename
order: 8
---

As said in [Page files](../creating-pages/page-files.md), the output filename is
generated using the original source file path:

```txt
posts/my-first-post.md  =>  /posts/my-first-post/index.html
```

By default, the pages are saved as "pretty URLs", using directories for the path
and a `index.html` file. So the final URL is `/posts/my-fist-post/`. To disable
this behaviour, set the option `prettyUrls` to `false` in your `_config.js` file
(see [Configuration](../getting-started/config-file.md)).

```js
const site = lume({
  prettyUrls: false,
});
```

```txt
/posts/my-first-post.md  =>  /posts/my-first-post.html
```

## The `url` variable

The variable `url` defined in the page allows to customize the output file
individually. For example:

```yml
---
title: My first post
url: /posts/welcome/
---
```

In this example, the `url` value will be used to generate the output file
instead of the filename:

```txt
/posts/my-first-post.md  =>  /posts/welcome/index.html
```

Note that defining manually the URL of a page will makes that `prettyUrls`
option **won't have any effect.** For example:

```yml
# This outputs /posts/welcome/index.html
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
title: My fist post
url: ./welcome/
---
```

In this example, the page will be saved using the directory path where the
source file is saved but adding `welcome` in the last part of the URL.

```txt
/posts/my-first-post.md  =>  /posts/welcome/index.html
```

Using `../welcome/` as URL will remove also the last directory.

```txt
/posts/my-first-post.md  =>  /welcome/index.html
```

## URLs as functions

The variable `url` accepts also a function that will be used to generate the
final value. This function will receive the current page as the first argument.

For example, let's say that we want to generate automatically all URLs of our
posts, using the title value. We can create a `_data.js` file in the `/post/`
directory, with the following code:

```js
export function url(page) {
  return `./${page.data.title}/`;
}
```

Now, all pages in the post directory share the same `url` function, that returns
the title of the page as a relative URL, for example `./My first post/` (See
[Shared data](../creating-pages/shared-data.md)).

Due the URL is relative, the current directory is appended automatically (it
will be resolved to `/post/My first post/`). And if you are using the
[`slugify_urls`](../plugins/slugify_urls.md) plugin all output paths are
slugified automatically, so the final url will be `/post/my-fist-post/`.

Using functions as URLs gives a lot of flexibility to generate the URLs as you
want.
