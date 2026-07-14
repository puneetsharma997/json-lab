/**
 * utility function to compute text differences between two strings.
 * it uses the 'diff' library to generate line-by-line highlight decorations,
 * and groups contiguous changes into 'blocks' for smart up/down navigation.
 * this function is kept pure (no react states) for maximum performance and testing.
 */

import * as Diff from "diff";

// function to compute text difference for json editor - text mode
export const computeTextDiff = (leftValue, rightValue, pane) => {
  const changes = Diff.diffLines(leftValue, rightValue, { ignoreWhitespace: true });

  const decorations = [];
  const blocks = [];
  let lLine = 1;
  let rLine = 1;
  let currentBlock = null;

  // track contiguous changes to group them into a single block
  changes.forEach((part) => {
    if (part.removed || part.added) {

      // start a new block if no active block exists for current contiguous changes
      if (!currentBlock) {
        currentBlock = {
          targetPane: part.added ? 'right' : 'left',
          leftLine: lLine,
          rightLine: rLine
        };
        blocks.push(currentBlock);
      }

      // update the block's left line number to focus on the last removed line
      if (part.removed) {
        currentBlock.leftLine = lLine + part.count - 1;
      }

      // update the block's right line number to focus on the last added line
      if (part.added) {
        currentBlock.rightLine = rLine + part.count - 1;
      }

      // inject red highlight decoration for removed lines in the left pane
      if (part.removed) {
        if (pane === "left") {
          decorations.push({
            range: { startLineNumber: lLine, startColumn: 1, endLineNumber: lLine + part.count - 1, endColumn: 1 },
            options: { isWholeLine: true, className: "diff-removed-line" },
          });
        }
        lLine += part.count;
      }

      // inject green highlight decoration for added lines in the right pane
      if (part.added) {
        if (pane === "right") {
          decorations.push({
            range: { startLineNumber: rLine, startColumn: 1, endLineNumber: rLine + part.count - 1, endColumn: 1 },
            options: { isWholeLine: true, className: "diff-added-line" },
          });
        }
        rLine += part.count;
      }
    }
    // close the current block when encountering unchanged text lines
    else {
      currentBlock = null;
      lLine += part.count;
      rLine += part.count;
    }
  });

  return { decorations, blocks };
};