export default class LumeShield extends HTMLElement {
  async connectedCallback() {
    const data = await getData(this.dataset.name);

    if (data) {
      const name = this.dataset.visibleName || data.name;
      this.innerHTML = `
      <a href="${data.url}">
        ${name}<span>${data.version.replace(/^v/, "")}</span>
      </a>`;
    }
  }
}

async function getData(name) {
  const url = `https://nudd.deno.dev/${name}`;
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
}
