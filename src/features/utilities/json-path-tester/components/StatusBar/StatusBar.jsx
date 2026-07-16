/**
 * wrapper for the generic BaseStatusBar.
 * connects specifically to the JSON Path Tester store.
 */

"use client";

import BaseStatusBar from "@/shared/ui/BaseStatusBar/BaseStatusBar";
import { usePathTesterStore } from "@/store/path-tester.store";

// StatusBar component
const StatusBar = () => {

  const jsonInput = usePathTesterStore((state) => state.jsonInput);
  const outputJson = usePathTesterStore((state) => state.outputJson);
  const inputError = usePathTesterStore((state) => state.inputError);
  const matchesCount = usePathTesterStore((state) => state.matchesCount);

  return (
    <BaseStatusBar
      leftLabel="JSON"
      rightLabel="JSON"
      leftValue={jsonInput}
      rightValue={outputJson}
      leftError={inputError}
      rightError={null}
      customRightStatus={`🎯 ${matchesCount} Matches Found`}
    />
  );
};

export default StatusBar;