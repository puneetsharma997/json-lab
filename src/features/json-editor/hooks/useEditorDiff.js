/**
 * custom hook to manage diff calculations and UI highlights for the text editor.
 * it bridges the pure utility function with the monaco editor instance,
 * applying red/green decorations and managing smooth scrolling between difference blocks.
 */

import { useEffect } from "react";
import { useEditorStore } from "@/store/editor.store";
import { computeTextDiff } from "@/shared/utils/json/compute-text-diff";

export const useEditorDiff = (editorRef, decorationsCollectionRef, isEditorReady, pane, leftValue, rightValue) => {

  const isCompareMode = useEditorStore((state) => state.isCompareMode);
  const setDiffBlocks = useEditorStore((state) => state.setDiffBlocks);
  const compareNavigate = useEditorStore((state) => state.compareNavigate);

  // scroll both editors to the exact diff line during next/prev navigation
  useEffect(() => {
    if (compareNavigate && editorRef.current && isCompareMode) {
      const targetLine = pane === "left" ? compareNavigate.leftLine : compareNavigate.rightLine;

      editorRef.current.revealLineInCenter(targetLine);

      // give focus to the cursor only for the active targeted pane
      if (compareNavigate.targetPane === pane) {
        // get text length so that cursor should show at the end
        const model = editorRef.current.getModel();
        const maxColumn = model ? model.getLineMaxColumn(targetLine) : 1;

        editorRef.current.setPosition({ lineNumber: targetLine, column: maxColumn });
        editorRef.current.focus();
      }
    }
  }, [compareNavigate, pane, isCompareMode, editorRef]);

  // compute diffs and update monaco editor highlights when values change
  useEffect(() => {
    if (!isEditorReady || !editorRef.current || !decorationsCollectionRef.current) return;

    if (!isCompareMode) {
      decorationsCollectionRef.current.clear();
      if (pane === "left") setDiffBlocks([]);
      return;
    }

    // extract text difference blocks and decorations
    const { decorations, blocks } = computeTextDiff(leftValue, rightValue, pane);

    // apply the newly computed color highlights to the monaco editor
    decorationsCollectionRef.current.set(decorations);

    // save blocks to global store strictly from the left pane to prevent double dispatching
    if (pane === "left") {
      setDiffBlocks(blocks);
    }

  }, [leftValue, rightValue, isCompareMode, isEditorReady, pane, decorationsCollectionRef, editorRef, setDiffBlocks]);
};