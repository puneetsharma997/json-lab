/**
 * custom hook to manage file export operations.
 * it handles downloading the current editor content as a standard json file,
 * or converting the json arrays to csv strings for spreadsheet exports.
 */

import { convertJsonToCsvString } from "@/shared/utils/file/json-to-csv";
import { useApp } from "@/shared/hooks/useApp";
import { useExporters } from "@/shared/hooks/useExporters";

export const useFileExporters = (editorValue, docName) => {
  const { message } = useApp();

  const { handleDownload } = useExporters();

  // process and trigger a download for the json file
  const handleSaveToDisk = () => {
    const fileName = `${docName || "Untitled"}.json`;
    handleDownload(editorValue, fileName, "application/json");
  };

  // convert json to csv and trigger the download
  const handleExportCsv = () => {
    if (!editorValue.trim()) {
      return message.warning("Editor is empty!");
    }

    const result = convertJsonToCsvString(editorValue);
    if (result.success) {
      const fileName = `${docName || "Untitled"}.csv`;
      handleDownload(result.csvString, fileName, "text/csv");
    }
    else {
      message.error(result.error);
    }
  };

  return { handleSaveToDisk, handleExportCsv };
};