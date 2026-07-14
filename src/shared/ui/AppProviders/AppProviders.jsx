/**
 * global context provider wrapping the entire next.js application.
 * configures ant design's ConfigProvider and App contexts.
 * securely handles client-side theme switching (light/dark/system) via css variables
 * and safely prevents ssr hydration flickering using the useMounted hook.
 */

"use client"

import { lightTheme, darkTheme } from "@/config/antd-theme";
import { App, ConfigProvider } from "antd";
import { useEffect } from "react";
import { useMounted } from "@/shared/hooks/useMounted";
import { useResolvedTheme } from "@/shared/hooks/useResolvedTheme";

const AppProviders = ({ children }) => {
  const mounted = useMounted();
  const resolvedTheme = useResolvedTheme();

  // Root element (HTML tag) par CSS variables activate karne ke liye theme lagana
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme, mounted]);

  // Server-side rendering ke time flicker rokne ke liye
  if (!mounted) {
    return (
      <ConfigProvider theme={lightTheme}>
        <App
          notification={{ top: 75, maxCount: 5 }}
        >
          {children}
        </App>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
      <App
        notification={{ top: 75, maxCount: 5 }}
      >
        {children}
      </App>
    </ConfigProvider>
  );
}

export default AppProviders;