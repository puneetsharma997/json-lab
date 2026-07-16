import { Button, Dropdown, Tooltip } from "antd";
import { ChevronDown } from "lucide-react";
import styles from "./Toolbar.module.scss";
import { rightToolbarActions } from "../../config/toolbar-actions";

// RightToolbar Group component
export const RightToolbarGroup = ({ onActionClick, onDropdownClick }) => {
  return (
    <div className={styles.rightGroup}>
      {rightToolbarActions.map((item, index) => {
        const Icon = item.icon;

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
              <Button className={styles.toolbarBtn} type="text" icon={<Icon size={16} />}>
                <span className={styles.btnText}>{item.label}</span>
                <ChevronDown size={14} style={{ marginLeft: 2 }} />
              </Button>
            </Dropdown>
          );
        }

        return (
          <Tooltip key={index} title={item.tooltip}>
            <Button
              type="text"
              danger={item.danger}
              icon={<Icon size={16} />}
              onClick={() => onActionClick(item.key)}
              className={styles.toolbarBtn}
            >
              <span className={styles.btnText}>{item.label}</span>
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};