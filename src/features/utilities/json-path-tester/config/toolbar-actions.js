import {
  Upload,
  Download,
  Trash2,
  Network,
  WandSparkles,
  Copy
} from "lucide-react";

export const leftToolbarActions = [
  {
    key: "open",
    label: "Open JSON",
    icon: Upload,
    tooltip: "Upload .json File",
  },
  {
    key: "save",
    label: "Save",
    icon: Download,
    tooltip: "Download as .json",
  },
  {
    key: "format-group",
    label: "Format",
    icon: WandSparkles,
    isDropdown: true,
    items: [
      { key: "format", label: "Format JSON" },
      { key: "smartFormat", label: "Smart Format (Compact)" },
      { key: "minify", label: "Minify (Remove Whitespace)" },
    ],
  },
  {
    key: "structure-group",
    label: "Structure",
    icon: Network,
    isDropdown: true,
    items: [
      { key: "expand", label: "Expand All Nodes" },
      { key: "collapse", label: "Collapse All Nodes" },
    ],
  },
];

export const rightToolbarActions = [
  {
    key: "copy",
    label: "Copy",
    icon: Copy,
    tooltip: "Copy Output JSON",
  },
  {
    key: "save",
    label: "Save",
    icon: Download,
    tooltip: "Download as .json",
  },
  {
    key: "structure-group",
    label: "Structure",
    icon: Network,
    isDropdown: true,
    items: [
      { key: "expand", label: "Expand All Nodes" },
      { key: "collapse", label: "Collapse All Nodes" },
    ],
  },
  {
    key: "clear",
    label: "Clear",
    icon: Trash2,
    danger: true,
    tooltip: "Clear Both Editors",
  },
];