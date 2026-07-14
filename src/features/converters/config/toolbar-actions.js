import {
  Upload,
  Download,
  Trash2,
  Network
} from "lucide-react";

export const leftToolbarActions = [
  {
    key: "open",
    label: "Open",
    icon: Upload,
    tooltip: "Upload",
  },
  {
    key: "save",
    label: "Save",
    icon: Download,
    tooltip: "Download as ",
  },
];

export const rightToolbarActions = [
  {
    key: "open",
    label: "Open",
    icon: Upload,
    tooltip: "Upload",
  },
  {
    key: "save",
    label: "Save",
    icon: Download,
    tooltip: "Download as ",
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