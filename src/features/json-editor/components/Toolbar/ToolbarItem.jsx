"use client";

import { Button, Dropdown, Tooltip } from "antd";
import { ChevronDown } from "lucide-react";
import styles from "./Toolbar.module.scss";

// render a single toolbar item as either a dropdown or a standard button
export const ToolbarItem = ({ action, onDropdownClick, onActionClick }) => {
  const Icon = action.icon;

  // render dropdown menu if the action has nested items
  if (action.isDropdown) {
    return (
      <Dropdown
        menu={{
          items: action.items,
          onClick: (e) => onDropdownClick(e.key),
        }}
        trigger={["click"]}
      >
        <Button className={styles.toolbarBtn} type="text" icon={<Icon size={16} />}>
          <span className={styles.btnText}>{action.label}</span>
          <ChevronDown size={14} style={{ marginLeft: 2 }} />
        </Button>
      </Dropdown>
    );
  }

  // render standard tooltip button for single-click actions
  return (
    <Tooltip
      title={action.tooltip}
    >
      <Button
        type="text"
        danger={action.danger}
        icon={<Icon size={16} />}
        onClick={() => onActionClick(action.key)}
        className={styles.toolbarBtn}
      >
        <span className={styles.btnText}>{action.label}</span>
      </Button>
    </Tooltip>
  );
};