import LumeCode from "./scripts/components/lume_code.js";
import LumeCarousel from "./scripts/vendor/carousel/carousel.js";
import LumeCarouselControls from "./scripts/components/lume_carousel_controls.js";
import LumeFilter from "./scripts/components/lume_filter.js";

customElements.define("lume-code", LumeCode);
customElements.define("lume-carousel", LumeCarousel);
customElements.define("lume-carousel-controls", LumeCarouselControls);
customElements.define("lume-filter", LumeFilter);

document.querySelector("#switch-theme")?.addEventListener("click", () => {
  document.documentElement.classList.toggle("is-reverse");
  localStorage.setItem("theme", document.documentElement.className);
});
