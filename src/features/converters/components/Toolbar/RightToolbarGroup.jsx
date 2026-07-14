/**
 * ui component for the right section of the converter toolbar.
 * renders json-specific action buttons, including file management,
 * global workspace clearing, and node structure commands (expand/collapse).
 */

import { Button, Dropdown, Tooltip } from "antd";
import { ChevronDown } from "lucide-react";
import styles from "./Toolbar.module.scss";
import { rightToolbarActions } from "../../config/toolbar-actions";

// Right Toolbar Group component
export const RightToolbarGroup = ({ onActionClick, onDropdownClick }) => {

  return (
    <div className={styles.rightGroup}>
      {rightToolbarActions.map((item, index) => {
        const Icon = item.icon;
        let tooltipLabel = item.tooltip;
        let buttonLabel = item.label;

        if (item.key === "open") {
          tooltipLabel = "Upload .json File";
          buttonLabel = "Open JSON";
        }
        else if (item.key === "save") {
          tooltipLabel = "Download as .json";
        }
        else if (item.key === "clear") {
          tooltipLabel = "Clear Both Editors";
        }

        if (item.isDropdown) {
          return (
            <Dropdown
              key={index}
              menu={{
                items: item.items,
                onClick: (e) => onDropdownClick(e.key),
              }}
              trigger={["click"]}
            >
              <Button
                className={styles.toolbarBtn}
                type="text"
                icon={<Icon size={16} />}
              >
                <span className={styles.btnText}>
                  {item.label}
                </span>
                <ChevronDown size={14} style={{ marginLeft: 2 }} />
              </Button>
            </Dropdown>
          );
        }

        return (
          <Tooltip key={index} title={tooltipLabel}>
            <Button
              type="text"
              danger={item.key === "clear"}
              icon={<Icon size={16} />}
              onClick={() => onActionClick(item.key)}
              className={styles.toolbarBtn}
            >
              <span className={styles.btnText}>
                {buttonLabel}
              </span>
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};