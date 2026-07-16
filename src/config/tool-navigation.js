import {
  Braces,
  Route,
  FileCode2,
  FileCheck,
  Shield,
  ArrowLeftRight,
  Database,
  FileType,
  Boxes,
  Sparkles,
} from "lucide-react";


export const toolNavigation = [
  {
    category: "Editor",
    items: [
      {
        id: "json-editor",
        title: "JSON Editor",
        description:
          "Edit, format, validate, compare and inspect JSON.",
        path: "/tools/json-editor",
        icon: Braces,
        keywords: [
          "json",
          "editor",
          "formatter",
          "validator",
          "compare",
          "tree",
        ],
      },
    ],
  },

  {
    category: "Generators",
    items: [
      {
        id: "typescript-generator",
        title: "TypeScript Generator",
        description: "Generate TypeScript interfaces from JSON.",
        path: "/tools/typescript-generator",
        icon: FileCode2,
        keywords: [
          "typescript",
          "interface",
          "ts",
        ],
      },

      {
        id: "zod-generator",
        title: "Zod Schema Generator",
        description: "Generate Zod schemas from JSON.",
        path: "/tools/zod-generator",
        icon: Shield,
        keywords: [
          "zod",
          "schema",
        ],
      },

      {
        id: "json-schema-generator",
        title: "JSON Schema Generator",
        description: "Generate JSON Schema from JSON.",
        path: "/tools/json-schema-generator",
        icon: FileCheck,
        keywords: [
          "json schema",
          "schema",
        ],
      },
    ],
  },

  {
    category: "Converters",
    items: [
      {
        id: "yaml-converter",
        title: "YAML ⇄ JSON",
        description: "Convert between YAML and JSON.",
        path: "/tools/yaml-converter",
        icon: ArrowLeftRight,
        keywords: [
          "yaml",
          "convert",
        ],
      },

      {
        id: "xml-converter",
        title: "XML ⇄ JSON",
        description: "Convert between XML and JSON.",
        path: "/tools/xml-converter",
        icon: FileType,
        keywords: [
          "xml",
          "convert",
        ],
      },

      {
        id: "csv-converter",
        title: "CSV ⇄ JSON",
        description: "Convert between CSV and JSON.",
        path: "/tools/csv-converter",
        icon: Database,
        keywords: [
          "csv",
          "convert",
        ],
      },
    ],
  },

  {
    category: "Utilities",
    items: [
      {
        id: "json-path-tester",
        title: "JSONPath Tester",
        description: "Query JSON using JSONPath expressions.",
        path: "/tools/json-path-tester",
        icon: Route,
        keywords: [
          "jsonpath",
          "query",
        ],
      },

      {
        id: "mock-data-generator",
        title: "Mock Data Generator",
        description: "Generate mock JSON from a schema.",
        path: "/tools/mock-data-generator",
        icon: Sparkles,
        keywords: [
          "mock",
          "fake",
          "generate",
        ],
        comingSoon: true,
      },

      {
        id: "json-visualizer",
        title: "JSON Visualizer",
        description: "Visualize JSON as an interactive graph.",
        path: "/tools/json-visualizer",
        icon: Boxes,
        keywords: [
          "graph",
          "visualize",
          "nodes",
        ],
        comingSoon: true,
      },
    ],
  },
];