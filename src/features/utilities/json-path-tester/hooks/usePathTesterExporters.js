/**
 * custom hook to manage file export and clipboard operations for path tester.
 * acts as a bridge between the path tester store and the shared exporters logic.
 */

import { useApp } from "@/shared/hooks/useApp";
import { usePathTesterStore } from "@/store/path-tester.store";
import { useExporters } from "@/shared/hooks/useExporters";

export const usePathTesterExporters = () => {
  const { message } = useApp();

  const jsonInput = usePathTesterStore((state) => state.jsonInput);
  const outputJson = usePathTesterStore((state) => state.outputJson);

  const { handleDownload, handleCopy } = useExporters();

  // left pane, download json input
  const handleLeftDownloadJson = () => {
    handleDownload(jsonInput, "path-tester-input.json", "application/json");
  };

  // right pane, download json input
  const handleRightDownloadJson = () => {
    if (outputJson === "[]") {
      return message.warning("JSON output is empty!");
    }
    handleDownload(outputJson, "path-tester-output.json", "application/json");
  };

  // right pane, copy to clipboard
  const handleCopyOutput = () => {
    if (outputJson === "[]") {
      return message.warning("JSON output is empty!");
    }
    handleCopy(outputJson, "Result copied to clipboard!");
  };

  return { handleLeftDownloadJson, handleRightDownloadJson, handleCopyOutput };
};