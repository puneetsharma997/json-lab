/**
 * a generic, reusable dual-sided status bar component.
 * computes lines and characters, and displays validation status.
 * totally detached from any specific store (controlled via props).
 */

"use client";

import styles from "./BaseStatusBar.module.scss";

// Base StatusBar component
const BaseStatusBar = ({
  leftLabel,
  rightLabel,
  leftValue = "",
  rightValue = "",
  leftError = null,
  rightError = null
}) => {

  // calculate basic metrics for the left pane
  const leftChars = leftValue.length;
  const leftLines = leftValue ? leftValue.split("\n").length : 0;

  // calculate basic metrics for the right pane
  const rightChars = rightValue.length;
  const rightLines = rightValue ? rightValue.split("\n").length : 0;

  return (
    <footer className={styles.statusBar}>

      {/* left pane status */}
      <div className={styles.statusSection}>
        {leftError ? (
          <span className={styles.errorText}>❌ Invalid {leftLabel}</span>
        ) : (
          <span className={styles.successText}>✅ Valid {leftLabel}</span>
        )}
        <span className={styles.metricText}>
          {leftLines} Lines, {leftChars} Chars
        </span>
      </div>

      {/* right pane status */}
      <div className={styles.statusSection}>
        {rightError ? (
          <span className={styles.errorText}>❌ Invalid {rightLabel}</span>
        ) : (
          <span className={styles.successText}>✅ Valid {rightLabel}</span>
        )}
        <span className={styles.metricText}>
          {rightLines} Lines, {rightChars} Chars
        </span>
      </div>
    </footer>
  );
};

export default BaseStatusBar;