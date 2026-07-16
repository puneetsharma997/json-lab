/**
 * unified toolbar component specific to the converter tools.
 * editor contents, toggling live auto-conversion, and clearing data.
 */

"use client";

import styles from "./Toolbar.module.scss";
import { useConverterStore } from "@/store/converter.store";
import { useConverterLogic } from "../../hooks/useConverterLogic";
import { useRef } from "react";
import { HiddenFileInputs } from "./HiddenFileInputs";
import { LeftToolbarGroup } from "./LeftToolbarGroup";
import { RightToolbarGroup } from "./RightToolbarGroup";
import { CenterToolbarGroup } from "./CenterToolbarGroup";
import { useExporters } from "@/shared/hooks/useExporters";

// Toolbar component
const Toolbar = ({ type }) => {

  // ref for the external hidden file inputs component
  const fileInputsRef = useRef(null);

  // fetch logic methods for conversions
  const { handleLeftChange, handleRightChange, convertLeftToRight, convertRightToLeft } = useConverterLogic(type);

  // download using global custom hook
  const { handleDownload } = useExporters();

  const clearAll = useConverterStore((state) => state.clearAll);
  const autoConvert = useConverterStore((state) => state.autoConvert);
  const toggleAutoConvert = useConverterStore((state) => state.toggleAutoConvert);
  const triggerRightCommand = useConverterStore((state) => state.triggerRightCommand);

  // fetch values for downloading
  const leftValue = useConverterStore((state) => state.leftValue);
  const rightValue = useConverterStore((state) => state.rightValue);

  // handler for left toolbar buttons (i.e - Open / Save)
  const handleLeftActionClick = async (key) => {
    if (key === "open") fileInputsRef.current?.triggerLeftUpload();
    if (key === "save") {
      const ext = type === "csv" ? "csv" : type === "xml" ? "xml" : "yaml";
      const mime = type === "csv" ? "text/csv" : type === "xml" ? "application/xml" : "text/yaml";

      handleDownload(leftValue, `converted.${ext}`, mime);
    }
  };

  // handler for right toolbar buttons (i.e - Open / Save / Clear)
  const handleRightActionClick = (key) => {
    if (key === "open") fileInputsRef.current?.triggerRightUpload();
    if (key === "save") {
      handleDownload(rightValue, "converted.json", "application/json");
    }
    if (key === "clear") {
      clearAll();
    }
  };

  // handler for structure dropdown (Expand/Collapse)
  const handleDropdownClick = (key) => {
    if (key === "expand") triggerRightCommand("expandAll");
    if (key === "collapse") triggerRightCommand("collapseAll");
  };

  return (
    <div className={styles.toolbar}>
      {/* hidden file inputs */}
      <HiddenFileInputs
        ref={fileInputsRef}
        type={type}
        handleLeftChange={handleLeftChange}
        handleRightChange={handleRightChange}
      />

      {/* action group for the left pane */}
      <LeftToolbarGroup
        type={type}
        onActionClick={handleLeftActionClick}
      />

      {/* central action group for global sync controls */}
      <CenterToolbarGroup
        type={type}
        autoConvert={autoConvert}
        toggleAutoConvert={toggleAutoConvert}
        convertLeftToRight={() => convertLeftToRight(leftValue)}
        convertRightToLeft={() => convertRightToLeft(rightValue)}
      />

      {/* action group for the right pane */}
      <RightToolbarGroup
        onActionClick={handleRightActionClick}
        onDropdownClick={handleDropdownClick}
      />
    </div>
  );
};

export default Toolbar;