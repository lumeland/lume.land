import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import inline from "lume/plugins/inline.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import esbuild from "lume/plugins/esbuild.ts";
import imagick from "lume/plugins/imagick.ts";
import cacheBusting from "lume/middlewares/cache_busting.ts";
import anchor from "https://jspm.dev/markdown-it-anchor@8.0.0";
import toc from "https://jspm.dev/markdown-it-toc-done-right@4.2.0";

const markdown = {
  plugins: [
    // @ts-ignore: no anchor typings
    [anchor, { permalink: anchor.permalink.headerLink() }],
    [toc, { containerClass: "toc", level: 2 }],
  ],
  keepDefaultPlugins: true,
};

const site = lume(
  {
    location: new URL("https://lume.land"),
    server: {
      middlewares: [cacheBusting({})],
    },
  },
  { markdown },
);

site
  .ignore("README.md")
  .ignore("scripts")
  .copy("static", ".")
  .data("cache_busting", `v${Date.now()}`)
  .use(codeHighlight())
  .use(inline())
  .use(postcss())
  .use(esbuild({
    extensions: [".js"],
  }))
  .use(resolveUrls())
  .use(imagick())
  .scopedUpdates(
    (path) => path.endsWith(".css"),
    (path) => path.endsWith(".png") || path.endsWith(".jpg"),
  )
  .filter("slice", (arr, length) => arr.slice(0, length))
  .process([".html"], (page) => {
    const doc = page.document!;
    const toc = doc.querySelector(".toc");
    const header = doc.querySelector(".doc-header");

    if (toc && header) {
      header.appendChild(toc);
    }
  });

export default site;
