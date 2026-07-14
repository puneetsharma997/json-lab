/**
 * extracted component for handling hidden file inputs in the generator tools.
 * securely manages the file selection for the json input (one-way).
 */

"use client"

import { useImperativeHandle, useRef } from "react";
import { useApp } from "@/shared/hooks/useApp";
import { readFileAsText } from "@/shared/utils/file/read-file";

// HiddenFileInput component
export const HiddenFileInput = ({ ref, handleJsonChange }) => {
  const { message } = useApp();
  const inputRef = useRef(null);

  // expose method to the parent (Toolbar) to trigger click
  useImperativeHandle(ref, () => ({
    triggerUpload: () => inputRef.current?.click(),
  }));

  // function to upload json file
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await readFileAsText(file);
    if (result.success) {
      handleJsonChange(result.content);
      message.success("JSON file loaded successfully!");
    }
    else {
      message.error(result.error);
    }

    // reset input
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <input
      type="file"
      accept=".json,application/json"
      ref={inputRef}
      onChange={handleUpload}
      style={{ display: "none" }}
    />
  );
};