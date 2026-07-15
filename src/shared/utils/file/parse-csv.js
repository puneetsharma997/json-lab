
// Parses a CSV string and converts it into a JSON string.
export const convertCsvToJsonString = (csvContent) => {
  try {
    const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== "");

    if (lines.length < 2) {
      return { success: false, error: "CSV must have headers and at least one row." };
    }

    // Helper function to correctly parse a CSV line, handling commas inside quotes
    const parseCsvLine = (text) => {
      let result = [];
      let startValueBnd = 0;
      let inQuotes = false;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === '"') {
          inQuotes = !inQuotes;
        }
        else if (text[i] === ',' && !inQuotes) {
          result.push(text.substring(startValueBnd, i));
          startValueBnd = i + 1;
        }
      }
      result.push(text.substring(startValueBnd));

      return result.map(val => {
        let clean = val.trim();
        // remove wrapping quotes and unescape internal double quotes
        if (clean.startsWith('"') && clean.endsWith('"')) {
          clean = clean.substring(1, clean.length - 1).replace(/""/g, '"');
        }
        // auto-convert numeric strings to actual numbers for clean JSON
        if (!isNaN(clean) && clean !== "") {
          return Number(clean);
        }
        return clean;
      });
    };

    // extract headers
    const headers = parseCsvLine(lines[0]);

    // convert remaining rows into object
    const result = lines.slice(1).map(line => {
      const values = parseCsvLine(line);
      const obj = {};

      headers.forEach((header, index) => {
        obj[header] = values[index] !== undefined ? values[index] : "";
      });

      return obj;
    });

    return {
      success: true,
      jsonString: JSON.stringify(result, null, 2)
    };
  }
  catch (error) {
    return { success: false, error: "Failed to parse CSV: " + error.message };
  }
};