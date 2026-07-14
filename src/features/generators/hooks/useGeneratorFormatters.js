/**
 * custom hook to handle json formatting operations for the generator input pane.
 */

import { formatJson } from "@/shared/utils/json/format-json";
import stringify from "json-stringify-pretty-compact";
import { useGeneratorStore } from "@/store/generator.store";
import { useApp } from "@/shared/hooks/useApp";

export const useGeneratorFormatters = () => {
  const { message } = useApp();
  const jsonInput = useGeneratorStore((state) => state.jsonInput);
  const setJsonInput = useGeneratorStore((state) => state.setJsonInput);

  const emptyJsonMsg = "JSON is empty."

  const handleFormat = () => {
    const result = formatJson(jsonInput);
    if (!result.success) {
      return message.error(result.error);
    }
    setJsonInput(result.formattedJson);
  };

  const handleSmartFormat = () => {
    try {
      if (!jsonInput.trim()) {
        return message.error(emptyJsonMsg);
      }
      const parsedJson = JSON.parse(jsonInput);
      const smartFormatted = stringify(parsedJson, { maxLength: 80, indent: 2 });
      setJsonInput(smartFormatted);
    }
    catch (error) {
      message.error("Cannot smart format invalid JSON.");
    }
  };

  const handleMinify = () => {
    try {
      if (!jsonInput.trim()) {
        return message.error(emptyJsonMsg);
      }
      const parsedJson = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsedJson));
    }
    catch (error) {
      message.error("Cannot minify invalid JSON.");
    }
  };

  return { handleFormat, handleSmartFormat, handleMinify };
};