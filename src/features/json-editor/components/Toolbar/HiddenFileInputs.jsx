import { useImperativeHandle, useRef } from "react";
import { useEditorStore } from "@/store/editor.store";
import { useApp } from "@/shared/hooks/useApp";
import { readFileAsText } from "@/shared/utils/file/read-file";
import { convertCsvToJsonString } from "@/shared/utils/file/parse-csv";

// Hidden Inputs for File Dialogs
export const HiddenFileInputs = ({ ref, pane = "left" }) => {
  const { message } = useApp();

  // Local refs for inputs
  const jsonInputRef = useRef(null);
  const csvInputRef = useRef(null);

  // Zustand actions
  const addUploadedDocument = useEditorStore((state) => state.addUploadedDocument);

  // Ye methods parent (Toolbar) ko expose honge
  useImperativeHandle(ref, () => ({
    triggerJsonUpload: () => jsonInputRef.current?.click(),
    triggerCsvUpload: () => csvInputRef.current?.click(),
  }));

  // function to upload json file upload
  const handleJsonFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await readFileAsText(file);
    if (result.success) {
      addUploadedDocument(result.name, result.content, pane);
      message.success("JSON file loaded successfully!");
    }
    else {
      message.error(result.error);
    }

    // reset input
    if (jsonInputRef.current) jsonInputRef.current.value = "";
  };

  // function to import csv upload
  const handleCsvFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const readResult = await readFileAsText(file);
    if (readResult.success) {
      const convertResult = convertCsvToJsonString(readResult.content);
      if (convertResult.success) {
        addUploadedDocument(readResult.name, convertResult.jsonString, pane);
        message.success("CSV imported and converted to JSON!");
      }
      else {
        message.error(convertResult.error);
      }
    }
    else {
      message.error(readResult.error);
    }

    // reset input
    if (csvInputRef.current) csvInputRef.current.value = "";
  };

  return (
    <>
      <input
        type="file"
        accept=".json,application/json"
        ref={jsonInputRef}
        style={{ display: "none" }}
        onChange={handleJsonFileUpload}
      />
      <input
        type="file"
        accept=".csv,text/csv"
        ref={csvInputRef}
        style={{ display: "none" }}
        onChange={handleCsvFileUpload}
      />
    </>
  );
};

HiddenFileInputs.displayName = "HiddenFileInputs";