/**
 * a dynamic and reusable main page component for all format converters.
 * it receives a 'type' prop (yaml, xml, or csv) from the router mapping,
 * and dynamically sets the page headers and passes the context to the workspace.
 */

"use client";

import ToolHeader from "@/shared/ui/ToolHeader/ToolHeader";
import styles from "./ConverterPage.module.scss";
import ConverterWorkspace from "./components/ConverterWorkspace/ConverterWorkspace";

// dynamic converter page handling multiple tool types
const ConverterPage = ({ type }) => {

  // map header titles based on the active converter type
  const titleMap = {
    yaml: "YAML ⇄ JSON",
    xml: "XML ⇄ JSON",
    csv: "CSV ⇄ JSON",
  };

  // map header descriptions based on the active converter type
  const descMap = {
    yaml: "Convert between YAML and JSON format seamlessly with bi-directional syncing.",
    xml: "Convert between XML and JSON format seamlessly with bi-directional syncing.",
    csv: "Convert between CSV and JSON format seamlessly with bi-directional syncing.",
  };

  return (
    <section className={styles.page}>
      <ToolHeader
        title={titleMap[type]}
        description={descMap[type]}
        highlight="JSON"
      />

      <div className={styles.workspaceContainer}>
        <ConverterWorkspace type={type} />
      </div>
    </section>
  );
};

export default ConverterPage;