import { allTools } from "./tool-navigation";

// helper function to search tools based on the query
export function searchTools(query) {
  const searchQuery = query.trim().toLowerCase();

  if (!searchQuery) {
    return [];
  }

  return allTools.filter((tool) => {
    const matchesTitle = tool.title
      .toLowerCase()
      .includes(searchQuery);

    const matchesKeywords = tool.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery)
    );

    return matchesTitle || matchesKeywords;
  });
}