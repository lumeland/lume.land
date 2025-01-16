---
title: Auth
description: Configure the user authentication
order: 5
---

LumeCMS implements the
['Basic' HTTP Authentication](https://datatracker.ietf.org/doc/html/rfc7617).
Use the function `auth` with an object with the usernames and passwords:

```js
cms.auth({
  user1: "password1",
  user2: "password2",
});
```

If you don't want to have the passwords visible in the configuration file, you
can use environment variables:

```js
const user = Deno.env.get("CMS_USERNAME");
const password = Deno.env.get("CMS_PASSWORD");

cms.auth({
  [user]: password,
});
```
