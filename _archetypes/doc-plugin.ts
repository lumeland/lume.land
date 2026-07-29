import { log } from "lume/core/utils/log.ts";

export default (function (name?: string) {
  name ??= prompt("Name:") ?? undefined;

  if (!name) {
    log.error("Missing arguments. Run 'deno task new plugin {name}");
    return;
  }

  return {
    path: `plugins/${name}.md`,
    content: {
      title: name,
      description: "",
      mod: `plugins/${name}.ts`,
      tags: [],
      content: `
## Description

## Installation

Import this plugin in your \`_config.ts\` file to use it:

\`\`\`js
import lume from "lume/mod.ts";
import ${name} from "lume/plugins/${name}.ts";

const site = lume();

site.use(${name}(/* Options */));

export default site;
\`\`\`
`,
    },
  };
}) satisfies Lume.Archetype;
