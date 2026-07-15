import { parseTree } from "jsonc-parser";

export const getJsonDiagnostics = (value) => {
  if (!value.trim()) {
    return { isValid: true, message: null, line: null, column: null };
  }

  const errors = [];

  // Parse tree AST generate karega aur errors array me store kar dega
  parseTree(value, errors, { allowTrailingComma: false });

  if (errors.length > 0) {
    const firstError = errors[0];
    let line = 1;
    let column = 1;

    // Offset (character index) se Line aur Column calculate karna
    for (let i = 0; i < firstError.offset; i++) {
      if (value[i] === '\n') {
        line++;
        column = 1;
      }
      else {
        column++;
      }
    }

    let errorMessage = "Invalid JSON structure.";
    try {
      JSON.parse(value);
    }
    catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message
          .replace(/( in JSON)? at position \d+.*$/i, '')
          .replace(/ at line \d+ column \d+$/i, '')
          .trim();
      }
      else {
        errorMessage = "Invalid JSON";
      }
    }

    return { isValid: false, message: errorMessage, line, column };
  }

  return { isValid: true, message: null, line: null, column: null };
};