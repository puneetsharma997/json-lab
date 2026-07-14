import { toolNavigation } from "@/config/tool-navigation";

// helper functions specifically for tool navigation
export const allTools = toolNavigation.flatMap(
  (category) => category.items
);

export const getToolById = (id) =>
  allTools.find((tool) => tool.id === id);