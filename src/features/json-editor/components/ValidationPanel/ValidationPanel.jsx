"use client";

import { useEditorStore } from "@/store/editor.store";
import BaseValidationPanel from "@/shared/ui/BaseValidationPanel/BaseValidationPanel";

// Validation panel for invalid JSON
const ValidationPanel = ({ pane = "left" }) => {

  // read documents and determine the active ID based on the pane
  const documents = useEditorStore((state) => state.documents);
  const activeId = useEditorStore((state) =>
    pane === "left" ? state.leftActiveId : state.rightActiveId
  );

  // retrieve the document assigned to this specific pane
  const activeDoc = documents.find((d) => d.id === activeId);

  const editorValue = activeDoc?.content || "";
  const setEditorValue = useEditorStore((state) => state.setEditorValue);
  const setGoToLocation = useEditorStore((state) => state.setGoToLocation);

  return (
    <BaseValidationPanel
      value={editorValue}
      onRepair={(repairedJson) => setEditorValue(repairedJson, pane)}
      onShowError={(line, column) =>
        setGoToLocation(line, column)
      }
    />
  );
};

export default ValidationPanel;