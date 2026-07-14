/**
 * custom hook to handle monaco editor commands and programmatic navigation.
 * it listens to the zustand store for specific error locations ('goToLocation')
 * and global structural commands like 'expand/collapse' to trigger native editor actions.
 */

import { useEffect } from "react";
import { useEditorStore } from "@/store/editor.store";

export const useEditorCommands = (editorRef, pane) => {
  const goToLocation = useEditorStore((state) => state.goToLocation);
  const editorCommand = useEditorStore((state) => state.editorCommand);

  // handle smooth scrolling and cursor placement during next or previous navigation
  useEffect(() => {
    if (goToLocation && editorRef.current) {
      const { line, column } = goToLocation;
      editorRef.current.revealLineInCenter(line);
      editorRef.current.setPosition({ lineNumber: line, column: column });
      editorRef.current.focus();
    }
  }, [goToLocation, editorRef]);

  // execute monaco folding or unfolding actions based on toolbar commands
  // expand and collapse functionality
  useEffect(() => {
    if (editorCommand && editorCommand.pane === pane && editorRef.current) {
      if (editorCommand.command === "collapse") {
        editorRef.current.getAction("editor.foldAll").run();
      }
      else if (editorCommand.command === "expand") {
        editorRef.current.getAction("editor.unfoldAll").run();
      }
    }
  }, [editorCommand, pane, editorRef]);
};