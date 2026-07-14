/**
 * custom hook to handle tree view specific commands like expand and collapse.
 * it listens to the zustand global store for commands and safely forces
 * the react-json-tree component to remount by updating its key,
 * bypassing react strict mode cascading render warnings using timeouts.
 */

import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/store/editor.store";

export const useTreeCommands = (pane) => {
  const editorCommand = useEditorStore((state) => state.editorCommand);

  // state to force tree remounts and track how deep the tree should expand
  const [treeKey, setTreeKey] = useState(0);
  const [expandLevel, setExpandLevel] = useState(2);
  const lastCommandTime = useRef(0);

  // listen to toolbar commands and update states asynchronously
  useEffect(() => {
    if (editorCommand && editorCommand.pane === pane) {
      // verify if the command is genuinely new based on timestamp
      if (editorCommand.timestamp !== lastCommandTime.current) {
        lastCommandTime.current = editorCommand.timestamp;

        // wrap in timeout to prevent synchronous state updates during render
        setTimeout(() => {
          if (editorCommand.command === "collapse") {
            setExpandLevel(0);
            setTreeKey((prev) => prev + 1);
          }
          else if (editorCommand.command === "expand") {
            setExpandLevel(100);
            setTreeKey((prev) => prev + 1);
          }
        }, 0);
      }
    }
  }, [editorCommand, pane]);

  return { treeKey, expandLevel };
};