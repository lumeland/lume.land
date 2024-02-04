---
title: Uploads
description: Setup folders to upload files by the CMS
order: 4
---

Uploads are other LumeCMS primitives, and allows to define folders to upload,
edit or remove files. It allows to explore these files in the interface and even
preview the content.

To define a upload element in LumeCMS you need 2 things:

- The upload name. For example: "Images".
- The storage used to read and write the content.

Use the `cms.upload()` function to setup a upload folder:

```ts
import lumeCMS from "lume_cms/mod.ts";

const cms = lumeCMS();

cms.upload("images", "src:images");

export default cms;
```

In the example above, we have defined the `images` upload folder, pointing to
the `images` folder in the `src` storage.
