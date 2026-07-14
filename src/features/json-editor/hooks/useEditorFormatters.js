/**
 * custom hook to handle code formatting operations for the json editor.
 * it encapsulates the logic for standard formatting, smart compact formatting,
 * and code minification, directly updating the global editor store upon success.
 */

import { formatJson } from "@/shared/utils/json/format-json";
import stringify from "json-stringify-pretty-compact";
import { useEditorStore } from "@/store/editor.store";
import { useApp } from "@/shared/hooks/useApp";

export const useEditorFormatters = (pane, editorValue) => {
  const { message } = useApp();
  const setEditorValue = useEditorStore((state) => state.setEditorValue);

  // format valid json text with standard indentation
  const handleFormat = () => {
    const result = formatJson(editorValue);
    if (!result.success) {
      message.error("Cannot format invalid JSON.");
      return;
    }
    setEditorValue(result.formattedJson, pane);
  };

  // format json optimally keeping short arrays and objects on a single line
  const handleSmartFormat = () => {
    try {
      const parsedJson = JSON.parse(editorValue);
      const smartFormatted = stringify(parsedJson, { maxLength: 80, indent: 2 });
      setEditorValue(smartFormatted, pane);
    }
    catch (error) {
      message.error("Cannot smart format invalid JSON.");
    }
  };

  // minify valid json text to a single continuous string
  const handleMinify = () => {
    try {
      const parsedJson = JSON.parse(editorValue);
      setEditorValue(JSON.stringify(parsedJson), pane);
    }
    catch (error) {
      message.error("Cannot minify invalid JSON.");
    }
  };

  return { handleFormat, handleSmartFormat, handleMinify };
};