/**
 * ui component for the central section of the converter toolbar.
 * manages the auto-conversion toggle switch and provides manual
 * conversion triggers (left-to-right and right-to-left) when auto-sync is disabled.
 */

import { Button, Switch, Tooltip } from "antd";
import { ArrowRight, ArrowLeft } from "lucide-react";
import styles from "./Toolbar.module.scss";

// Center Toolbar Group component
export const CenterToolbarGroup = ({ type, autoConvert, toggleAutoConvert, convertLeftToRight, convertRightToLeft }) => {

  return (
    <div className={styles.centerGroup}>
      {!autoConvert && (
        <Tooltip title={`Convert ${type.toUpperCase()} to JSON`}>
          <Button
            type="primary" ghost size="small"
            icon={<ArrowRight size={14} />}
            onClick={convertLeftToRight}
          >
            Convert
          </Button>
        </Tooltip>
      )}

      <div className={styles.syncToggle}>
        <span className={styles.btnText}>Auto-Convert</span>
        <Switch size="small" checked={autoConvert} onChange={toggleAutoConvert} />
      </div>

      {!autoConvert && (
        <Tooltip title={`Convert JSON to ${type.toUpperCase()}`}>
          <Button
            type="primary" ghost size="small"
            icon={<ArrowLeft size={14} />}
            onClick={convertRightToLeft}
          >
            Convert
          </Button>
        </Tooltip>
      )}
    </div>
  );
};