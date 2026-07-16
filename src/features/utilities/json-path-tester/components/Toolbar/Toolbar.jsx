/**
 * unified toolbar component specific to the json path tester.
 * manages state, file uploads, formatting, structure commands and export logic.
 */

"use client";

import styles from "./Toolbar.module.scss";
import { useRef } from "react";
import { usePathTesterFormatters } from "../../hooks/usePathTesterFormatters";
import { usePathTesterExporters } from "../../hooks/usePathTesterExporters";
import { LeftToolbarGroup } from "./LeftToolbarGroup";
import { RightToolbarGroup } from "./RightToolbarGroup";
import { HiddenFileInput } from "./HiddenFileInput";
import { usePathTesterStore } from "@/store/path-tester.store";

// Toolbar component
const Toolbar = () => {
  const fileInputRef = useRef(null);

  // states & actions
  const setJsonInput = usePathTesterStore((state) => state.setJsonInput);
  const clearAll = usePathTesterStore((state) => state.clearAll);
  const triggerLeftCommand = usePathTesterStore((state) => state.triggerLeftCommand);
  const triggerRightCommand = usePathTesterStore((state) => state.triggerRightCommand);

  // logic hooks
  const { handleFormat, handleSmartFormat, handleMinify } = usePathTesterFormatters();
  const { handleLeftDownloadJson, handleRightDownloadJson, handleCopyOutput } = usePathTesterExporters();

  // map actions for the Left Pane buttons
  const leftActionHandlers = {
    open: () => fileInputRef.current?.triggerUpload(),
    save: handleLeftDownloadJson,
  };

  // map dropdown actions for Left Pane
  const leftDropdownActionsMap = {
    expand: () => triggerLeftCommand("expandAll"),
    collapse: () => triggerLeftCommand("collapseAll"),
    format: handleFormat,
    smartFormat: handleSmartFormat,
    minify: handleMinify,
  };

  // map actions for the Right Pane buttons
  const rightActionHandlers = {
    copy: handleCopyOutput,
    save: handleRightDownloadJson,
    clear: clearAll,
  };

  // map dropdown actions for Right Pane (Structure)
  const rightDropdownActionsMap = {
    expand: () => triggerRightCommand("expandAll"),
    collapse: () => triggerRightCommand("collapseAll"),
  };

  return (
    <div className={styles.toolbar}>
      {/* hidden file input */}
      <HiddenFileInput
        fileRef={fileInputRef}
        handleJsonChange={setJsonInput}
      />

      {/* action group for the left pane (Input) */}
      <LeftToolbarGroup
        onActionClick={(key) => leftActionHandlers[key]?.()}
        onDropdownClick={(key) => leftDropdownActionsMap[key]?.()}
      />

      {/* action group for the right pane (Output) */}
      <RightToolbarGroup
        onActionClick={(key) => rightActionHandlers[key]?.()}
        onDropdownClick={(key) => rightDropdownActionsMap[key]?.()}
      />
    </div>
  );
};

export default Toolbar;