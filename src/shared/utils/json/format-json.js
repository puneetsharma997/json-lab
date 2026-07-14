
export function formatJson(json) {
  if (!json.trim()) {
    return {
      success: false,
      formattedJson: json,
      error: "JSON is empty.",
    };
  }

  try {
    const parsedJson = JSON.parse(json);

    return {
      success: true,
      formattedJson: JSON.stringify(
        parsedJson,
        null,
        2,
      ),
      error: null,
    };
  }

  catch (error) {
    return {
      success: false,
      formattedJson: json,
      error:
        error instanceof Error
          ? error.message
          : "Invalid JSON.",
    };
  }
}