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
import ogImages from "lume/plugins/og_images.ts";
import nav from "lume/plugins/nav.ts";
import { env } from "lume/core/utils/env.ts";
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
  .add("static", ".")
  .add("_redirects")
  .add("img")
  .add("styles")
  .add("main.js")
  .use(nav())
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
  .use(ogImages())
  .use(metas())
  .use(esbuild({
    extensions: [".js"],
  }))
  .use(resolveUrls())
  .use(transformImages())
  .use(sitemap())
  .use(icons())
  .use(inline())
  .use(checkUrls({
    external: false,
    ignore: [
      "/blog/",
    ],
  }))
  .scopedUpdates(
    (path) => path.endsWith(".png") || path.endsWith(".jpg"),
  )
  .filter("slice", (arr, length) => arr.slice(0, length))
  .use(minifyHTML({
    options: {
      minify_css: false, // https://github.com/wilsonzlin/minify-html/issues/173
    },
  }))
  .remoteFile(
    "scripts/components/lume_menu.js",
    "https://cdn.jsdelivr.net/npm/@oom/horizontal-menu@0.1.0/src/menu.js",
  )
  .remoteFile(
    "static/docsearch/index.js",
    "https://cdn.jsdelivr.net/npm/@docsearch/js@3.8.2/dist/umd/index.js",
  )
  .remoteFile(
    "static/docsearch/style.css",
    "https://cdn.jsdelivr.net/npm/@docsearch/css@3.8.2/dist/style.css",
  )
  .remoteFile(
    "img/contrib.svg",
    "https://contrib.rocks/image?repo=lumeland/lume",
  );

site.data("scheme", async (mod: string) => {
  if (env("LUME_LIVE_RELOAD")) {
    return [];
  }

  try {
    const url = import.meta.resolve(`lume/${mod}`);
    const imported = await import(url);
    const { Options } = await analyze(url, { maxDepth: 2, private: false });

    mergeDefaults(Options, imported.defaults ?? {});
    return Options.children;
  } catch (error) {
    console.log(`Error generating the documentation for ${mod}`);
    console.log(error);
    return [];
  }
});

export default site;
