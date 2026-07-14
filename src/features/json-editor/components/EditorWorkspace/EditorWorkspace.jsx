"use client";

import Toolbar from "../Toolbar/Toolbar";
import EditorMonaco from "../EditorMonaco/EditorMonaco";
import ValidationPanel from "../ValidationPanel/ValidationPanel";
import StatusBar from "../StatusBar/StatusBar";
import styles from "./EditorWorkspace.module.scss";
import { useEditorStore } from "@/store/editor.store";
import EditorTreeView from "./EditorTreeView";

// Editor work space component
const EditorWorkspace = ({ pane = "left" }) => {

  const leftViewMode = useEditorStore((state) => state.leftViewMode);
  const rightViewMode = useEditorStore((state) => state.rightViewMode);
  const currentViewMode = pane === "left" ? leftViewMode : rightViewMode;

  return (
    <div className={styles.workspace}>
      <Toolbar pane={pane} />

      <div className={styles.editorContainer}>
        {currentViewMode === "text" ?
          <EditorMonaco pane={pane} />
          :
          <EditorTreeView pane={pane} />
        }
      </div>

      <ValidationPanel pane={pane} />

      <StatusBar pane={pane} />
    </div>
  );
};

export default EditorWorkspace;