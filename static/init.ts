const res = await fetch(
  `https://data.jsdelivr.com/v1/package/gh/lumeland/init`,
);
const data = await res.json();
const version = data.versions.shift();
const { run } = await import(
  `https://cdn.jsdelivr.net/gh/lumeland/init@${version}/mod.ts`
);
run();
