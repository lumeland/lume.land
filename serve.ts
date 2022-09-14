// deno run --allow-net --allow-read serve.ts
import Server from "lume/core/server.ts";
import expires from "lume/middlewares/expires.ts";
import cacheBusting from "lume/middlewares/cache_busting.ts";
import notFound from "lume/middlewares/not_found.ts";
import analytics from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/google_analytics/mod.ts";
import fscache from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/fs_cache/mod.ts";
import csp from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/csp/mod.ts";

const root = `${Deno.cwd()}/_site`;

const server = new Server({
  port: 8000,
  root,
});

server
  .use(expires())
  .use(cacheBusting())
  .use(notFound({
    root,
    page404: "/404/",
  }))
  .use(analytics({ id: "UA-110819-22" }))
  .use(fscache())
  .use(csp({
    "Strict-Transport-Security": {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    "Report-To": {
      "group": "default",
      "max_age": 31536000,
      "endpoints": [{ "url": "https://jrson.report-uri.com/a/d/g" }],
      "include_subdomains": true,
    },
    "Content-Security-Policy": {
      mergeDefaults: true,
      reportOnly: true,
      directives: {
        "default-src": ["'none'"],
        "base-uri": ["'none'"],
        "object-src": ["'none'"],
        "frame-ancestors": ["'none'"],
        "connect-src": [
          "'self'",
          "https://w3.org",
          "https://shield.deno.dev",
          "https://cdn.jsdelivr.net",
          "https://*.algolia.net",
          "https://*.algolianet.com",
        ],
        "script-src": ["'nonce'", "'self'", "https://cdn.jsdelivr.net"],
        "style-src": ["'nonce'", "'self'", "https://cdn.jsdelivr.net"],
        "font-src": ["'self'", "data:"],
        "img-src": [
          "https://w3.org",
          "https://shield.deno.dev",
          "'self'",
          "data:",
        ],
        "media-src": ["'self'", "data:"],
        "report-uri": "https://jrson.report-uri.com/r/d/csp/reportOnly",
        "report-to": "default",
      },
    },
    "Referrer-Policy": ["no-referrer"],
    "Permissions-Policy":
      "accelerometer=(), autoplay=(), camera=(), microphone=()",
    "X-Frame-Options": true,
    "X-Content-Type-Options": true,
    "X-XSS-Protection": true,
    "X-Permitted-Cross-Domain-Policies": true,
    "X-Powered-By": false,
  }))
  .start();

console.log("Listening on http://localhost:8000");
