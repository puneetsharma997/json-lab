/**
 * dedicated input component for writing jsonpath expressions.
 * connects to the path tester store to read and update the query state.
 * purely handles ui and state bridging; evaluation logic is managed elsewhere.
 */

"use client";

import { Search, Info } from "lucide-react";
import styles from "./QueryInput.module.scss";
import { usePathTesterStore } from "@/store/path-tester.store";
import { Input, Popover } from "antd";

// Query Input component
const QueryInput = () => {

  const query = usePathTesterStore((state) => state.query);
  const setQuery = usePathTesterStore((state) => state.setQuery);

  // structured content for the popover with hint and example
  const popoverContent = (
    <div className={styles.popoverContent}>
      <span className={styles.popoverText}>
        <strong>Hint:</strong>  Use <code className={styles.codeBlock}>$</code> for root, <code className={styles.codeBlock}>*</code> for wildcard, and <code className={styles.codeBlock}>..</code> for deep scan.
      </span>
      <span className={styles.popoverText}>
        <strong>Example:</strong> <code className={styles.codeBlock}>$.store.book[*].title</code>
      </span>
    </div>
  );

  return (
    <div className={styles.queryContainer}>
      <div className={styles.content}>
        <Search className={styles.searchIcon} size={18} />

        <Input
          id="jsonpath-query"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your JSON path query here..."
          allowClear
          variant="borderless"
          size="large"
        />

        <Popover
          placement="top"
          content={popoverContent}
        >
          <Info className={styles.infoIcon} size={18} />
        </Popover>
      </div>
    </div>
  );
};

export default QueryInput;