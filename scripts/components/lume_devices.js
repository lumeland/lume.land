export default class LumeDevices extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form");
    const screens = this.querySelectorAll(".device");
    const init = new URLSearchParams(window.location.search);

    for (const [key, value] of init.entries()) {
      const input = form[key];

      if (input) {
        input.value = value;
      }
    }

    form.addEventListener("submit", (event) => {
      onChange();
      event.preventDefault();
    });
    form.addEventListener("input", onChange);

    onChange();

    function onChange() {
      const data = new FormData(form);
      const device = data.get("device");
      const theme = data.get("theme");

      screens.forEach((el) => {
        el.hidden = el.dataset.device !== device || el.dataset.theme !== theme;
      });
    }
  }
}
