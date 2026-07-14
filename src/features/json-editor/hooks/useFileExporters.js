/**
 * custom hook to manage file export operations.
 * it handles downloading the current editor content as a standard json file,
 * or converting the json arrays to csv strings for spreadsheet exports.
 */

import { downloadFile } from "@/shared/utils/file/download-file";
import { convertJsonToCsvString } from "@/shared/utils/file/json-to-csv";
import { useApp } from "@/shared/hooks/useApp";

export const useFileExporters = (editorValue, docName) => {
  const { message } = useApp();

  // process and trigger a download for the json file
  const handleSaveToDisk = () => {
    if (!editorValue.trim()) {
      return message.warning("Editor is empty!");
    }
    const fileName = `${docName || "Untitled"}.json`;
    downloadFile(editorValue, fileName, "application/json");
    message.success(`Saved as ${fileName}`);
  };

  // convert json to csv and trigger the download
  const handleExportCsv = () => {
    if (!editorValue.trim()) {
      return message.warning("Editor is empty!");
    }
    const result = convertJsonToCsvString(editorValue);
    if (result.success) {
      const fileName = `${docName || "Untitled"}.csv`;
      downloadFile(result.csvString, fileName, "text/csv");
      message.success(`Exported as ${fileName}`);
    }
    else {
      message.error(result.error);
    }
  };

  return { handleSaveToDisk, handleExportCsv };
};