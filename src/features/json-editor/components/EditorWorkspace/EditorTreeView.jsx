/**
 * main tree view component for the json editor workspace.
 * it renders a hierarchical tree representation of the json data,
 * utilizing custom hooks for structural commands and semantic diff highlighting.
 */

"use client";

import { useEditorStore } from "@/store/editor.store";
import { JSONTree } from "react-json-tree";
import styles from "./EditorWorkspace.module.scss";
import { safeJsonParse } from "@/shared/utils/json/safe-json-parse";
import { useTreeCommands } from "../../hooks/useTreeCommands";
import { useTreeDiffHighlighter } from "../../hooks/useTreeDiffHighlighter";

// custom theme to match Monaco/VS Code style colors
const baseColors = {
  scheme: 'custom',
  author: 'json-editor',
  base00: 'transparent',            // Background color
  base02: 'var(--text-secondary)',  // [] Items counts color
  base03: 'var(--text-secondary)',  // [] Items counts color
  base05: 'var(--value-color)',     // Default text
  base08: 'var(--value-color)',     // Strings
  base09: 'var(--value-color)',     // Numbers/Booleans
  base0A: 'var(--value-color)',     // Null
  base0B: 'var(--value-color)',     // Values
  base0D: 'var(--key-color)',       // Keys
};

//  Editor Tree View component
const EditorTreeView = ({ pane = "left" }) => {
  const documents = useEditorStore((state) => state.documents);

  const leftActiveId = useEditorStore((state) => state.leftActiveId);
  const rightActiveId = useEditorStore((state) => state.rightActiveId);

  // fetch both documents for diffing
  const leftDoc = documents.find((d) => d.id === leftActiveId);
  const rightDoc = documents.find((d) => d.id === rightActiveId);
  const editorValue = pane === "left" ? leftDoc?.content : rightDoc?.content;

  const jsonData = safeJsonParse(editorValue);

  const { treeKey, expandLevel } = useTreeCommands(pane);
  const { labelRenderer, valueRenderer } = useTreeDiffHighlighter(pane, leftDoc, rightDoc);

  return (
    <div
      className={styles.treeContainer}
      style={{
        height: "100%",
        width: "100%",
        padding: "1rem 1.5rem",
        overflow: "auto",
        backgroundColor: "var(--bg-paper)",
        fontFamily: "'Consolas', 'Courier New', monospace",
        fontSize: "1rem",
      }}
    >
      <JSONTree
        key={treeKey}
        data={jsonData}
        theme={baseColors}
        invertTheme={false}
        hideRoot={false}
        shouldExpandNodeInitially={(keyPath, data, level) => level < expandLevel}

        // show [] Items counts in secondary color when collapsed
        getItemString={(type, data, itemType, itemString) => (
          <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>
            {itemType} {itemString}
          </span>
        )}

        // inject highlighted keys and values
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
      />
    </div>
  );
};

export default EditorTreeView;