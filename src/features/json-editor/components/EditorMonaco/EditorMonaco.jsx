"use client"

import MonacoEditor from "@/shared/ui/MonacoEditor/MonacoEditor";
import { useEditorStore } from "@/store/editor.store";
import { useRef, useState } from "react";
import { useEditorCommands } from "../../hooks/useEditorCommands";
import { useEditorDiff } from "../../hooks/useEditorDiff";

// Editor Monaco Component
const EditorMonaco = ({ pane = "left" }) => {
  const editorRef = useRef(null);

  // reference to hold Monaco decoration objects (highlights)
  const decorationsCollectionRef = useRef(null);

  // to track editor mount status
  const [isEditorReady, setIsEditorReady] = useState(false);

  const documents = useEditorStore((state) => state.documents);
  const setEditorValue = useEditorStore((state) => state.setEditorValue);

  // fetch active IDs for BOTH panes to compare them
  const leftActiveId = useEditorStore((state) => state.leftActiveId);
  const rightActiveId = useEditorStore((state) => state.rightActiveId);

  const leftDoc = documents.find(d => d.id === leftActiveId);
  const rightDoc = documents.find(d => d.id === rightActiveId);

  const leftValue = leftDoc?.content || "";
  const rightValue = rightDoc?.content || "";
  const editorValue = pane === "left" ? leftValue : rightValue;


  // save the editor instance when Monaco finishes mounting
  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    decorationsCollectionRef.current = editor.createDecorationsCollection([]);
    setIsEditorReady(true);
  };

  // custom hook to handle external commands like collapse/expand and navigate
  useEditorCommands(editorRef, pane);

  // custom hook to handle diff calculation and compare mode highlights
  useEditorDiff(editorRef, decorationsCollectionRef, isEditorReady, pane, leftValue, rightValue);

  return (
    <MonacoEditor
      value={editorValue}
      onChange={(newValue) => setEditorValue(newValue ?? "", pane)}
      onMount={handleEditorMount}
    />
  );
};

export default EditorMonaco;