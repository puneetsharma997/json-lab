/**
 * a dynamic and reusable main page component for all code generators.
 * it receives a 'type' prop (ts, zod, or schema) from the router mapping,
 * dynamically sets the page headers, and wraps the generator workspace.
 */

"use client";

import ToolHeader from "@/shared/ui/ToolHeader/ToolHeader";
import styles from "./GeneratorPage.module.scss";
import GeneratorWorkspace from "./components/GeneratorWorkspace/GeneratorWorkspace";

// dynamic generator page handling multiple tool types
const GeneratorPage = ({ type }) => {

  // map header titles based on the active generator type
  const titleMap = {
    ts: "JSON ➔ TypeScript",
    zod: "JSON ➔ Zod Schema",
    schema: "JSON ➔ JSON Schema",
  };

  // map header descriptions based on the active generator type
  const descMap = {
    ts: "Instantly generate strict TypeScript interfaces from your JSON data.",
    zod: "Generate robust Zod validation schemas directly from raw JSON objects.",
    schema: "Convert your JSON data into a standard JSON Schema (Draft-07) format.",
  };

  return (
    <section className={styles.page}>
      <ToolHeader
        title={titleMap[type]}
        description={descMap[type]}
        highlight="JSON"
      />

      <div className={styles.workspaceContainer}>
        <GeneratorWorkspace type={type} />
      </div>
    </section>
  );
};

export default GeneratorPage;