/**
 * utility function to safely parse a json string.
 * it prevents the application from crashing when invalid json is encountered,
 * returning a fallback error object instead of throwing a fatal exception.
 * this can be shared across the entire project for any json parsing needs.
 */

export const safeJsonParse = (jsonString, fallbackError = { error: "Invalid JSON format" }) => {
  try {
    return JSON.parse(jsonString || "{}");
  }
  catch (error) {
    return fallbackError;
  }
};