/**
 * custom hook to manage file export and clipboard operations for generators.
 */

import { downloadFile } from "@/shared/utils/file/download-file";
import { useGeneratorStore } from "@/store/generator.store";
import { useApp } from "@/shared/hooks/useApp";

export const useGeneratorExporters = (type) => {
  const { message } = useApp();
  const jsonInput = useGeneratorStore((state) => state.jsonInput);
  const generatedOutput = useGeneratorStore((state) => state.generatedOutput);

  // left pane, download json input
  const handleDownloadJson = () => {
    if (!jsonInput.trim()) {
      return message.warning("JSON editor is empty!");
    }
    downloadFile(jsonInput, "input-data.json", "application/json");
    message.success("Saved as input-data.json");
  };

  // right pane, copy to clipboard
  const handleCopyOutput = async () => {
    if (!generatedOutput.trim()) {
      return message.warning("Generated output is empty!");
    }
    await navigator.clipboard.writeText(generatedOutput);
    message.success("Code copied to clipboard!");
  };

  return { handleDownloadJson, handleCopyOutput };
};