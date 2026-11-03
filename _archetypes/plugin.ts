import type { Archetype } from "@lumeland/core/archetypes.ts";

export default (function (name?: string) {
  if (!name) {
    console.error("Missing 'name' argument");
    return;
  }

  return {
    path: `plugins/${name}.md`,
    content: {
      title: name,
      description: "",
      category: "",
      content: `
## Description

## Installation

Import this plugin in your \`_config.ts\` file to use it:

\`\`\`js
import lume from "@lumeland/lume";
import ${name} from "@lumeland/plugin-${name}";

const site = lume();

site.use(${name}(/* Options */));

export default site;
\`\`\`
`,
    },
  };
}) satisfies Archetype;
