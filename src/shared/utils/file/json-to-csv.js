
// Converts a JSON string to a CSV string.
export const convertJsonToCsvString = (jsonString) => {
  if (!jsonString.trim()) {
    return { success: false, error: "JSON is empty." };
  }

  try {
    let data = JSON.parse(jsonString);

    // if object, then make it array to use loop
    if (!Array.isArray(data)) {
      data = [data];
    }

    if (data.length === 0) {
      return { success: false, error: "JSON array is empty." };
    }

    // extract unique keys (headers)
    const headers = Array.from(new Set(data.flatMap(Object.keys)));
    if (headers.length === 0) {
      return { success: false, error: "No properties found in JSON." };
    }

    // generate csv rows
    const csvRows = [];

    // first row is headers
    csvRows.push(headers.join(","));

    // remaining rows are values
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        const stringVal = (val !== null && val !== undefined) ? String(val) : "";
        const escapedVal = stringVal.replace(/"/g, '""');
        return `"${escapedVal}"`;
      });
      csvRows.push(values.join(","));
    }

    return { success: true, csvString: csvRows.join("\n") };
  }
  catch (error) {
    return { success: false, error: "Invalid JSON format for CSV conversion." };
  }
};