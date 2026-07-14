/**
 * unified toolbar component specific to the generator tools.
 * manages state, file uploads, code formatting, and export logic.
 */

"use client";

import styles from "./Toolbar.module.scss";
import { useGeneratorStore } from "@/store/generator.store";
import { useGeneratorLogic } from "../../hooks/useGeneratorLogic";
import { useGeneratorFormatters } from "../../hooks/useGeneratorFormatters";
import { useGeneratorExporters } from "../../hooks/useGeneratorExporters";
import { useRef } from "react";
import { LeftToolbarGroup } from "./LeftToolbarGroup";
import { RightToolbarGroup } from "./RightToolbarGroup";
import { CenterToolbarGroup } from "./CenterToolbarGroup";
import { HiddenFileInput } from "./HIddenFileInput";

// Toolbar component
const Toolbar = ({ type }) => {
  const fileInputRef = useRef(null);

  // logic hook
  const { handleJsonChange, triggerManualGenerate } = useGeneratorLogic(type);
  const { handleFormat, handleSmartFormat, handleMinify } = useGeneratorFormatters();
  const { handleDownloadJson, handleCopyOutput } = useGeneratorExporters(type);

  // store states
  const autoGenerate = useGeneratorStore((state) => state.autoGenerate);
  const toggleAutoGenerate = useGeneratorStore((state) => state.toggleAutoGenerate);
  const clearAll = useGeneratorStore((state) => state.clearAll);
  const triggerLeftCommand = useGeneratorStore((state) => state.triggerLeftCommand);

  // map actions to their respective functions for the Left Pane buttons
  const leftActionHandlers = {
    open: () => fileInputRef.current?.triggerUpload(),
    save: handleDownloadJson,
  };

  // map actions to their respective functions for the Right Pane buttons
  const rightActionHandlers = {
    copy: handleCopyOutput,
    clear: clearAll,
  };

  // map dropdown item keys (format, structure) to their respective functions
  const dropdownActionsMap = {
    expand: () => triggerLeftCommand("expandAll"),
    collapse: () => triggerLeftCommand("collapseAll"),
    format: handleFormat,
    smartFormat: handleSmartFormat,
    minify: handleMinify,
  };

  return (
    <div className={styles.toolbar}>
      {/* hidden file input*/}
      <HiddenFileInput
        ref={fileInputRef}
        handleJsonChange={handleJsonChange}
      />

      {/* action group for the left pane */}
      <LeftToolbarGroup
        onActionClick={(key) => leftActionHandlers[key]?.()}
        onDropdownClick={(key) => dropdownActionsMap[key]?.()}
      />

      {/* central action group for global sync controls */}
      <CenterToolbarGroup
        type={type}
        autoGenerate={autoGenerate}
        toggleAutoGenerate={toggleAutoGenerate}
        triggerManualGenerate={triggerManualGenerate}
      />

      {/* action group for the right pane */}
      <RightToolbarGroup
        type={type}
        onActionClick={(key) => rightActionHandlers[key]?.()}
      />
    </div>
  );
};

export default Toolbar;