import type {
  ClassPropertyDef,
  DocNode,
  DocNodeClass,
  DocNodeEnum,
  DocNodeImport,
  DocNodeInterface,
  DocNodeTypeAlias,
  InterfacePropertyDef,
  JsDoc,
  LiteralPropertyDef,
  TsTypeArrayDef,
  TsTypeDef,
  TsTypeDefLiteral,
  TsTypeFnOrConstructorDef,
  TsTypeKeywordDef,
  TsTypeParenthesizedDef,
  TsTypeTypeLiteralDef,
  TsTypeTypeRefDef,
  TsTypeUnionDef,
} from "https://deno.land/x/deno_doc@0.64.0/types.d.ts";

type Type =
  | "any"
  | "object"
  | "record"
  | "array"
  | "string"
  | "union"
  | "boolean"
  | "function"
  | "number"
  | "undefined"
  | "null"
  | "enum";

interface TypeDef {
  type: Type;
  typeName?: string;
  children?: NodeType | NodeType[] | Record<string, NodeType>;
}
interface TypeProps {
  required?: boolean;
  [key: string]: unknown;
}
export interface NodeType extends TypeDef, TypeProps {}

interface Options {
  // deno-lint-ignore no-explicit-any
  defaults?: any;
  private?: boolean;
  maxDepth?: number;
}

interface Status extends Options {
  url: string;
  depth: number;
  cache: Map<string, DocNode[]>;
}

export default async function analyze(url: string, options: Options = {}) {
  const status = {
    url,
    depth: 0,
    cache: new Map(),
    ...options,
  };
  const nodes = await doc(url, status);
  const schema: Record<string, NodeType> = {};

  for (const node of nodes) {
    // Only exported interfaces
    if (node.declarationKind === "export" && node.kind === "interface") {
      const { name } = node;

      schema[name] = await typeInterface(node, status);
    }
  }

  return schema;
}

const decoder = new TextDecoder();

export async function doc(
  url: string,
  status: Status,
): Promise<DocNode[]> {
  if (status.cache.has(url)) {
    return status.cache.get(url)!;
  }
  const args = ["doc", "--json"];
  if (status.private) {
    args.push("--private");
  }
  args.push(url);
  const command = new Deno.Command(Deno.execPath(), {
    args,
    stdout: "piped",
  });

  const { stdout, stderr } = await command.output();

  if (stderr.length) {
    const error = decoder.decode(stderr);
    throw new Error(error);
  }

  const json = decoder.decode(stdout);
  console.log(url);
  status.cache.set(url, JSON.parse(json));
  return status.cache.get(url)!;
}

async function typeAll(
  node: DocNode | TsTypeDef,
  status: Status,
): Promise<NodeType> {
  // @ts-ignore: jsDoc does not exist on TsTypeDef
  const doc = node.jsDoc as JsDoc | undefined;
  const props = jsDoc(doc);

  switch (node.kind) {
    case "interface":
      return { ...await typeInterface(node, status), ...props };
    case "class":
      return { ...await typeClass(node, status), ...props };
    case "typeRef":
      return { ...await typeRef(node, status), ...props };
    case "import":
      return { ...await typeImport(node, status), ...props };
    case "typeAlias":
      return { ...await typeAlias(node, status), ...props };
    case "union":
      return { ...await typeUnion(node, status), ...props };
    case "array":
      return { ...await typeArray(node, status), ...props };
    case "literal":
      return { ...typeLiteral(node, status), ...props };
    case "typeLiteral":
      return { ...await typeLiteralObject(node, status), ...props };
    case "keyword":
      return { ...typeKeyword(node, status), ...props };
    case "fnOrConstructor":
      return { ...typefnOrConstructor(node, status), ...props };
    case "parenthesized":
      return { ...typeParenthesized(node, status), ...props };
    case "enum":
      return { ...await typeEnum(node, status), ...props };
    default:
      console.log(node);
      throw new Error(`Unhandled node kind "${node.kind}"`);
  }
}

async function children(
  properties: (InterfacePropertyDef | LiteralPropertyDef | ClassPropertyDef)[],
  status: Status,
): Promise<Record<string, NodeType> | undefined> {
  if (status.depth >= status.maxDepth!) {
    return;
  }

  status.depth++;
  const children: Record<string, NodeType> = {};

  for (const property of properties) {
    const { name, tsType } = property;

    if (!tsType) {
      continue;
    }

    // @ts-ignore: jsDoc does not exist on InterfacePropertyDef
    const props = jsDoc(property.jsDoc as JsDoc | undefined);
    children[name] = { ...await typeAll(tsType, status), ...props };
  }
  status.depth--;
  return children;
}

async function typeInterface(
  node: DocNodeInterface,
  status: Status,
): Promise<NodeType> {
  return {
    type: "object",
    children: await children(node.interfaceDef.properties, status),
    typeName: node.name,
  };
}

async function typeClass(
  node: DocNodeClass,
  status: Status,
): Promise<NodeType> {
  return {
    type: "object",
    children: await children(node.classDef.properties, status),
    typeName: node.name,
  };
}

async function typeLiteralObject(
  node: TsTypeTypeLiteralDef,
  status: Status,
): Promise<NodeType> {
  return {
    type: "object",
    children: await children(node.typeLiteral.properties, status),
  };
}

async function typeParenthesized(
  node: TsTypeParenthesizedDef,
  status: Status,
): Promise<NodeType> {
  return await typeAll(node.parenthesized, status);
}

async function typeRef(
  node: TsTypeTypeRefDef,
  status: Status,
): Promise<NodeType> {
  // Partial is a special case
  const { typeName } = node.typeRef;
  switch (typeName) {
    case "Partial": {
      const type = node.typeRef.typeParams?.[0];

      if (!type) {
        throw new Error(`Partial type "${typeName}" not found`);
      }

      return await typeAll(type, status);
    }
    case "Record": {
      const [key, value] = node.typeRef.typeParams ?? [];

      if (!value) {
        throw new Error(`Record type "${value}" not found`);
      }

      return {
        type: "record",
        children: {
          key: await typeAll(key, status),
          value: await typeAll(value, status),
        },
      };
    }
  }

  // Find the type reference
  const nodes = status.cache.get(status.url)!;
  const type = nodes.find((t) => t.name === node.typeRef.typeName);

  if (type) {
    return await typeAll(type, status);
  }

  return {
    type: "object",
    typeName,
  };
}

async function typeImport(
  node: DocNodeImport,
  status: Status,
): Promise<NodeType> {
  const previousUrl = status.url;
  status.url = node.importDef.src;
  const nodes = await doc(node.importDef.src, status);
  const type = nodes.find((t) => t.name === node.importDef.imported);

  if (type) {
    const types = await typeAll(type, status);
    status.url = previousUrl;
    return types;
  }

  return {
    type: "object",
    typeName: node.importDef.imported,
  };

  console.log(node);
  throw new Error(`Type "${node.importDef.imported}" not found`);
}

async function typeAlias(
  node: DocNodeTypeAlias,
  status: Status,
): Promise<NodeType> {
  return await typeAll(node.typeAliasDef.tsType, status);
}

async function typeUnion(
  node: TsTypeUnionDef,
  status: Status,
): Promise<NodeType> {
  return {
    type: "union",
    children: await Promise.all(node.union.map((t) => typeAll(t, status))),
  };
}

async function typeArray(
  node: TsTypeArrayDef,
  status: Status,
): Promise<NodeType> {
  return {
    type: "array",
    children: await typeAll(node.array, status),
  };
}

function typeLiteral(node: TsTypeDefLiteral, _status: Status): NodeType {
  switch (node.literal.kind) {
    case "string":
      return {
        type: node.literal.kind,
        value: node.literal.string,
      };
    case "boolean":
      return {
        type: node.literal.kind,
      };
    default:
      console.log(node);
      throw new Error(`Unhandled literal kind "${node.literal.kind}"`);
  }
}

function typeKeyword(node: TsTypeKeywordDef, _status: Status): NodeType {
  switch (node.keyword) {
    case "string":
    case "boolean":
    case "number":
    case "any":
    case "undefined":
    case "null":
      return {
        type: node.keyword,
      };
    case "unknown":
      return {
        type: "any",
      };
    default:
      console.log(node);
      throw new Error(`Unhandled keyword kind "${node.keyword}"`);
  }
}

function typefnOrConstructor(
  node: TsTypeFnOrConstructorDef,
  _status: Status,
): NodeType {
  if (node.fnOrConstructor.constructor === false) {
    return {
      type: "function",
    };
  }

  console.log(node);
  throw new Error(
    `Unhandled fnOrConstructor kind "${node.fnOrConstructor.constructor}"`,
  );
}

async function typeEnum(
  node: DocNodeEnum,
  status: Status,
): Promise<NodeType> {
  const children = {} as Record<string, NodeType>;

  for (const member of node.enumDef.members) {
    const { name, init } = member;

    if (!init) {
      throw new Error(`Enum "${node.name}" member "${name}" has no init`);
    }

    children[name] = await typeAll(init, status);
  }

  return {
    type: "enum",
    children,
  };
}

function jsDoc(jsDoc?: JsDoc): TypeProps {
  const doc: TypeProps = {};

  if (jsDoc) {
    const { doc: description, tags } = jsDoc;

    if (description) {
      doc.description = description;
    }

    if (tags) {
      for (const tag of tags) {
        const { kind } = tag;
        if (kind === "unsupported") {
          const match = tag.value.match(/@(\w+)(?:\s+(.+))?/);

          if (!match) {
            continue;
          }

          const [, key, value] = match;
          doc[key] = value ? cast(value) : true;
          continue;
        }

        // @ts-ignore: value does not exist on JsDocTag
        doc[kind] = tag.value ?? true;
      }
    }

    return doc;
  }

  return doc;
}

function cast(str: string) {
  switch (str.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
  }
  if (/^\d+$/.test(str)) {
    return Number(str);
  }

  // Unquote string
  if (
    (str.startsWith('"') && str.endsWith('"')) ||
    (str.startsWith("'") && str.endsWith("'"))
  ) {
    return str.slice(1, -1);
  }
  return str;
}
