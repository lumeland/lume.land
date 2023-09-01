import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import inline from "lume/plugins/inline.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import esbuild from "lume/plugins/esbuild.ts";
import imagick from "lume/plugins/imagick.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import sitemap from "lume/plugins/sitemap.ts";
import metas from "lume/plugins/metas.ts";
import vento from "lume/plugins/vento.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.1.0/toc/mod.ts";
import analyze, {
  mergeDefaults,
} from "https://deno.land/x/aldara@v0.1.1/mod.ts";

const markdown = {
  plugins: [toc],
  keepDefaultPlugins: true,
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
  .ignore("velociraptor.json")
  .ignore("scripts")
  .copy("static", ".")
  .copy("_redirects")
  .use(codeHighlight())
  .use(lightningcss())
  .use(inline())
  .use(metas())
  .use(vento())
  .use(esbuild({
    extensions: [".js"],
  }))
  .use(resolveUrls())
  .use(imagick({
    functions: {
      cropCenter(image, width: number, height: number) {
        image.crop(width, height, 5);
      },
    },
  }))
  .use(sitemap())
  .scopedUpdates(
    (path) => path.endsWith(".png") || path.endsWith(".jpg"),
  )
  .filter("slice", (arr, length) => arr.slice(0, length))
  .process([".html"], (page) => {
    const doc = page.document!;
    const blocks = doc.querySelectorAll("lume-code");

    blocks.forEach((block, i) => {
      const pres = (block as unknown as HTMLElement).querySelectorAll(
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
        button.setAttribute("aria-selected", j === 0 ? true : false);
        button.setAttribute("aria-controls", `panel-${i + 1}-${j + 1}`);
        button.setAttribute("id", `tab-${i + 1}-${j + 1}`);
        button.setAttribute("tabindex", j === 0 ? 0 : -1);
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
  })
  .use(minifyHTML());

site.script("plugin-docs", [
  "deno doc --json https://deno.land/x/lume/plugins/feed.ts",
]);
site.data("scheme", async (mod: string) => {
  const url = `https://deno.land/x/lume@v1.18.5/${mod}`;
  const { defaults } = await import(url);
  const { Options } = await analyze(url, { maxDepth: 2, private: false });

  mergeDefaults(Options, defaults);
  return Options.children;
});

export default site;
