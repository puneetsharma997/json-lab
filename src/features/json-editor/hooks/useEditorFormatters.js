/**
 * custom hook to handle code formatting operations for the json editor.
 * bridges the editor store (with pane selection) to the shared formatters logic.
 */

import { useEditorStore } from "@/store/editor.store";
import { useFormatters } from "@/shared/hooks/useFormatters";

export const useEditorFormatters = (pane, editorValue) => {
  const setEditorValue = useEditorStore((state) => state.setEditorValue);

  const { format, smartFormat, minify } = useFormatters();

  // On success function
  const handleSuccess = (formattedValue) => {
    setEditorValue(formattedValue, pane);
  };

  const handleFormat = () => {
    format(editorValue, handleSuccess);
  }

  const handleSmartFormat = () => {
    smartFormat(editorValue, handleSuccess);
  }

  const handleMinify = () => {
    minify(editorValue, handleSuccess);
  }

  return { handleFormat, handleSmartFormat, handleMinify };
};