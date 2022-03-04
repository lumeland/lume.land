// deno run --allow-net --allow-read serve.ts

import Server from "https:/deno.land/x/lume/core/server.ts";

import type { Middleware } from "https:/deno.land/x/lume/core.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(expires());

server.start();

console.log("Listening on http://localhost:8000");

interface Options {
  /** The default duration for unknown types */
  defaultDuration: number;

  /** List of types with the cache duration */
  durations: Record<string, number>;
}

/** Set the Expires header for better caching */
export default function expires(userOptions?: Partial<Options>): Middleware {
  const HOUR = 3600000;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;

  const defaults: Options = {
    defaultDuration: WEEK,
    durations: {
      "text/html": 0,
      "application/json": 0,
      "application/xml": 0,
      "application/atom+xml": HOUR,
      "application/rdf+xml": HOUR,
      "application/rss+xml": HOUR,
    },
  };

  const options = { ...defaults, ...userOptions };

  return async (request, next) => {
    const response = await next(request);
    const { headers } = response;
    const type = headers.get("Content-Type");
    const duration = (type && options.durations[type]) ||
      options.defaultDuration;
    headers.set("Expires", new Date(Date.now() + duration).toUTCString());

    return response;
  };
}
