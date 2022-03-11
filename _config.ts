import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import inline from "lume/plugins/inline.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import esbuild from "lume/plugins/esbuild.ts";
import anchor from "https://jspm.dev/markdown-it-anchor@8.0.0";
import toc from "https://jspm.dev/markdown-it-toc-done-right@4.2.0";
import imagick from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/imagick/imagick.ts";

const markdown = {
  plugins: [
    // @ts-ignore: no anchor typings
    [anchor, { permalink: anchor.permalink.headerLink() }],
    [toc, { containerClass: "toc", level: 2 }],
  ],
  keepDefaultPlugins: true,
};

const site = lume(
  { location: new URL("https://lume.land") },
  { markdown },
);

site
  .ignore("README.md")
  .ignore("scripts")
  .copy("static", ".")
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
