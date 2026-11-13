export const layout = "layouts/theme.vto";
export const main_menu = "themes";

interface Theme {
  name: string;
  id: string;
  description: string;
  author: string;
  specifier: string;
  repo: string;
  demo?: string;
  screens: {
    desktop: string;
    desktop_dark?: string;
    mobile?: string;
    mobile_dark?: string;
  }
}

export const baseUrl = `https://cdn.jsdelivr.net/gh/lumeland/themes@0.0.12`;

const themes: Theme[] = [
  {
    name: "Simple Blog",
    id: "simple-blog",
    description: "Lume theme to create a blog.",
    author: "Óscar Otero",
    specifier: "@lumeland/theme-simple-blog",
    repo: "https://github.com/lumeland/theme-simple-blog/",
    demo: "https://lumeland.github.io/theme-simple-blog/",
    screens: {
      desktop: `${baseUrl}/themes/simple-blog/desktop.png`,
      desktop_dark: `${baseUrl}/themes/simple-blog/desktop_dark.png`,
      mobile: `${baseUrl}/themes/simple-blog/mobile.png`,
      mobile_dark: `${baseUrl}/themes/simple-blog/mobile_dark.png`,
    }
  },
  {
    name: "Simple Me",
    id: "simple-me",
    description: "Lume theme to create a Linktree alternative.",
    author: "Óscar Otero",
    specifier: "@lumeland/theme-simple-me",
    repo: "https://github.com/lumeland/theme-simple-me/",
    screens: {
      desktop: `${baseUrl}/themes/simple-me/desktop.png`,
      desktop_dark: `${baseUrl}/themes/simple-me/desktop_dark.png`,
      mobile: `${baseUrl}/themes/simple-me/mobile.png`,
      mobile_dark: `${baseUrl}/themes/simple-me/mobile_dark.png`,
    }
  },
  {
    name: "Simple Wiki",
    id: "simple-wiki",
    description: "Lume theme to create a wiki.",
    author: "Óscar Otero",
    specifier: "@lumeland/theme-simple-wiki",
    
    repo: "https://github.com/lumeland/theme-simple-wiki/",
    screens: {
      desktop: `${baseUrl}/themes/simple_wiki/desktop.png`,
      desktop_dark: `${baseUrl}/themes/simple_wiki/desktop_dark.png`,
      mobile: `${baseUrl}/themes/simple_wiki/mobile.png`,
      mobile_dark: `${baseUrl}/themes/simple_wiki/mobile_dark.png`,
    }
  },
  {
    name: "Tech CV",
    id: "tech-cv",
    description: "Lume theme to create a tech CV online.",
    author: "Óscar Otero",
    specifier: "@lumeland/theme-tech-cv",
    repo: "https://github.com/lumeland/theme-tech-cv/",
    screens: {
      desktop: `${baseUrl}/themes/tech-cv/desktop.png`,
      desktop_dark: `${baseUrl}/themes/tech-cv/desktop_dark.png`,
      mobile: `${baseUrl}/themes/tech-cv/mobile.png`,
      mobile_dark: `${baseUrl}/themes/tech-cv/mobile_dark.png`,
    }
  },
]
// const themes = await fetch(`${baseUrl}/themes.json`).then((res) => res.json());

export default async function* () {
  for (const theme of themes) {
    yield {
      url: `/theme/${theme.id}/`,
      title: theme.name,
      ...theme,
    };
  }
}
