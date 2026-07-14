/**
 * global autocomplete search input for navigating application features.
 * implements a debounced search mechanism (300ms delay) to optimize performance,
 * filtering through the tool configuration and handling empty states gracefully.
 */

"use client";

import { AutoComplete, Input } from "antd";
import styles from "./ToolSearch.module.scss";
import { useEffect, useMemo, useState } from "react";
import { searchTools } from "@/shared/utils/search-tools";
import { useRouter } from "next/navigation";

const ToolSearch = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // to debounce the search input
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(searchValue.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    }
  }, [searchValue]);

  // searched options results
  const options = useMemo(() => {
    const filteredTools = searchTools(debouncedValue);

    if (debouncedValue && !filteredTools.length) {
      return [
        {
          value: "__no_results__",
          label: (
            <div className={styles.emptyState}>
              <span className={styles.emptyTitle}>
                No tools found
              </span>

              <span className={styles.emptyDescription}>
                Try another keyword.
              </span>
            </div>
          ),
        },
      ];
    }

    return filteredTools.map((tool) => ({
      value: tool.id,
      label: (
        <div className={styles.option}>
          <div className={styles.iconWrapper}>
            <tool.icon size={18} />
          </div>

          <div className={styles.optionContent}>
            <span className={styles.optionTitle}>
              {tool.title}
            </span>

            <span className={styles.optionDescription}>
              {tool.description}
            </span>
          </div>
        </div>
      ),
    }));

  }, [debouncedValue]);

  return (
    <AutoComplete
      className={styles.search}
      options={options}
      value={searchValue}
      showSearch={{ onSearch: setSearchValue }}
      onSelect={(value) => {
        if (value === "__no_results__") {
          return;
        }

        const selectedTool = searchTools(debouncedValue).find(
          (tool) => tool.id === value
        );

        if (!selectedTool) {
          return;
        }

        router.push(selectedTool.path);
        setSearchValue("");
        setDebouncedValue("");
      }}
    >
      <Input.Search
        allowClear
        placeholder="Search tools..."
        size="large"
      />
    </AutoComplete>
  );
};

export default ToolSearch;