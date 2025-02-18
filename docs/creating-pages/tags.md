---
title: Tags
description: Use tags to group and organize pages
order: 7
---

You can assign one or multiple tags to pages using the `tags` variable. Tags
allows you to group content in interesting ways.

For example, in a blog site, you may want to group posts from different
categories:

```yaml
---
title: The history of static site generators
tags:
  - post
  - ssg
---
```

This post has two tags, one used to identify the type of page (post) and another
with the topic (ssg). To collect all pages tagged as `post` in the layouts, use
the `search` function:

```vento
<ul>
  {{ for post of search.pages("post") }}
  <li>{{ post.title }}</li>
  {{ /for }}
</ul>
```

And to get all pages tagged as `post` and `ssg`, add the two tag names separated
with a space:

```vento
<ul>
  {{ for post of search.pages("post ssg") }}
  <li>{{ post.title }}</li>
  {{ /for }}
</ul>
```

## Tags in `_data`

Unlike other values, when you define `tags` in a `_data.*` file and in the
pages, the value is not overridden, but merged. In other words: the page will
have all tags defined in `_data.*` **and** in the page. In the previous example,
instead of assigning the "post" tag to all pages manually, you could define it
in a `_data.*` file in the directory where all posts are stored and use the
front matter to assign the other tags individually.
