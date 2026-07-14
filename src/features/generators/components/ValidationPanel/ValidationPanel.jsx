/**
 * wrapper for the generic BaseValidationPanel.
* connects specifically to the generator store's left pane (JSON input).
 */

"use client";

import BaseValidationPanel from "@/shared/ui/BaseValidationPanel/BaseValidationPanel";
import { useGeneratorStore } from "@/store/generator.store";

// Validation Panel component
const ValidationPanel = () => {

  const jsonInput = useGeneratorStore((state) => state.jsonInput);
  const setJsonInput = useGeneratorStore((state) => state.setJsonInput);
  const triggerLeftCommand = useGeneratorStore((state) => state.triggerLeftCommand);

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