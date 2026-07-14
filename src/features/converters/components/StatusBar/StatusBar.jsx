/**
 * wrapper for the generic BaseStatusBar.
 * connects specifically to the converter store.
 */

"use client";

import BaseStatusBar from "@/shared/ui/BaseStatusBar/BaseStatusBar";
import { useConverterStore } from "@/store/converter.store";

// StatusBar component
const StatusBar = ({ type }) => {

  const leftValue = useConverterStore((state) => state.leftValue);
  const rightValue = useConverterStore((state) => state.rightValue);
  const leftError = useConverterStore((state) => state.leftError);
  const rightError = useConverterStore((state) => state.rightError);

  return (
    <BaseStatusBar
      leftLabel={type.toUpperCase()}
      rightLabel="JSON"
      leftValue={leftValue}
      rightValue={rightValue}
      leftError={leftError}
      rightError={rightError}
    />
  );
};

export default StatusBar;