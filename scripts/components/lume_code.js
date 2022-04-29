export default class LumeCode extends HTMLElement {
  connectedCallback() {
    const blocks = this.querySelectorAll(":scope > pre");
    const menu = document.createElement("ul");
    menu.classList.add("lume-code-menu");

    for (const block of blocks) {
      const title = block.querySelector("code").title;
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = title;
      button.classList.add("lume-code-tab");
      button.addEventListener("click", () => {
        blocks.forEach((el) => el.hidden = el !== block);
        this.querySelectorAll("button.is-active").forEach((el) =>
          el.classList.remove("is-active")
        );
        button.classList.add("is-active");
      });
      li.append(button);
      menu.append(li);
    }
    this.prepend(menu);

    this.querySelector("button").click();
  }
}
