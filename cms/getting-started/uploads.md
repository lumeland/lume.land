---
title: Setup upload folders
description: How to configure LumeCMS to upload files into a folder
order: 3
---

So far, we have learned how to configure LumeCMS to edit the content of our site
using documents and collections. However, another important aspect of any site
is handling uploads. You may need to upload files such as images, audio, or
videos to use in your posts.

## Creating uploads

To define an upload directory in the CMS, use the `cms.upload()` function. For
example, if you want to store all uploads in the `files` folder:

```js
cms.upload("Files", "src:files");
```

The arguments to create a new upload entity are the same as for documents and
collections, except that you don't need to specify a list of fields.

Now, you will see a new "Files" section in the CMS where you can upload, edit,
or remove files.
