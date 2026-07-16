/**
 * core workspace layout for the JSON path tester.
 * implements a resizable split-pane containing two monaco editors.
 * the left editor strictly accepts json input, while the right editor
 * safely displays the read-only output.
 */

"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Pane } from "react-split-pane";
import "react-split-pane/styles.css";
import styles from "./PathTesterWorkspace.module.scss";
import MonacoEditor from "@/shared/ui/MonacoEditor/MonacoEditor";
import { useEditorStructureCommands } from "@/shared/hooks/useEditorStructureCommands";
import { usePathTesterStore } from "@/store/path-tester.store";
import StatusBar from "../StatusBar/StatusBar";
import ValidationPanel from "../ValidationPanel/ValidationPanel";
import QueryInput from "../QueryInput/QueryInput";
import { usePathTesterLogic } from "../../hooks/usePathTesterLogic";
import Toolbar from "../Toolbar/Toolbar";

// dynamically import react-split-pane to avoid next.js ssr hydration errors
const SplitPane = dynamic(
  () => import("react-split-pane").then((mod) => mod.default || mod.SplitPane),
  { ssr: false }
);

// Path Tester Workspace component
const PathTesterWorkspace = () => {
  // fetch state from the path tester store
  const jsonInput = usePathTesterStore((state) => state.jsonInput);
  const setJsonInput = usePathTesterStore((state) => state.setJsonInput);
  const outputJson = usePathTesterStore((state) => state.outputJson);
  const loadSample = usePathTesterStore((state) => state.loadSample);

  const leftEditorCommand = usePathTesterStore((state) => state.leftEditorCommand);
  const rightEditorCommand = usePathTesterStore((state) => state.rightEditorCommand);

  // reference to hold the monaco editor instance
  const leftEditorRef = useRef(null);
  const rightEditorRef = useRef(null);

  // hook to execute jsonpath evaluation logic
  usePathTesterLogic();

  // expand and collapse json nodes custom hook
  useEditorStructureCommands(leftEditorCommand, leftEditorRef);
  useEditorStructureCommands(rightEditorCommand, rightEditorRef);

  // populate with sample data only if workspace is completely empty
  useEffect(() => {
    if (!jsonInput) {
      loadSample();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // store the left editor instance on mount
  const handleLeftEditorMount = (editor) => {
    leftEditorRef.current = editor;
  };

  // store the right editor instance on mount
  const handleRightEditorMount = (editor) => {
    rightEditorRef.current = editor;
  };

  return (
    <div className={styles.workspace}>
      <Toolbar />

      <QueryInput />

      <div className={styles.editorContainer}>
        <SplitPane split="vertical">
          {/* left pane for the source format (JSON) */}
          <Pane defaultSize="50%" minSize="20%">
            <MonacoEditor
              language="json"
              value={jsonInput}
              onChange={(val) => setJsonInput(val ?? "")}
              onMount={handleLeftEditorMount}
            />
          </Pane>

          {/* right pane for selected generator */}
          <Pane defaultSize="50%" minSize="20%">
            <MonacoEditor
              language="json"
              value={outputJson}
              readOnly={true}
              onMount={handleRightEditorMount}
            />
          </Pane>
        </SplitPane>
      </div>

      <ValidationPanel />

      <StatusBar />
    </div>
  );
};

export default PathTesterWorkspace;