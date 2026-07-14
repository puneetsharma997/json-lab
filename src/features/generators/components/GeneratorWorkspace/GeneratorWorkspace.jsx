/**
 * core workspace layout for the code generators (ts, zod, schema).
 * implements a resizable split-pane containing two monaco editors.
 * the left editor strictly accepts json input, while the right editor
 * safely displays the dynamically generated, read-only output.
 */

"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Pane } from "react-split-pane";
import "react-split-pane/styles.css";
import styles from "./GeneratorWorkspace.module.scss";
import MonacoEditor from "@/shared/ui/MonacoEditor/MonacoEditor";
import { useGeneratorStore } from "@/store/generator.store";
import StatusBar from "../StatusBar/StatusBar";
import { useGeneratorLogic } from "../../hooks/useGeneratorLogic";
import ValidationPanel from "../ValidationPanel/ValidationPanel";
import Toolbar from "../Toolbar/Toolbar";
import { useEditorStructureCommands } from "@/shared/hooks/useEditorStructureCommands";

// dynamically import react-split-pane to avoid next.js ssr hydration errors
const SplitPane = dynamic(
  () => import("react-split-pane").then((mod) => mod.default || mod.SplitPane),
  { ssr: false }
);

// Generator Workspace component
const GeneratorWorkspace = ({ type }) => {
  // fetch state from the generator store
  const jsonInput = useGeneratorStore((state) => state.jsonInput);
  const generatedOutput = useGeneratorStore((state) => state.generatedOutput);
  const leftEditorCommand = useGeneratorStore((state) => state.leftEditorCommand);

  // generator handlers
  const { handleJsonChange } = useGeneratorLogic(type);

  // reference to hold the left monaco editor instance
  const leftEditorRef = useRef(null);

  // expand and collapse json nodes custom hook
  useEditorStructureCommands(leftEditorCommand, leftEditorRef);

  // dynamically determine syntax highlighting for the right (output) pane
  const getRightLanguage = () => {
    if (type === "ts" || type === "zod") return "typescript";
    if (type === "schema") return "json";
    return "plaintext";
  };

  const handleLeftEditorMount = (editor) => {
    leftEditorRef.current = editor;
  };

  return (
    <div className={styles.workspace}>
      <Toolbar type={type} />

      <div className={styles.editorContainer}>
        <SplitPane split="vertical">
          {/* left pane for the source format (JSON) */}
          <Pane defaultSize="50%" minSize="20%">
            <MonacoEditor
              language="json"
              value={jsonInput}
              onChange={(val) => handleJsonChange(val ?? "")}
              onMount={handleLeftEditorMount}
            />
          </Pane>

          {/* right pane for selected generator */}
          <Pane defaultSize="50%" minSize="20%">
            <MonacoEditor
              language={getRightLanguage()}
              value={generatedOutput}
              readOnly={true}
            />
          </Pane>
        </SplitPane>
      </div>

      <ValidationPanel />

      <StatusBar type={type} />
    </div>
  );
};

export default GeneratorWorkspace;