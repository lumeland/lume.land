export default class LumeShield extends HTMLElement {
  async connectedCallback() {
    const data = await getData(this.dataset.name);

    if (data) {
      const name = this.dataset.visibleName || data.name;
      this.innerHTML = `${name}<span>${data.version}</span>`;
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
