/**
 * a generic, highly reusable validation ui panel for JSON.
 * computes diagnostics and exposes callbacks for repair and navigation.
 * totally detached from any specific store.
 */

"use client";

import { Button } from "antd";
import { Eye, WandSparkles } from "lucide-react";
import styles from "./BaseValidationPanel.module.scss";
import { useDeferredValue, useMemo } from "react";
import { getJsonDiagnostics } from "@/shared/utils/json/get-json-diagnostics";
import { repairJson } from "@/shared/utils/json/repair-json";
import { useApp } from "@/shared/hooks/useApp";

// Base Validation Panel component
const BaseValidationPanel = ({ value, onRepair, onShowError }) => {
  const { message } = useApp();

  // defer the value to avoid blocking the main thread while typing
  const deferredValue = useDeferredValue(value);

  // recompute validation only when the deferred text actually changes
  const diagnostic = useMemo(() => {
    if (!deferredValue || !deferredValue.trim()) {
      return { isValid: true };
    }

    return getJsonDiagnostics(deferredValue);
  }, [deferredValue]);

  // trigger the parent's navigation callback
  const handleShowClick = () => {
    if (diagnostic.line && diagnostic.column && onShowError) {
      onShowError(diagnostic.line, diagnostic.column);
    }
  };

  // attempt auto-repair and pass the result back to the parent
  const handleAutoRepair = () => {
    const result = repairJson(value);
    if (result.success) {
      if (onRepair) onRepair(result.repairedJson);
    }
    else {
      message.error(result.error);
    }
  };

  // hide panel if JSON is valid
  if (diagnostic.isValid) {
    return null;
  }

  return (
    <section className={styles.panel}>
      <div className={styles.errorInfo}>
        <p className={styles.message}>❌ {diagnostic.message}</p>

        {diagnostic.line && diagnostic.column && (
          <span className={styles.location}>
            (Line: {diagnostic.line}, Column: {diagnostic.column})
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          type="primary"
          danger icon={<WandSparkles size={16} />}
          onClick={handleAutoRepair}
          size="medium"
        >
          Auto Repair
        </Button>

        <Button
          danger icon={<Eye size={16} />}
          onClick={handleShowClick}
          size="medium"
        >
          Show
        </Button>
      </div>
    </section>
  );
};

export default BaseValidationPanel;