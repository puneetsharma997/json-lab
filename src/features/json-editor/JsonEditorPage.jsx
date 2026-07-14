"use client"

import styles from "./JsonEditorPage.module.scss";
import ToolHeader from "@/shared/ui/ToolHeader/ToolHeader";
import EditorWorkspace from "./components/EditorWorkspace/EditorWorkspace";
import { useEditorStore } from "@/store/editor.store";
import dynamic from "next/dynamic";
import { Pane } from "react-split-pane";
import "react-split-pane/styles.css";

const SplitPane = dynamic(
  () => import("react-split-pane").then((mod) => mod.default || mod.SplitPane),
  { ssr: false }
);

// Json Editor Page Component
const JsonEditorPage = () => {
  const isCompareMode = useEditorStore((state) => state.isCompareMode);

  return (
    <section className={`${styles.page} ${isCompareMode ? styles.compareMode : styles.singleMode}`}>

      <ToolHeader
        title="JSON Editor"
        description="Edit, format, validate and inspect JSON."
        highlight="JSON"
      />

      <div className={styles.editorContainer}>
        {isCompareMode ? (
          <SplitPane
            split="vertical"
          >
            <Pane defaultSize="50%" minSize="20%">
              <EditorWorkspace pane="left" />
            </Pane>

            <Pane defaultSize="50%" minSize="20%">
              <EditorWorkspace pane="right" />
            </Pane>
          </SplitPane>
        ) :
          (
            <EditorWorkspace pane="left" />
          )
        }
      </div>
    </section>
  );
};

export default JsonEditorPage;