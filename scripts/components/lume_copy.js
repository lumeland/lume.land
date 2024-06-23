export default class LumeCopy extends HTMLElement {
  connectedCallback() {
    const button = this.querySelector("button");
    const text = button.dataset.text;

    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(text);
      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.textContent = "Copied!";
      button.appendChild(tooltip);

      setTimeout(() => {
        tooltip.remove();
      }, 2000);
    });
  }
}
