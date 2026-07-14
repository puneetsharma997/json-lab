
// Reads a text file from the user's computer and returns its content.
export const readFileAsText = (file) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve({ success: false, error: "No file selected", name: "" });
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        resolve({
          success: true,
          content: content,
          name: file.name.replace(/\.[^/.]+$/, ""),
        });
      }
      else {
        resolve({ success: false, error: "Failed to read file content as text", name: file.name });
      }
    };

    reader.onerror = () => {
      resolve({ success: false, error: "Error occurred while reading the file", name: file.name });
    };

    reader.readAsText(file);
  });
};