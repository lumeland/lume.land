import { parse } from "deno-std/yaml/mod.ts";
import { readFileSync } from "node:fs";
import type { Archetype } from "@lumeland/core/archetypes.ts";
import { chromium } from 'playwright';

interface Demo {
  id: string,
  demo?: string,
}

export default (async function* () {
  const themes = parse(readFileSync("themes/_data.yml", "utf-8")) as any;
  const browser = await chromium.launch();
  
  for (const { id, demo } of themes.themes as Demo[]) {
    if (!demo) {
      continue;
    }

    const page = await browser.newPage();
    await page.goto(demo);
    page.emulateMedia({ colorScheme: "dark" });
    page.setViewportSize({
      width: 380,
      height: 900,
    })

    yield {
      path: `img/screenshots/${id}/mobile-dark.png`,
      content: await page.screenshot(),
    }
  }
  
  await browser.close();
}) satisfies Archetype;
