import { jsonrepair } from 'jsonrepair';

// function to auto-repair malformed JSON using the 'jsonrepair' library
export const repairJson = (jsonString) => {
  if (!jsonString.trim()) {
    return { success: false, error: "Empty JSON" };
  }

  try {
    const repairedString = jsonrepair(jsonString);

    const parsedObject = JSON.parse(repairedString);
    const formattedJson = JSON.stringify(parsedObject, null, 2);

    return {
      success: true,
      repairedJson: formattedJson
    };
  }
  catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "JSON is too corrupted to auto-repair."
    };
  }
};