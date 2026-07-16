/**
 * custom hook to manage file export and clipboard operations.
 * purely handles the logic, expects the content to be passed as arguments.
 */

import { useCallback } from "react";
import { downloadFile } from "@/shared/utils/file/download-file";
import { useApp } from "@/shared/hooks/useApp";

export const useExporters = () => {
  const { message } = useApp();

  // dynamic download handler
  const handleDownload = useCallback((content, fileName, mimeType = "application/json") => {
    if (!content || !content.trim()) {
      return message.warning("Editor is empty!");
    }
    downloadFile(content, fileName, mimeType);
    message.success(`Saved as ${fileName}`);

  }, [message]);

  // dynamic copy handler
  const handleCopy = useCallback(async (content, successMsg = "Copied to clipboard!") => {
    if (!content || !content.trim()) {
      return message.warning("Nothing to copy!");
    }
    try {
      await navigator.clipboard.writeText(content);
      message.success(successMsg);
    }
    catch (err) {
      message.error("Failed to copy to clipboard.");
    }

  }, [message]);

  return { handleDownload, handleCopy };
};