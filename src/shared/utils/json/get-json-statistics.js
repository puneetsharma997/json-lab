
export function getJsonStatistics(json) {
  const statistics = { isValid: false, characters: json.length, objects: 0, arrays: 0, depth: 0, error: null };

  if (!json.trim()) {
    statistics.error = "JSON is empty.";
    return statistics;
  }

  let parsedJson;
  try {
    parsedJson = JSON.parse(json);
    statistics.isValid = true;
  }
  catch (error) {
    statistics.error = error instanceof Error ? error.message : "Invalid JSON.";
    return statistics;
  }

  let maxDepth = 0;
  let objects = 0;
  let arrays = 0;

  // Stack approach
  const stack = [{ node: parsedJson, depth: 1 }];

  while (stack.length > 0) {
    const { node, depth } = stack.pop();
    if (depth > maxDepth) maxDepth = depth;

    if (node !== null && typeof node === "object") {
      if (Array.isArray(node)) {
        arrays++;

        for (let i = 0; i < node.length; i++) {
          stack.push({ node: node[i], depth: depth + 1 });
        }
      }
      else {
        objects++;
        const keys = Object.keys(node);
        for (let i = 0; i < keys.length; i++) {
          stack.push({ node: node[keys[i]], depth: depth + 1 });
        }
      }
    }
  }

  statistics.objects = objects;
  statistics.arrays = arrays;
  statistics.depth = maxDepth;

  return statistics;
}