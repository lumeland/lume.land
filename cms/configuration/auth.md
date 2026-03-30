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

## Custom auth provider

For advanced use cases, you can implement your own authentication method by
passing a custom `AuthProvider` as the second argument to `cms.auth()`.

An `AuthProvider` is an object implementing the following interface:

```ts
interface AuthProvider {
  /** Called once on startup with the user map and base path */
  init(
    options: { basePath: string; users: Map<string, UserConfiguration> },
  ): void;

  /** Called on every request. Return the matched username on success,
   *  or a Response (e.g. a challenge or redirect) to deny access. */
  login(request: Request): Response | string | Promise<Response | string>;

  /** Called when the user triggers the logout action */
  logout(request: Request): Response | Promise<Response>;

  /** Handles requests under the /auth/* path (e.g. form submissions or OAuth callbacks) */
  fetch(request: Request): Response | Promise<Response>;
}
```

### Example: login form

The following example replaces the Basic Auth browser dialog with a simple HTML
login form. It uses a cookie to keep the session alive — no external
dependencies required:

```js
cms.auth(
  { admin: { password: "secret" } },
  {
    init(options) {
      this.options = options;
    },
    login(request) {
      const cookie = request.headers.get("cookie") ?? "";
      const user = cookie.match(/session=([^;]+)/)?.[1];
      if (user && this.options.users.has(user)) return user;

      const basePath = this.options.basePath === "/" ? "" : this.options.basePath;
      return new Response(
        `<form method="POST" action="${basePath}/auth/login">
          <input name="user" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
        </form>`,
        { headers: { "content-type": "text/html" } },
      );
    },
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname.endsWith("/login") && request.method === "POST") {
        const data = await request.formData();
        const user = data.get("user");
        const password = data.get("password");
        const config = this.options.users.get(user);

        if (config && config.password === password) {
          return new Response(null, {
            status: 302,
            headers: {
              location: this.options.basePath,
              "set-cookie": `session=${user}; path=/; Secure; HttpOnly; SameSite=Strict`,
            },
          });
        }

        return new Response("Invalid credentials", { status: 401 });
      }
      return new Response("Not found", { status: 404 });
    },
    logout() {
      return new Response(null, {
        status: 302,
        headers: {
          location: this.options.basePath,
          "set-cookie": "session=; path=/; Secure; HttpOnly; Max-Age=0",
        },
      });
    },
  },
);
```

> [!note]
>
> The session cookie in this example is not signed or encrypted, so it should
> not be used in production as-is. For a production setup, consider signing the
> cookie value or using a proper session library.
