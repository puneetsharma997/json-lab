/**
 * global configuration object mapping url parameters to their respective react components.
 * utilizes dynamic inline rendering to pass specific tool types (yaml, xml, csv)
 * to shared shell components, promoting high code reusability.
 */

import ConverterPage from "@/features/converters/ConverterPage";
import GeneratorPage from "@/features/generators/GeneratorPage";
import JsonEditorPage from "@/features/json-editor/JsonEditorPage";
import ComingSoon from "../ui/ComingSoon/ComingSoon";

export const toolPagesMapping = {
  // editor
  "json-editor": JsonEditorPage,

  // converters
  "yaml-converter": () => <ConverterPage type="yaml" />,
  "xml-converter": () => <ConverterPage type="xml" />,
  "csv-converter": () => <ConverterPage type="csv" />,

  // generators
  "typescript-generator": () => <GeneratorPage type="ts" />,
  "zod-generator": () => <GeneratorPage type="zod" />,
  "json-schema-generator": () => <GeneratorPage type="schema" />,

  // utilities
  "json-path-tester": () => <ComingSoon />,
  "mock-data-generator": () => <ComingSoon />,
  "json-visualizer": () => <ComingSoon />,
};