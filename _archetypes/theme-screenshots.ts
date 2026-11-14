import { parse } from "deno-std/yaml/mod.ts";
import { readFileSync } from "node:fs";
import { chromium } from 'playwright';
import type { Archetype } from "@lumeland/core/archetypes.ts";

interface Theme {
  id: string,
  demo?: string,
}

export default (async function* () {
  const themes = parse(readFileSync("themes/_data.yml", "utf-8")) as any;
  const browser = await chromium.launch();
  
  for (const { id, demo } of themes.themes as Theme[]) {
    if (!demo) {
      continue;
    }

    const page = await browser.newPage();
    const darkPage = await browser.newPage();
    darkPage.emulateMedia({ colorScheme: "dark" });
    await page.goto(demo);
    await darkPage.goto(demo);

    for (const size of ["desktop", "mobile"]) {
      page.setViewportSize({
        width: size === "desktop" ? 1200 : 400,
        height: 800,
      })

      yield {
        overwrite: true,
        path: `img/screenshots/${id}/${size}-light.png`,
        content: await page.screenshot(),
      }

      darkPage.setViewportSize({
        width: size === "desktop" ? 1200 : 400,
        height: 800,
      })

      yield {
        overwrite: true,
        path: `img/screenshots/${id}/${size}-dark.png`,
        content: await darkPage.screenshot(),
      }
    }
  }
  
  await browser.close();
}) satisfies Archetype;
