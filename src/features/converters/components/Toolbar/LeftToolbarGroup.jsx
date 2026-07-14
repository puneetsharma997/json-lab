/**
 * ui component for the left section of the converter toolbar.
 * dynamically maps and renders action buttons (upload, save)
 * tailored specifically to the active source format (yaml, xml, or csv).
 */

import { Button, Tooltip } from "antd";
import styles from "./Toolbar.module.scss";
import { leftToolbarActions } from "../../config/toolbar-actions";

// Left Toolbar Group Component
export const LeftToolbarGroup = ({ type, onActionClick }) => {

  return (
    <div className={styles.leftGroup}>
      {leftToolbarActions.map((item, index) => {
        const Icon = item.icon;
        const tooltipLabel = item.key === "open" ? `Upload .${type} File` : `Download as .${type}`;
        const buttonLabel = item.key === "open" ? `Open ${type.toUpperCase()}` : "Save";

        return (
          <Tooltip title={tooltipLabel} key={index}>
            <Button
              type="text"
              icon={<Icon size={16} />}
              onClick={() => onActionClick(item.key)}
              className={styles.toolbarBtn}
            >
              <span className={styles.btnText}>{buttonLabel}</span>
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};