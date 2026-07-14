/**
 * custom hook that bridges deep-diff logic with react-json-tree renderers.
 * it calculates structural differences between two json objects,
 * prepares block data for navigation, handles smooth scrolling to diffs,
 * and generates the custom render functions for highlighting keys and values.
 */

import { useEffect, useMemo } from "react";
import { useEditorStore } from "@/store/editor.store";
import { diff } from "deep-diff";
import { safeJsonParse } from "@/shared/utils/json/safe-json-parse";

export const useTreeDiffHighlighter = (pane, leftDoc, rightDoc) => {

  const isCompareMode = useEditorStore((state) => state.isCompareMode);
  const setDiffBlocks = useEditorStore((state) => state.setDiffBlocks);
  const compareNavigate = useEditorStore((state) => state.compareNavigate);

  // parse left and right documents safely for comparison
  const leftParsed = useMemo(() => safeJsonParse(leftDoc?.content), [leftDoc?.content]);

  const rightParsed = useMemo(() => safeJsonParse(rightDoc?.content), [rightDoc?.content]);

  // calculate deep diffs only when compare mode is active
  const diffs = useMemo(() => {
    if (!isCompareMode) return [];

    return diff(leftParsed, rightParsed) || [];
  }, [isCompareMode, leftParsed, rightParsed]);

  // map differences to navigation blocks and save to global store from left pane only
  useEffect(() => {
    if (isCompareMode && pane === "left") {
      const blocks = diffs.map((d, i) => {
        return {
          targetPane: d.kind === "N" ? "right" : "left",
          treeLeftId: `tree-left-diff-${i}`,
          treeRightId: `tree-right-diff-${i}`,
        }
      });
      setDiffBlocks(blocks);
    }
  }, [diffs, isCompareMode, pane, setDiffBlocks]);

  // listen to navigation commands and trigger smooth scrolling with flash effect
  useEffect(() => {
    if (isCompareMode && compareNavigate) {
      const targetId = pane === "left" ? compareNavigate.treeLeftId : compareNavigate.treeRightId;

      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });

          // apply temporary visual flash effect to draw user attention
          el.style.outline = "2px solid var(--text-secondary)";
          setTimeout(() => { el.style.outline = "none"; }, 1500);
        }
      }
    }
  }, [compareNavigate, isCompareMode, pane]);

  // helper function to check if current tree node path matches any diff path
  const getDiffIndexForPath = (keyPath) => {
    // react-json-tree passes path reversed (e.g., ["name", "user", "root"])
    const normalizedTreePath = [...keyPath].reverse().filter((k) => k !== "root").map(String);

    return diffs.findIndex((d) => {
      const diffPath = d.path ? [...d.path] : [];
      // deep-diff puts the index outside the path array sometimes
      if (d.kind === "A" && d.index !== undefined) diffPath.push(d.index);

      const normalizedDiffPath = diffPath.map(String);
      if (normalizedTreePath.length !== normalizedDiffPath.length) return false;

      // strictly compare both paths
      return normalizedTreePath.every((key, i) => key === normalizedDiffPath[i]);
    });
  };

  // function to wrap tree nodes with highlighting spans based on differences
  const renderWithDiffHighlight = (keyPath, content) => {
    if (!isCompareMode) return content;

    const diffIndex = getDiffIndexForPath(keyPath);
    if (diffIndex === -1) return content;

    const d = diffs[diffIndex];
    let bgColor = "transparent";
    let diffId = null;

    // define red background for removals/edits on left pane
    // D = Deleted, E = Edited, A = Array Change, N = New
    if (pane === "left" && (d.kind === "D" || d.kind === "E" || d.kind === "A")) {
      bgColor = "rgba(239, 68, 68, 0.2)";
      diffId = `tree-left-diff-${diffIndex}`;
    }

    // define green background for additions/edits on right pane
    else if (pane === "right" && (d.kind === "N" || d.kind === "E" || d.kind === "A")) {
      bgColor = "rgba(34, 197, 94, 0.2)";
      diffId = `tree-right-diff-${diffIndex}`;
    }

    // wrap content in styled span if a background color was determined
    if (bgColor !== "transparent") {
      return (
        <span
          id={diffId}
          style={{
            backgroundColor: bgColor,
            borderRadius: "2px",
            padding: "0.1rem 0.6rem",
          }}
        >
          {content}
        </span>
      );
    }
    return content;
  };

  // generate custom renderer props required by react-json-tree
  const labelRenderer = (keyPath) => renderWithDiffHighlight(keyPath, <span>{keyPath[0]}:</span>);

  const valueRenderer = (raw, value, ...keyPath) => renderWithDiffHighlight(keyPath, <span>{raw}</span>);

  return { labelRenderer, valueRenderer, isCompareMode };
};