import {
  GitCompare,
  Trash2,
  WandSparkles,
  FilePlus,
  FolderOpen,
  Save,
  Network
} from "lucide-react";

export const jsonEditorToolbarActions = [
  {
    key: "new",
    label: "New",
    icon: FilePlus,
    tooltip: "Create new document",
  },
  {
    key: "open",
    label: "Open",
    icon: FolderOpen,
    isDropdown: true,
    items: [
      { key: "open-file", label: "Open file" },
      { key: "open-disk", label: "Open from disk" },
      { key: "import-csv", label: "Import CSV" },
    ],
  },
  {
    key: "save",
    label: "Save",
    icon: Save,
    isDropdown: true,
    items: [
      { key: "save-disk", label: "Save to disk" },
      { key: "export-csv", label: "Export to CSV" },
    ],
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
  {
    key: "compare",
    label: "Compare",
    icon: GitCompare,
    tooltip: "Compare two JSON objects",
  },
  {
    key: "clear",
    label: "Clear",
    icon: Trash2,
    danger: true,
    tooltip: "Clear editor",
  },
];