export default class MenuSelector extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open", slotAssignment: "manual" });
    this.shadowRoot.innerHTML = `
      <style>
        .menu {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .menu,
        .menu-main,
        .menu-selector {
          display: flex;
          white-space: nowrap;
        }
        .menu-main {
          min-width: 0;
          flex: 1 1 auto;
        }
        .menu-selector {
          flex-direction: column;
          align-self: center;
        }
        .menu-selector-button {
          background: none;
          border: none;
          padding: 0;
          color: inherit;
          width: 2em;
          height: 2em;
        }
        .menu-selector-button svg {
          display: block;
          fill: currentColor;
          width: 100%;
          height: 100%;
        }
        .menu-selector-list:not([hidden]) {
          position: absolute;
          display: flex;
          flex-direction: column;
        }
      </style>
      <div class="menu" part="menu">
        <div class="menu-main" part="links">
          <slot name="main"></slot>
        </div>
        <div class="menu-selector" part="dropdown">
          <button aria-label="More options" aria-controls="options-list" class="menu-selector-button" type="button" part="dropdown-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path></svg>
          </button>
          <div id="options-list" class="menu-selector-list" hidden part="dropdown-links">
            <slot name="selector"></slot>
          </div>
        </div>
      </div>
    `;
    const main = this.shadowRoot.querySelector('slot[name="main"]');
    main.assign(...this.children);

    this.links = [];
    let left = 0;

    for (const element of this.children) {
      const width = element.clientWidth;
      this.links.push({
        element,
        width,
        left,
      });

      left += width;
    }

    const button = this.shadowRoot.querySelector(".menu-selector-button");
    const list = this.shadowRoot.querySelector(".menu-selector-list");

    button.addEventListener("click", () => {
      const expanded = button.ariaExpanded === "true" ? "false" : "true";
      button.ariaExpanded = expanded;
      list.hidden = expanded === "false";
    });

    this.update();

    // Detect horizontal scroll in menu
    if (typeof ResizeObserver === "function") {
      const observer = new ResizeObserver((entries) => {
        if (entries.length) {
          this.update();
        }
      });

      observer.observe(this.shadowRoot.querySelector(".menu"));
    }
  }

  update() {
    const main = this.shadowRoot.querySelector('slot[name="main"]');
    const secondary = this.shadowRoot.querySelector('slot[name="selector"]');
    const menuMain = this.shadowRoot.querySelector(".menu-main");
    const menuSelector = this.shadowRoot.querySelector(".menu-selector");
    const availableWidth = menuMain.clientWidth;
    const mainLinks = [];
    const secondaryLinks = [];

    for (const link of this.links) {
      if (link.left + link.width <= availableWidth) {
        mainLinks.push(link.element);
        link.element.classList.remove("is-dropdown-link");
      } else {
        secondaryLinks.push(link.element);
        link.element.classList.add("is-dropdown-link");
      }
    }

    main.assign(...mainLinks);

    if (secondaryLinks.length) {
      menuSelector.style.display = null;
      secondary.assign(...secondaryLinks);
    } else {
      menuSelector.style.display = "none";
    }
  }
}
