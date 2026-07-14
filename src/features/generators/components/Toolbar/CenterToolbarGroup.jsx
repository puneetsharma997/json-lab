import { Button, Switch, Tooltip } from "antd";
import { ArrowRight } from "lucide-react";
import styles from "./Toolbar.module.scss";

// CenterToolbar Group component
export const CenterToolbarGroup = ({ type, autoGenerate, toggleAutoGenerate, triggerManualGenerate }) => {

  const tooltipLabel = type === "ts" ? "Typescript" : type === "schema" ? "JSON Schema" : "Zod Schema"

  return (
    <div className={styles.centerGroup}>
      <div className={styles.syncToggle}>
        <span className={styles.btnText}>Auto-Generate</span>
        <Switch size="small" checked={autoGenerate} onChange={toggleAutoGenerate} />
      </div>

      {!autoGenerate && (
        <Tooltip title={`Generate JSON to ${tooltipLabel}`}>
          <Button
            type="primary" ghost size="small"
            icon={<ArrowRight size={14} />}
            onClick={triggerManualGenerate}
          >
            Generate
          </Button>
        </Tooltip>
      )}
    </div>
  );
};