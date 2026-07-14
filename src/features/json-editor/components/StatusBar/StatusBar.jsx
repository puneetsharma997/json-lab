"use client";

import { useEditorStore } from "@/store/editor.store";
import styles from "./StatusBar.module.scss";
import { useDeferredValue, useMemo } from "react";
import { getJsonStatistics } from "@/shared/utils/json/get-json-statistics";
import { Button } from "antd";
import { ChevronUp, ChevronDown } from "lucide-react";

const StatusBar = ({ pane = "left" }) => {

  // read documents and determine the active ID based on the pane
  const documents = useEditorStore((state) => state.documents);
  const activeId = useEditorStore((state) =>
    pane === "left" ? state.leftActiveId : state.rightActiveId
  );

  // retrieve the document assigned to this specific pane
  const activeDoc = documents.find((d) => d.id === activeId);

  const editorValue = activeDoc?.content || "";
  const deferredValue = useDeferredValue(editorValue);

  const isCompareMode = useEditorStore((state) => state.isCompareMode);
  const diffBlocks = useEditorStore((state) => state.diffBlocks);
  const activeDiffIndex = useEditorStore((state) => state.activeDiffIndex);
  const goToNextDiff = useEditorStore((state) => state.goToNextDiff);
  const goToPrevDiff = useEditorStore((state) => state.goToPrevDiff);

  // Recalculate only when defferedValue changes
  const statistics = useMemo(() => {
    return getJsonStatistics(deferredValue);
  }, [deferredValue]);

  const statusItems = [
    { label: "Characters", value: statistics.characters },
    { label: "Objects", value: statistics.objects },
    { label: "Arrays", value: statistics.arrays },
  ];

  return (
    <footer className={styles.statusBar}>
      {statusItems.map((item) => (
        <div key={item.label} className={styles.section}>
          <span className={styles.label}>{item.label}:</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}

      {/* render navigation block ONLY in right pane when Compare is active */}
      {isCompareMode && pane === "right" && diffBlocks.length > 0 && (
        <div className={styles.diffNavigation}>
          <span className={styles.diffCountText}>
            {activeDiffIndex} / {diffBlocks.length} Difference{diffBlocks.length > 1 ? "s" : ""}
          </span>
          <Button type="text" className={styles.statusBarBtn} icon={<ChevronUp size={20} />} onClick={goToPrevDiff} />
          <Button type="text" className={styles.statusBarBtn} icon={<ChevronDown size={20} />} onClick={goToNextDiff} />
        </div>
      )}
    </footer>
  );
};

export default StatusBar;