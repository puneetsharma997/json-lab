/**
 * core logic engine for the code generators.
 * handles the one-way transformation from raw json string to typescript, zod, or json schema.
 * gracefully catches invalid json errors during typing.
 */

import { useGeneratorStore } from "@/store/generator.store";
import JsonToTS from "json-to-ts";
import toJsonSchema from "to-json-schema";
import jsonSchemaToZod from "json-schema-to-zod";
import { useEffect } from "react";
import { formatZodSchema } from "../utils/format-zod-schema";

export const useGeneratorLogic = (type) => {
  const setJsonInput = useGeneratorStore((state) => state.setJsonInput);
  const setGeneratedOutput = useGeneratorStore((state) => state.setGeneratedOutput);
  const setInputError = useGeneratorStore((state) => state.setInputError);
  const autoGenerate = useGeneratorStore((state) => state.autoGenerate);
  const jsonInput = useGeneratorStore((state) => state.jsonInput);
  const generatedOutput = useGeneratorStore((state) => state.generatedOutput);
  const lastUsedType = useGeneratorStore((state) => state.lastUsedType);

  const setActiveTool = useGeneratorStore((state) => state.setActiveTool);

  // standalone function to generate code based on the active tool type
  const generateOutputCode = (rawValue) => {
    if (!rawValue.trim()) {
      setGeneratedOutput("");
      setInputError(null);
      return;
    }

    try {
      // parse the json so that its valid
      const parsedJson = JSON.parse(rawValue);
      let finalOutput = "";

      // generate typescript interface
      if (type === "ts") {
        // JsonToTS returns an array of interfaces, we join them with double newlines
        const tsInterfaces = JsonToTS(parsedJson, { rootName: "RootObject" });
        finalOutput = tsInterfaces.join("\n\n");
      }

      // generate json schema (Draft-07 Format)
      else if (type === "schema") {
        const schema = toJsonSchema(parsedJson);
        finalOutput = JSON.stringify(schema, null, 2);
      }

      // generate zod validation schema
      else if (type === "zod") {
        // first convert json -> json schema -> zod
        const schema = toJsonSchema(parsedJson);
        const rawZod = jsonSchemaToZod(schema, { name: "rootSchema" });
        finalOutput = formatZodSchema(rawZod);
      }

      // update the store
      setGeneratedOutput(finalOutput);
      setInputError(null);
    }
    catch (error) {
      setInputError(error.message || "Invalid JSON syntax");
    }
  };

  // handle route changes and tool switching
  useEffect(() => {
    setActiveTool(type);
  }, [type, setActiveTool]);

  // handle page refresh and state hydration
  useEffect(() => {
    // if we have input and auto generated is ON
    // regenerate the output automatically!
    if (jsonInput && autoGenerate) {
      if (!generatedOutput || lastUsedType !== type) {
        generateOutputCode(jsonInput);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonInput, generatedOutput, autoGenerate, type]);

  // triggers every time user types in the left json editor
  const handleJsonChange = (value) => {
    setJsonInput(value);
    if (autoGenerate) generateOutputCode(value);
  };

  // triggered manually via the 'Generate' button when auto-sync is OFF
  const triggerManualGenerate = () => {
    generateOutputCode(jsonInput);
  };

  return {
    handleJsonChange,
    triggerManualGenerate,
  };
};