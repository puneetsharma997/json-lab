import { useState } from "react";
import { Input, Tooltip } from "antd";
import { Pencil } from "lucide-react";
import { useEditorStore } from "@/store/editor.store";
import styles from "./Toolbar.module.scss";

//  DocumentTitle component
export const DocumentTitle = ({ pane = "left" }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [localNameInput, setLocalNameInput] = useState("");

  // determine which document ID is active based on the pane
  const documents = useEditorStore((state) => state.documents);
  const activeId = useEditorStore((state) =>
    pane === "left" ? state.leftActiveId : state.rightActiveId
  );

  // find the exact document object to display its name
  const activeDoc = documents.find(d => d.id === activeId);
  const docName = activeDoc?.name || "Untitled";
  const setDocName = useEditorStore((state) => state.setDocName);

  const handleStartRename = () => {
    setLocalNameInput(docName);
    setIsEditingName(true);
  };

  const handleSaveRename = () => {
    setIsEditingName(false);
    if (localNameInput.trim() === "") {
      setDocName("Untitled", pane);
    } else {
      setDocName(localNameInput.trim(), pane);
    }
  };

  if (isEditingName) {
    return (
      <div className={styles.nameInputWrapper}>
        <Input
          value={localNameInput}
          size="small"
          autoFocus
          className={styles.nameInput}
          onChange={(e) => setLocalNameInput(e.target.value)}
          onBlur={handleSaveRename}
          onPressEnter={handleSaveRename}
        />
      </div>
    );
  }

  return (
    <div className={styles.nameDisplay}>
      <Tooltip title={docName} placement="top">
        <span className={styles.docName}>
          {docName}
        </span>
      </Tooltip>

      <Pencil
        size={14}
        className={styles.editIcon}
        onClick={handleStartRename}
        title="Click to rename"
      />
    </div>
  );
};