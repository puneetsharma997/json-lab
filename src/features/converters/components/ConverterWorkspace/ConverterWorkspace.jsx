/**
 * core workspace layout for all converters (yaml, xml, csv).
 * it implements a resizable split-pane containing two monaco editors.
 * the left editor's language adapts dynamically based on the tool type,
 * while the right editor always defaults to json.
 */

"use client";

import dynamic from "next/dynamic";
import { Pane } from "react-split-pane";
import "react-split-pane/styles.css";
import styles from "./ConverterWorkspace.module.scss";
import MonacoEditor from "@/shared/ui/MonacoEditor/MonacoEditor";
import { useConverterStore } from "@/store/converter.store";
import Toolbar from "../Toolbar/Toolbar";
import StatusBar from "../StatusBar/StatusBar";
import { useConverterLogic } from "../../hooks/useConverterLogic";
import { useEffect, useRef } from "react";
import ValidationPanel from "../ValidationPanel/ValidationPanel";
import { useEditorStructureCommands } from "@/shared/hooks/useEditorStructureCommands";

// dynamically import react-split-pane to avoid next.js ssr hydration errors
const SplitPane = dynamic(
  () => import("react-split-pane").then((mod) => mod.default || mod.SplitPane),
  { ssr: false }
);

// Converter Workspace Component
const ConverterWorkspace = ({ type }) => {

  const leftValue = useConverterStore((state) => state.leftValue);
  const rightValue = useConverterStore((state) => state.rightValue);
  const rightEditorCommand = useConverterStore((state) => state.rightEditorCommand);

  // reference to hold the right monaco editor instance
  const rightEditorRef = useRef(null);

  // bi-directional conversion handlers
  const { handleLeftChange, handleRightChange } = useConverterLogic(type);

  // expand and collapse json nodes custom hook
  useEditorStructureCommands(rightEditorCommand, rightEditorRef);

  // determine the syntax highlighting language for the left editor
  const getLeftLanguage = () => {
    if (type === "yaml") return "yaml";
    if (type === "xml") return "xml";
    if (type === "csv") return "plaintext";
    return "plaintext";
  };

  // store the editor instance when it mounts on the screen
  const handleRightEditorMount = (editor) => {
    rightEditorRef.current = editor;
  };

  return (
    <div className={styles.workspace}>
      <Toolbar type={type} />

      <div className={styles.editorContainer}>
        <SplitPane split="vertical">
          {/* left pane for the source format */}
          <Pane defaultSize="50%" minSize="20%">
            <MonacoEditor
              language={getLeftLanguage()}
              value={leftValue}
              onChange={(val) => handleLeftChange(val ?? "")}
            />
          </Pane>

          {/* right pane always strictly for json */}
          <Pane defaultSize="50%" minSize="20%">
            <MonacoEditor
              language="json"
              value={rightValue}
              onChange={(val) => handleRightChange(val ?? "")}
              onMount={handleRightEditorMount}
            />
          </Pane>
        </SplitPane>
      </div>

      <ValidationPanel />

      <StatusBar type={type} />
    </div>
  );
};

export default ConverterWorkspace;