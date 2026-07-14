/**
 * dynamic route handler for all individual tool pages (e.g., /tools/[tool]).
 * intercepts the url parameter, retrieves the corresponding react component
 * from the global mapping configuration, and renders it.
 * triggers a 404 not found state if an unregistered or invalid tool url is accessed.
 */

import { toolPagesMapping } from "@/shared/constants/tool-pages-mapping";
import { notFound } from "next/navigation";

// dynamic tool pages rendering based on the tool parameter in the URL
export default async function ToolPage({ params }) {

  const { tool } = await params;
  const SelectedTool = toolPagesMapping[tool];

  if (!SelectedTool) {
    notFound();
  }

  return <SelectedTool />;
}