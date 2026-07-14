import { Button, Tooltip } from "antd";
import styles from "./Toolbar.module.scss";
import { rightToolbarActions } from "../../config/toolbar-actions";

// RightToolbar Group component
export const RightToolbarGroup = ({ type, onActionClick }) => {
  return (
    <div className={styles.rightGroup}>
      {rightToolbarActions.map((item, index) => {
        const Icon = item.icon;

        const tooltip = item.key === "save"
          ? `Download as ${type === "ts" ? ".ts" : ".json"}`
          : item.tooltip;

        return (
          <Tooltip key={index} title={tooltip}>
            <Button
              type="text"
              danger={item.danger}
              icon={<Icon size={16} />}
              onClick={() => onActionClick(item.key)}
              className={styles.toolbarBtn}
            >
              <span className={styles.btnText}>
                {item.label}
              </span>
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};