if (!Deno.args.includes("--dev") && !Deno.args.includes("-d")) {
  const { run } = await import("https://deno.land/x/lume_init@v0.3.1/mod.ts");
  run();
} else {
  const res = await fetch(
    `https://cdn.deno.land/lume_init/meta/versions.json`,
  );
  const versions = await res.json();
  const { run } = await import(
    `https://deno.land/x/lume_init@${versions.latest}/mod.ts`
  );
  run();
}
