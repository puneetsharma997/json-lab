import { theme } from "antd";

// --- LIGHT MODE COLORS ---
const PURPLE_MAIN = "#7C3AED";       // Violet 600
const PURPLE_HOVER = "#6D28D9";      // Violet 700
const PURPLE_ACTIVE = "#5B21B6";     // Violet 800
const PURPLE_LIGHT_BG = "#EDE9FE";   // Violet 100
const PURPLE_GHOST_HOVER = "rgba(124, 58, 237, 0.08)"; // Transparent hover
const PURPLE_GHOST_ACTIVE = "rgba(124, 58, 237, 0.15)";
const PURPLE_OUTLINE = "rgba(124, 58, 237, 0.2)"; // Focus ring

// --- DARK MODE COLORS (FIXED FOR PREMIUM UI) ---
const PURPLE_DARK_MAIN = "#A78BFA";  // Violet 400
const PURPLE_DARK_HOVER = "#C4B5FD"; // Violet 300
const PURPLE_DARK_ACTIVE = "#8B5CF6"; // Violet 500
const PURPLE_DARK_GHOST_HOVER = "rgba(167, 139, 250, 0.12)"; // Transparent dark hover
const PURPLE_DARK_GHOST_ACTIVE = "rgba(167, 139, 250, 0.2)";
const PURPLE_DARK_OUTLINE = "rgba(167, 139, 250, 0.2)"; // Focus ring dark

export const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Global Colors
    colorPrimary: PURPLE_MAIN,
    colorInfo: PURPLE_MAIN,
    colorLink: PURPLE_MAIN,
    colorLinkHover: PURPLE_HOVER,
    colorLinkActive: PURPLE_ACTIVE,
    borderRadius: 6,
    fontFamily: "var(--font-geist-sans)",

    // Global Backgrounds
    colorBgLayout: "#f8fafc",
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",

    // Global Interactive Tokens
    controlItemBgHover: PURPLE_LIGHT_BG,
    colorBgTextHover: PURPLE_GHOST_HOVER,
    colorBgTextActive: PURPLE_GHOST_ACTIVE,
    colorIconHover: PURPLE_MAIN,
  },

  // Component level overrides
  components: {
    Button: {
      colorPrimary: PURPLE_MAIN,
      colorPrimaryHover: PURPLE_HOVER,
      colorPrimaryActive: PURPLE_ACTIVE,

      textHoverBg: PURPLE_GHOST_HOVER,
      textActiveBg: PURPLE_GHOST_ACTIVE,

      defaultBorderColor: "#d9d9d9",
      defaultColor: "inherit",
    },
    Input: {
      activeBorderColor: PURPLE_MAIN,
      hoverBorderColor: PURPLE_HOVER,
      activeShadow: `0 0 0 2px ${PURPLE_OUTLINE}`,
    },
    Select: {
      activeBorderColor: PURPLE_MAIN,
      hoverBorderColor: PURPLE_HOVER,
      activeShadow: `0 0 0 2px ${PURPLE_OUTLINE}`,
      optionActiveBg: PURPLE_LIGHT_BG,
      optionSelectedBg: PURPLE_LIGHT_BG,
      optionSelectedColor: PURPLE_MAIN,
    },
    Menu: {
      itemHoverBg: PURPLE_LIGHT_BG,
      itemHoverColor: PURPLE_MAIN,
      itemSelectedBg: PURPLE_LIGHT_BG,
      itemSelectedColor: PURPLE_MAIN,
      itemActiveBg: PURPLE_LIGHT_BG,
    },
    Dropdown: {
      controlItemBgHover: PURPLE_LIGHT_BG,
    },
    Modal: {
      colorIconHover: PURPLE_MAIN,
    },
    Popconfirm: {
      colorWarning: "#faad14",
    },
  }
};

export const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Global Colors
    colorPrimary: PURPLE_DARK_MAIN,
    colorInfo: PURPLE_DARK_MAIN,
    colorLink: PURPLE_DARK_MAIN,
    colorLinkHover: PURPLE_DARK_HOVER,
    colorLinkActive: PURPLE_DARK_ACTIVE,
    borderRadius: 6,
    fontFamily: "var(--font-geist-sans)",

    // Dark Mode Global Backgrounds
    colorBgBase: "#121212",
    colorBgContainer: "#1E1E1E",
    colorBgElevated: "#252525",
    colorBorder: "#334155",
    colorTextBase: "#f8fafc",

    // Global Interactive Tokens
    controlItemBgHover: PURPLE_DARK_GHOST_HOVER,
    colorBgTextHover: PURPLE_DARK_GHOST_HOVER,
    colorBgTextActive: PURPLE_DARK_GHOST_ACTIVE,
    colorIconHover: PURPLE_DARK_HOVER,
  },

  // Component level overrides
  components: {
    Button: {
      colorPrimary: PURPLE_DARK_MAIN,
      colorPrimaryHover: PURPLE_DARK_HOVER,
      colorPrimaryActive: PURPLE_DARK_ACTIVE,

      textHoverBg: PURPLE_DARK_GHOST_HOVER,
      textActiveBg: PURPLE_DARK_GHOST_ACTIVE,

      defaultBorderColor: "#334155",
      defaultColor: "#f8fafc",
    },
    Input: {
      activeBorderColor: PURPLE_DARK_MAIN,
      hoverBorderColor: PURPLE_DARK_HOVER,
      activeShadow: `0 0 0 2px ${PURPLE_DARK_OUTLINE}`,
      colorBgContainer: "#121212",
    },
    Select: {
      activeBorderColor: PURPLE_DARK_MAIN,
      hoverBorderColor: PURPLE_DARK_HOVER,
      activeShadow: `0 0 0 2px ${PURPLE_DARK_OUTLINE}`,
      optionActiveBg: PURPLE_DARK_GHOST_HOVER,
      optionSelectedBg: PURPLE_DARK_GHOST_HOVER,
      optionSelectedColor: PURPLE_DARK_MAIN,
      colorBgContainer: "#121212",
    },
    Menu: {
      itemHoverBg: PURPLE_DARK_GHOST_HOVER,
      itemHoverColor: PURPLE_DARK_MAIN,
      itemSelectedBg: PURPLE_DARK_GHOST_HOVER,
      itemSelectedColor: PURPLE_DARK_MAIN,
      itemActiveBg: PURPLE_DARK_GHOST_HOVER,
    },
    Dropdown: {
      controlItemBgHover: PURPLE_DARK_GHOST_HOVER,
    },
    Modal: {
      colorIconHover: PURPLE_DARK_HOVER,
    }
  }
};