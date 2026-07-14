/**
 * shared custom hook to handle structural and navigation commands in monaco editor.
 * manages node folding (expand/collapse) from the toolbar, and
 * precise line navigation (goto) triggered by the validation panel's "show error" button.
 */

import { useEffect } from "react";

export const useEditorStructureCommands = (commandPayload, editorRef) => {
  useEffect(() => {
    if (!commandPayload || !editorRef.current) return;

    const editor = editorRef.current;
    const cmd = commandPayload.command;

    // handle structure folding commands
    if (cmd === "expandAll") {
      editor.getAction("editor.unfoldAll").run();
    }
    else if (cmd === "collapseAll") {
      editor.getAction("editor.foldAll").run();
    }
    // handle navigation commands
    else if (typeof cmd === "object" && cmd.type === "goTo") {
      editor.revealLineInCenter(cmd.line);
      editor.setPosition({ lineNumber: cmd.line, column: cmd.column });
      editor.focus();
    }
  }, [commandPayload, editorRef]);
};