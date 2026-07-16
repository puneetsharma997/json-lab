/**
 * wrapper for the generic BaseValidationPanel.
* connects specifically to the JSON Path Tester store's left pane (JSON input).
 */

"use client";

import BaseValidationPanel from "@/shared/ui/BaseValidationPanel/BaseValidationPanel";
import { usePathTesterStore } from "@/store/path-tester.store";

// Validation Panel component
const ValidationPanel = () => {

  const jsonInput = usePathTesterStore((state) => state.jsonInput);
  const setJsonInput = usePathTesterStore((state) => state.setJsonInput);
  const triggerLeftCommand = usePathTesterStore((state) => state.triggerLeftCommand);

  return (
    <BaseValidationPanel
      value={jsonInput}
      onRepair={(repairedJson) => setJsonInput(repairedJson)}
      onShowError={(line, column) =>
        triggerLeftCommand({ type: "goTo", line, column })
      }
    />
  );
};

export default ValidationPanel;