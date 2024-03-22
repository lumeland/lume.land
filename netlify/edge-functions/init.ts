export default async (request: Request) => {
  const { headers } = request;
  const accept = headers.get("accept");
  const agent = headers.get("user-agent");

  if (!accept?.includes("text/html") && !isOpenGraphUA(agent)) {
    const res = await fetch(
      `https://cdn.deno.land/lume_init/meta/versions.json`,
    );
    const versions = await res.json();
    return Response.redirect(
      `https://deno.land/x/lume_init@${versions.latest}/mod.ts`,
      301,
    );
  }
};

export const config = { path: "/" };

function isOpenGraphUA(header: string | null): boolean {
  if (!header) {
    return false;
  }

  return header.startsWith("Twitterbot") || header.startsWith("Slackbot");
}
