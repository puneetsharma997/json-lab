/**
 * wrapper page component for the jsonpath tester utility tool.
 * dynamically sets the page headers, and wraps the path tester workspace.
 */

"use client";

import ToolHeader from "@/shared/ui/ToolHeader/ToolHeader";
import styles from "./JSONPathTesterPage.module.scss";
import PathTesterWorkspace from "./components/PathTesterWorkspace/PathTesterWorkspace";

// JSON Path Tester Page component
const JSONPathTesterPage = () => {

  return (
    <section className={styles.page}>
      <ToolHeader
        title="JSON Path Tester"
        description="Query and extract specific data from your JSON using robust JSONPath expressions."
        highlight="JSON"
      />

      <div className={styles.workspaceContainer}>
        <PathTesterWorkspace />
      </div>
    </section>
  );
};

export default JSONPathTesterPage;