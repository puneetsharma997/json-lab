/**
 * main toolbar component for the json editor pane.
 * it delegates heavy business logic to granular custom hooks and focuses
 * entirely on rendering ui elements, managing local ui states (modals/inputs),
 * and routing dropdown or button clicks to their respective action handlers.
 */

"use client";

import { jsonEditorToolbarActions } from "../../config/toolbar-actions";
import styles from "./Toolbar.module.scss";
import { useEditorStore } from "@/store/editor.store";
import { XSquare } from "lucide-react";
import { useRef, useState } from "react";
import OpenFileModal from "../OpenFileModal/OpenFileModal";
import { DocumentTitle } from "./DocumentTitle";
import { HiddenFileInputs } from "./HiddenFileInputs";
import { ToolbarItem } from "./ToolbarItem";
import { Select } from "antd";
import { useViewModeManager } from "../../hooks/useViewModeManager";
import { useEditorFormatters } from "../../hooks/useEditorFormatters";
import { useFileExporters } from "../../hooks/useFileExporters";

// Main Json Editor Toolbar Component
const Toolbar = ({ pane = "left" }) => {

  // refs for hidden inputs
  const fileUploaderRef = useRef(null);

  const [isOpenModalVisible, setIsOpenModalVisible] = useState(false);

  // fetch active document specific to the current pane
  const documents = useEditorStore((state) => state.documents);
  const leftActiveId = useEditorStore((state) => state.leftActiveId);
  const rightActiveId = useEditorStore((state) => state.rightActiveId);
  const activeId = pane === "left" ? leftActiveId : rightActiveId;

  const activeDoc = documents.find(d => d.id === activeId);
  const editorValue = activeDoc?.content || "";
  const docName = activeDoc?.name || "Untitled";

  const clearEditor = useEditorStore((state) => state.clearEditor);
  const createNewDocument = useEditorStore((state) => state.createNewDocument);
  const toggleCompareMode = useEditorStore((state) => state.toggleCompareMode);
  const triggerEditorCommand = useEditorStore((state) => state.triggerEditorCommand);
  const leftViewMode = useEditorStore((state) => state.leftViewMode);
  const rightViewMode = useEditorStore((state) => state.rightViewMode);

  const currentViewMode = pane === "left" ? leftViewMode : rightViewMode;

  // custom hooks
  const { handleViewModeChange } = useViewModeManager(pane, currentViewMode, editorValue);
  const { handleFormat, handleSmartFormat, handleMinify } = useEditorFormatters(pane, editorValue);
  const { handleSaveToDisk, handleExportCsv } = useFileExporters(editorValue, docName);

  // dynamically modify the 'Compare' action based on the active pane
  const visibleActions = jsonEditorToolbarActions
    .filter((action) => {
      if (action.visible === false) return false;
      if (currentViewMode === "tree" && action.key === "format-group") {
        return false;
      }
      return true;
    })
    .map((action) => {
      if (action.key === "compare") {
        if (pane === "right") {
          return { ...action, label: "Close", icon: XSquare, danger: true, tooltip: "Close Compare", };
        }
      }
      return action;
    });

  // object map for dropdown clicks
  const dropdownActionsMap = {
    "open-disk": () => fileUploaderRef.current?.triggerJsonUpload(),
    "import-csv": () => fileUploaderRef.current?.triggerCsvUpload(),
    "open-file": () => setIsOpenModalVisible(true),
    "save-disk": handleSaveToDisk,
    "export-csv": handleExportCsv,
    "format": handleFormat,
    "smartFormat": handleSmartFormat,
    "minify": handleMinify,
    "collapse": () => triggerEditorCommand("collapse", pane),
    "expand": () => triggerEditorCommand("expand", pane),
  };

  // execute the mapped dropdown function if it exists
  const handleDropdownClick = (menuKey) => {
    const action = dropdownActionsMap[menuKey];
    if (action) action();
  };

  // map actions to their respective functions
  const actionHandlers = {
    new: () => createNewDocument(pane),
    compare: toggleCompareMode,
    clear: () => clearEditor(pane),
  };

  return (
    <div className={styles.toolbar}>
      {/* Hidden Inputs for File Dialogs */}
      <HiddenFileInputs ref={fileUploaderRef} pane={pane} />

      {/* Open File Modal */}
      <OpenFileModal
        isOpen={isOpenModalVisible}
        onClose={() => setIsOpenModalVisible(false)}
        pane={pane}
      />

      {/* Document title edits the name in the current pane */}
      <div className={styles.documentInfo}>
        <DocumentTitle pane={pane} />
      </div>

      {/* Tools & Actions Buttons */}
      <div className={styles.actionsGroup}>

        {/* Select Component for View Mode */}
        <Select
          value={currentViewMode}
          onChange={handleViewModeChange}
          variant="filled"
          style={{
            height: "2.2rem",
            backgroundColor: "var(--bg-hover-purple)", borderRadius: "0.4rem",
            fontSize: "0.85rem", fontWeight: 500
          }}
          options={[
            { value: "text", label: "Text View" },
            { value: "tree", label: "Tree View" },
          ]}
        />

        {visibleActions.map((action) => {
          return (
            <ToolbarItem
              key={action.key}
              action={action}
              onDropdownClick={handleDropdownClick}
              onActionClick={(key) => actionHandlers[key]?.()}
            />
          )
        })}

      </div>
    </div>
  );
};

export default Toolbar;