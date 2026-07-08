export default class LumeShuffle extends HTMLElement {
  connectedCallback() {
    const target = document.querySelector(this.getAttribute("target"));
    if (!target) return;

    const items = [...target.children];
    const keepFirst = parseInt(this.getAttribute("keep-first")) || 0;
    const keepLast = parseInt(this.getAttribute("keep-last")) || 0;

    const first = items.slice(0, keepFirst);
    const last = keepLast ? items.slice(-keepLast) : [];
    const middle = items.slice(keepFirst, keepLast ? -keepLast : items.length);

    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }

    target.append(...first, ...middle, ...last);
  }
}
