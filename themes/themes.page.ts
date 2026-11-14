export const layout = "layouts/theme.vto";
export const main_menu = "themes";

export default async function* ({ themes }: Lume.Data) {
  for (const theme of themes) {
    yield {
      url: `/theme/${theme.id}/`,
      title: theme.name,
      ...theme,
    };
  }
}
