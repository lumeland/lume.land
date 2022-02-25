export default class LumeFilter extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form");
    const items = this.querySelectorAll(":scope > ul > li");

    const init = new URLSearchParams(window.location.search);

    for (const key of init.keys()) {
      const input = form[key];

      if (input) {
        input.checked = true;
      }
    }

    form.addEventListener("submit", (event) => {
      onChange();
      event.preventDefault();
    });
    form.addEventListener("input", onChange);

    onChange();

    function onChange() {
      form.querySelectorAll("input[type='checkbox']").forEach((input) => {
        const btn = input.closest(".button");

        if (btn) {
          btn.classList.toggle("is-active", input.checked);
        }
      });

      const data = new FormData(form);
      filter(data);
      const permalink = new URLSearchParams(data);
      history.pushState({}, null, `?${permalink}`);
    }

    function filter(data) {
      const tags = [];

      for (const name of data.keys()) {
        tags.push(name);
      }

      if (!tags.length) {
        return items.forEach((item) => item.hidden = false);
      }

      items.forEach((item) =>
        item.hidden = tags.every((tag) =>
          !item.dataset.tags.split(" ").includes(tag)
        )
      );
    }
  }
}
