/**
 * global top navigation header component.
 * houses the application branding (logo), global debounced tool search,
 * a categorized dropdown menu for quick feature access, and the theme toggler.
 */

"use client"

import { toolNavigation } from "@/config/tool-navigation";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.scss";
import { Button, Dropdown } from "antd";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getToolById } from "@/shared/utils/tool-navigation";
import ToolSearch from "../ToolSearch/ToolSearch";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const dropdownItems = toolNavigation.flatMap((section) => [
    {
      key: section.category,
      type: "group",
      label: section.category,
      children: section.items.map((item) => {
        const isActive = pathname === item.path;

        return {
          key: item.id,
          className: isActive ? styles.activeDropdownItem : "",
          label: (
            <div className={styles.menuItem}>
              <item.icon
                size={16}
                className={isActive ? styles.activeMenuText : ""}
              />

              <span
                className={`${styles.featureTitle} ${isActive ? styles.activeMenuText : ""}`}
              >
                {item.title}
              </span>
            </div>
          ),
        }
      }),
    },
  ])

  return (
    <header className={styles.navbar}>
      <Logo />

      <div className={styles.searchWrapper}>
        <ToolSearch key={pathname} />
      </div>

      <div className={styles.actions}>
        <Dropdown
          menu={{
            items: dropdownItems,
            onClick: ({ key }) => {
              const selectedTool = getToolById(String(key));

              if (selectedTool) {
                router.push(selectedTool.path);
              }
            },
          }}
          trigger={["click"]}
        >
          <Button type="text">
            <span className={styles.featureText}>Features</span>
            <ChevronDown size={18} />
          </Button>
        </Dropdown>
      </div>

      <div className={styles.themeToggleBtn}>
        <ThemeToggle />
      </div>

    </header>
  );
};

export default Navbar;