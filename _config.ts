import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import icons from "lume/plugins/icons.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
import inline from "lume/plugins/inline.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import esbuild from "lume/plugins/esbuild.ts";
import transformImages from "lume/plugins/transform_images.ts";
import favicon from "lume/plugins/favicon.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import postcss from "lume/plugins/postcss.ts";
import nesting from "npm:postcss-nesting";
import sitemap from "lume/plugins/sitemap.ts";
import metas from "lume/plugins/metas.ts";
import checkUrls from "lume/plugins/check_urls.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.6.0/toc/mod.ts";
import analyze, {
  mergeDefaults,
} from "https://deno.land/x/aldara@v0.2.1/mod.ts";
import { alert } from "npm:@mdit/plugin-alert@0.8.0";
import ventoLang from "https://deno.land/x/vento@v0.10.2/highlightjs-vento.js";

const markdown = {
  plugins: [toc, alert],
  options: {
    linkify: true,
  },
};

const site = lume(
  {
    location: new URL("https://lume.land"),
  },
  { markdown },
);

site
  .ignore("CONTRIBUTING.md")
  .ignore("README.md")
  .ignore("scripts")
  .copy("static", ".")
  .copy("_redirects")
  .use(codeHighlight({
    languages: {
      vento: ventoLang,
    },
  }))
  .use(postcss({
    plugins: [nesting()],
  }))
  .use(googleFonts({
    fonts:
      "https://fonts.google.com/share?selection.family=Epilogue:ital,wght@0,100..900;1,100..900|Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900|JetBrains+Mono:ital,wght@0,100..800;1,100..800",
    cssFile: "/styles/main.css",
  }))
  .use(favicon())
  .use(inline())
  .use(metas())
  .use(esbuild({
    extensions: [".js"],
  }))
  .use(resolveUrls())
  .use(transformImages())
  .use(sitemap())
  .use(icons())
  .use(checkUrls({
    external: true,
    ignore: [
      "/blog/",
    ],
  }))
  .scopedUpdates(
    (path) => path.endsWith(".png") || path.endsWith(".jpg"),
  )
  .filter("slice", (arr, length) => arr.slice(0, length))
  .process([".html"], (pages) => {
    for (const page of pages) {
      const doc = page.document!;
      const blocks = doc.querySelectorAll("lume-code");

      blocks.forEach((block, i) => {
        const pres = block.querySelectorAll(
          ":scope > pre",
        );

        const menu = doc.createElement("ul");
        menu.setAttribute("role", "tablist");
        menu.setAttribute("aria-label", "Code Tabs");
        menu.classList.add("lume-code-menu");

        pres.forEach((pre, j) => {
          const title = pre.querySelector("code")!.getAttribute("title")!;

          const li = doc.createElement("li");
          li.setAttribute("role", "presentation");

          const button = doc.createElement("button");
          button.setAttribute("role", "tab");
          button.setAttribute("aria-selected", j === 0 ? "true" : "false");
          button.setAttribute("aria-controls", `panel-${i + 1}-${j + 1}`);
          button.setAttribute("id", `tab-${i + 1}-${j + 1}`);
          button.setAttribute("tabindex", j === 0 ? "0" : "-1");
          button.innerText = title;
          button.classList.add("lume-code-tab");

          if (j > 0) {
            pre.setAttribute("hidden", "true");
          } else {
            button.classList.add("is-active");
          }

          pre.setAttribute("role", "tabpanel");
          pre.setAttribute("aria-labelledby", `tab-${i + 1}-${j + 1}`);
          pre.setAttribute("id", `panel-${i + 1}-${j + 1}`);
          pre.setAttribute("tabindex", "0");

          li.append(button);
          menu.appendChild(li);
        });

        (block as unknown as HTMLElement).prepend(menu as unknown as Node);
      });
    }
  })
  .use(minifyHTML({
    options: {
      minify_css: false, // https://github.com/wilsonzlin/minify-html/issues/173
    },
  }));

site.data("scheme", async (mod: string) => {
  try {
    const url = `https://deno.land/x/lume@v2.4.1/${mod}`;
    const { defaults } = await import(url);
    const { Options } = await analyze(url, { maxDepth: 2, private: false });

    mergeDefaults(Options, defaults);
    return Options.children;
  } catch (error) {
    console.log(`Error generating the documentation for ${mod}`);
    console.log(error);
    return [];
  }
});

export default site;
