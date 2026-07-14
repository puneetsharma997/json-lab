/**
 * wrapper for the generic BaseStatusBar.
 * connects specifically to the generator store.
 */

"use client";

import BaseStatusBar from "@/shared/ui/BaseStatusBar/BaseStatusBar";
import { useGeneratorStore } from "@/store/generator.store";

// StatusBar component
const StatusBar = ({ type }) => {

  const jsonInput = useGeneratorStore((state) => state.jsonInput);
  const generatedOutput = useGeneratorStore((state) => state.generatedOutput);
  const inputError = useGeneratorStore((state) => state.inputError);

  // dynamically determine the output label based on generator type
  const getRightLabel = () => {
    if (type === "ts") return "TypeScript";
    if (type === "zod") return "Zod Schema";
    if (type === "schema") return "JSON Schema";
    return "plaintext";
  };

  return (
    <BaseStatusBar
      leftLabel="JSON"
      rightLabel={getRightLabel()}
      leftValue={jsonInput}
      rightValue={generatedOutput}
      leftError={inputError}
      rightError={null} // right pane is always generated programmatically, so it's always valid
    />
  );
};

export default StatusBar;