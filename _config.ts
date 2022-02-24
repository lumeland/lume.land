import lume from "lume/mod.ts";
import parcelCSS from "lume/plugins/parcel_css.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import inline from "lume/plugins/inline.ts";

const site = lume();

site
  .ignore("README.md")
  .copy("styles/fonts")
  .copy("scripts")
  .copy("img")
  .use(codeHighlight())
  .use(inline())
  .use(parcelCSS());

export default site;
