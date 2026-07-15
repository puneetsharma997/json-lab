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
import { usePathname } from "next/navigation";
import ToolSearch from "../ToolSearch/ToolSearch";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Link from "next/link";

const Navbar = () => {
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
            <Link
              href={item.path}
              className={styles.menuItem}
              style={{ display: "flex", width: "100%", textDecoration: "none" }}
            >
              <item.icon
                size={16}
                className={isActive ? styles.activeMenuText : ""}
              />
              <span
                className={`${styles.featureTitle} ${isActive ? styles.activeMenuText : ""}`}
              >
                {item.title}
              </span>
            </Link>
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
          menu={{ items: dropdownItems }}
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