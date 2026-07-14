/**
 * dedicated validation ui panel tailored for the converter's json pane.
 * listens to json parsing diagnostics, displays real-time syntax errors,
 * and provides one-click actions to auto-repair formatting or jump to the error line.
 */

"use client";

import { useConverterStore } from "@/store/converter.store";
import BaseValidationPanel from "@/shared/ui/BaseValidationPanel/BaseValidationPanel";

// Validation panel specifically tailored for the Converter's JSON pane
const ValidationPanel = () => {

  const rightValue = useConverterStore((state) => state.rightValue);
  const setRightValue = useConverterStore((state) => state.setRightValue);
  const triggerRightCommand = useConverterStore((state) => state.triggerRightCommand);

  return (
    <BaseValidationPanel
      value={rightValue}
      onRepair={(repairedJson) => setRightValue(repairedJson)}
      onShowError={(line, column) =>
        triggerRightCommand({ type: "goTo", line, column })
      }
    />
  );
};

export default ValidationPanel;