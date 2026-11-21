export const layout = "layouts/theme.vto";
export const main_menu = "themes";

export default async function* ({ themes }: Lume.Data, { url }: Lume.Helpers) {
  for (const theme of themes) {
    yield {
      url: `/theme/${theme.id}/`,
      title: theme.name,
      ...theme,
    };
  }

  // JSON API
  yield {
    url: "/themes.json",
    content: JSON.stringify(
      themes.map((theme) => ({
        name: theme.name,
        id: theme.id,
        description: theme.description,
        specifier: theme.specifier,
        author: theme.author,
        demo: theme.demo,
        screenshots: [
          url(`/img/screenshots/${theme.id}/desktop-light.webp`, true),
          url(`/img/screenshots/${theme.id}/desktop-dark.webp`, true),
          url(`/img/screenshots/${theme.id}/mobile-light.webp`, true),
          url(`/img/screenshots/${theme.id}/mobile-dark.webp`, true),
        ]
      }))
    , null, 2)
  }
}
