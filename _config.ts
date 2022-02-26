import lume from "lume/mod.ts";
import parcelCSS from "lume/plugins/parcel_css.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import inline from "lume/plugins/inline.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
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
  { location: new URL("https://lume.land") },
  { markdown },
);

site
  .ignore("README.md")
  .copy("styles/fonts")
  .copy("scripts")
  .copy("img")
  .use(codeHighlight())
  .use(inline())
  .use(parcelCSS())
  .use(resolveUrls())
  .process([".html"], (page) => {
    const doc = page.document!;
    const toc = doc.querySelector(".toc");
    const header = doc.querySelector(".doc-header");

    if (toc && header) {
      header.appendChild(toc);
    }
  });

export default site;
