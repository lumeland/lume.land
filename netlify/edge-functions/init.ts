export default (request: Request) => {
  const { headers } = request;
  const accept = headers.get("accept");
  const agent = headers.get("user-agent");

  if (!accept?.includes("text/html") && !isOpenGraphUA(agent)) {
    return Response.redirect("https://deno.land/x/deno_init/mod.ts", 301);
  }
};

export const config = { path: "/" };

function isOpenGraphUA(header: string | null): boolean {
  if (!header) {
    return false;
  }

  return header.startsWith("Twitterbot") || header.startsWith("Slackbot");
}
