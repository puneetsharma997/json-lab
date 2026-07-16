import { Button, Dropdown, Tooltip } from "antd";
import { ChevronDown } from "lucide-react";
import styles from "./Toolbar.module.scss";
import { leftToolbarActions } from "../../config/toolbar-actions";

// LeftToolbar Group component
export const LeftToolbarGroup = ({ onActionClick, onDropdownClick }) => {
  return (
    <div className={styles.leftGroup}>
      {leftToolbarActions.map((item, index) => {
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
          <Tooltip title={item.tooltip} key={index}>
            <Button
              type="text"
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