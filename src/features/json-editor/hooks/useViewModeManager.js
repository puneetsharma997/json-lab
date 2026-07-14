/**
 * custom hook to manage view mode transitions (e.g., text to tree view).
 * it intercepts the mode switch to validate the current json content,
 * preventing the application from crashing if the user attempts to
 * switch to tree mode with invalid json syntax in either active pane.
 */

import { useEditorStore } from "@/store/editor.store";
import { useApp } from "@/shared/hooks/useApp";

export const useViewModeManager = (pane, currentViewMode, editorValue) => {
  const { message } = useApp();

  const documents = useEditorStore((state) => state.documents);
  const leftActiveId = useEditorStore((state) => state.leftActiveId);
  const rightActiveId = useEditorStore((state) => state.rightActiveId);
  const isCompareMode = useEditorStore((state) => state.isCompareMode);
  const setViewMode = useEditorStore((state) => state.setViewMode);

  // handle strict view mode changes and format validations
  const handleViewModeChange = (newMode) => {
    if (newMode === currentViewMode) return;

    if (newMode === "tree") {
      // validate current pane's json before switching
      try {
        JSON.parse(editorValue);
      }
      catch (error) {
        message.error("Cannot switch to Tree Mode. Current JSON is invalid.");
        return;
      }

      // validate the opposite pane's json if compare mode is active
      if (isCompareMode) {
        const otherPaneId = pane === "left" ? rightActiveId : leftActiveId;
        const otherDoc = documents.find((d) => d.id === otherPaneId);

        try {
          JSON.parse(otherDoc?.content || "");
        }
        catch (error) {
          message.error("Cannot switch. The other pane contains invalid JSON.");
          return;
        }
      }
    }

    // apply the validated mode to the current pane
    setViewMode(newMode, pane);
  };

  return { handleViewModeChange };
};