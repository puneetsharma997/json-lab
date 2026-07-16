/**
 * custom hook to manage file export and clipboard operations for generators.
 * acts as a bridge between the generator store and the shared exporters logic.
 */

import { useGeneratorStore } from "@/store/generator.store";
import { useExporters } from "@/shared/hooks/useExporters";

export const useGeneratorExporters = () => {
  const jsonInput = useGeneratorStore((state) => state.jsonInput);
  const generatedOutput = useGeneratorStore((state) => state.generatedOutput);

  const { handleDownload, handleCopy } = useExporters();

  const handleDownloadJson = () => {
    handleDownload(jsonInput, "input-data.json", "application/json");
  };

  const handleCopyOutput = () => {
    handleCopy(generatedOutput, "Code copied to clipboard!");
  };

  return { handleDownloadJson, handleCopyOutput };
};