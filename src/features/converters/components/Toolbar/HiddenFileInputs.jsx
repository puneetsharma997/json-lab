/**
 * extracted component for handling hidden file inputs in the converter tools.
 * securely manages the file selection and reading process without cluttering the ui.
 * utilizes react 19's native ref passing (no forwardRef needed).
 */

"use client"

import { useImperativeHandle, useRef } from "react";
import { useApp } from "@/shared/hooks/useApp";
import { readFileAsText } from "@/shared/utils/file/read-file";

// Hidden File Inputs component
export const HiddenFileInputs = ({ ref, type, handleLeftChange, handleRightChange }) => {
  const { message } = useApp();

  // local refs for the native file inputs
  const leftInputRef = useRef(null);
  const rightInputRef = useRef(null);

  // expose methods to the parent (Toolbar) to trigger clicks
  useImperativeHandle(ref, () => ({
    triggerLeftUpload: () => leftInputRef.current?.click(),
    triggerRightUpload: () => rightInputRef.current?.click(),
  }));

  // function to upload file for the left pane (dynamic type)
  const handleUploadLeft = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await readFileAsText(file);
    if (result.success) {
      handleLeftChange(result.content);
      message.success(`${type.toUpperCase()} file loaded successfully!`);
    }
    else {
      message.error(result.error);
    }

    // reset input so the same file can be uploaded again if needed
    if (leftInputRef.current) leftInputRef.current.value = "";
  };

  // function to upload file for the right pane (strictly json)
  const handleUploadRight = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await readFileAsText(file);
    if (result.success) {
      handleRightChange(result.content);
      message.success("JSON file loaded successfully!");
    }
    else {
      message.error(result.error);
    }

    // reset input
    if (rightInputRef.current) rightInputRef.current.value = "";
  };

  return (
    <>
      <input
        type="file"
        ref={leftInputRef}
        onChange={handleUploadLeft}
        style={{ display: "none" }}
      />
      <input
        type="file"
        accept=".json,application/json"
        ref={rightInputRef}
        onChange={handleUploadRight}
        style={{ display: "none" }}
      />
    </>
  );
};