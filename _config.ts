import lume from "@lumeland/lume";
import codeHighlight from "@lumeland/plugin-code-highlight";
import icons from "@lumeland/plugin-icons";
import googleFonts from "@lumeland/plugin-google-fonts";
import inline from "@lumeland/plugin-inline";
import resolveUrls from "@lumeland/plugin-resolve-urls";
import esbuild from "@lumeland/plugin-esbuild";
import transformImages from "@lumeland/plugin-transform-images";
import favicon from "@lumeland/plugin-favicon";
import minifyHTML from "@lumeland/plugin-minify-html";
import postcss from "@lumeland/plugin-postcss";
import nesting from "postcss-nesting";
import sitemap from "@lumeland/plugin-sitemap";
import metas from "@lumeland/plugin-metas";
import checkUrls from "@lumeland/plugin-check-urls";
import redirects from "@lumeland/plugin-redirects";
import ogImages from "@lumeland/plugin-og-images";
import nav from "@lumeland/plugin-nav";
import extractOrder from "@lumeland/plugin-extract-order";
import toc, { headerLink } from "@lumeland/plugin-toc";
import wellKnown from "@lumeland/plugin-well-known";
import plainText from "@lumeland/plugin-plaintext"
import { alert } from "@mdit/plugin-alert";

const markdown = {
  plugins: [alert],
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
  .use(redirects({
    output: "netlify",
  }))
  .add("img")
  .add("styles")
  .add("main.js")
  .use(toc({
    anchor: headerLink({
      class: "header-anchor",
    }),
  }))
  .use(codeHighlight())
  .use(esbuild({
    extensions: [".js"],
  }))
  .use(googleFonts({
    fonts:
      "https://fonts.google.com/share?selection.family=Epilogue:ital,wght@0,100..900;1,100..900|Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900|JetBrains+Mono:ital,wght@0,100..800;1,100..800",
    cssFile: "/styles/main.css",
  }))
  .use(postcss({
    plugins: [nesting()],
  }))
  .use(ogImages())
  .use(transformImages())
  .use(extractOrder())
  .use(metas())
  .use(nav())
  .use(icons())
  .use(resolveUrls())
  .use(plainText())
  .use(checkUrls({
    external: false,
    ignore: [
      "/blog/",
    ],
  }))
  .use(wellKnown({
    atProto: "did:plc:lqbfqodxim3n27heuou7do3g",
  }))
  .use(favicon())
  .use(inline())
  .use(sitemap())
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

export default site;

declare global {
  namespace Lume {
    export interface GlobalData {
      title: string;
      description: string;
    }
  }
}
