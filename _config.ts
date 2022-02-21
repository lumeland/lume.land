import lume from "lume/mod.ts";
import parcel_css from "lume/plugins/parcel_css.ts";

const site = lume();

site
  .ignore("README.md")
  .copy("styles/fonts")
  .use(parcel_css({
    options: {
      targets: {
        firefox: 97,
      }
    }
  }));

export default site;
