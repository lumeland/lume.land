export default async (request: Request) => {
  const agent = request.headers.get("user-agent").toLowerCase();

  if (agent.startsWith("deno")) {
    const res = await fetch(
      `https://cdn.deno.land/lume_init/meta/versions.json`,
    );
    const versions = await res.json();
    console.log(request);
    return Response.redirect(
      `https://deno.land/x/lume_init@${versions.latest}/mod.ts`,
      301,
    );
  }
};

export const config = { path: "/" };
