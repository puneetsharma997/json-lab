
// custom lightweight formatter for zod code
export const formatZodSchema = (code) => {
  let formatted = '';
  let indentLevel = 0;
  let inString = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    // toggle string state to ignore brackets inside quotes
    if (char === '"') inString = !inString;

    if (!inString) {
      // add newline and indent after opening brace
      if (char === '{') {
        indentLevel++;
        formatted += '{\n' + '  '.repeat(indentLevel);
        continue;
      }

      // add newline and un-indent before closing brace
      if (char === '}') {
        indentLevel--;
        formatted += '\n' + '  '.repeat(indentLevel) + '}';
        continue;
      }

      // add newline and indent after comma
      if (char === ',' && code[i + 1] === ' ') {
        formatted += ',\n' + '  '.repeat(indentLevel);
        i++;    // skip the trailing space
        continue;
      }
    }
    // append the current character
    formatted += char;
  }
  return formatted;
};