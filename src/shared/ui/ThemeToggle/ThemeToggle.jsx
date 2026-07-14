/**
 * interactive dropdown component allowing users to switch application themes.
 * supports light, dark, and system preferences, persisting the choice globally
 * via the zustand theme store. safely defers rendering until client-side mount.
 */

"use client";

import { Button, Dropdown } from "antd";
import { Moon, Sun, Monitor } from "lucide-react";
import { useThemeStore } from "@/store/theme.store";
import { useMounted } from "@/shared/hooks/useMounted";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();
  const mounted = useMounted();

  if (!mounted) return <Button type="text" style={{ width: 32, height: 32 }} />;

  const items = [
    { key: "light", label: "Light", icon: <Sun size={16} /> },
    { key: "dark", label: "Dark", icon: <Moon size={16} /> },
    { key: "system", label: "System", icon: <Monitor size={16} /> },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => setTheme(key),
        selectable: true,
        defaultSelectedKeys: [theme],
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button
        type="text"
        icon={theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
      />
    </Dropdown>
  );
};

export default ThemeToggle;