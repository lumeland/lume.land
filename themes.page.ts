export const layout = "layouts/theme.vto";
export const main_menu = "themes";

const res = await fetch(
  "https://data.jsdelivr.com/v1/package/gh/lumeland/themes",
);
const data = await res.json();
const version = data.versions.shift();
export const baseUrl = `https://cdn.jsdelivr.net/gh/lumeland/themes@${version}`;
const themes = await fetch(`${baseUrl}/themes.json`).then((res) => res.json());

export default async function* () {
  for (const theme of themes) {
    if (theme.lume_version < 3) {
      continue;
    }
    yield {
      url: `/theme/${theme.id}/`,
      title: theme.name,
      baseUrl,
      ...theme,
    };
  }
}
