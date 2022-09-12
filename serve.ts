// deno run --allow-net --allow-read serve.ts
import Server from "lume/core/server.ts";
import expires from "lume/middlewares/expires.ts";
import cacheBusting from "lume/middlewares/cache_busting.ts";
import notFound from "lume/middlewares/not_found.ts";
import analytics from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/google_analytics/mod.ts";
import fscache from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/fs_cache/mod.ts";

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
  .start();

console.log("Listening on http://localhost:8000");
