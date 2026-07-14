
export const monacoOptions = {
  // Editor
  automaticLayout: true,
  readOnly: false,

  // Font
  fontFamily: "Consolas, 'Courier New', monospace",
  fontSize: 16,

  // Indentation
  tabSize: 2,
  insertSpaces: true,

  // Layout
  wordWrap: "on",
  padding: {
    top: 16,
    bottom: 16,
  },

  // Lines
  lineNumbers: "on",
  renderLineHighlight: "line",

  // Folding
  folding: true,
  showFoldingControls: "mouseover",

  // Guides
  guides: {
    indentation: true,
    bracketPairs: true,
  },

  // Brackets
  bracketPairColorization: {
    enabled: true,
  },

  // Sticky Scroll
  stickyScroll: {
    enabled: true,
  },

  // Cursor
  cursorBlinking: "blink",
  cursorSmoothCaretAnimation: "on",

  // Scroll
  scrollBeyondLastLine: false,
  smoothScrolling: true,

  scrollbar: {
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
  },

  // Minimap
  minimap: {
    enabled: false,
  },

  // Context Menu
  contextmenu: true,

  // Formatting
  formatOnPaste: false,
  formatOnType: false,

  // Whitespace
  renderWhitespace: "selection",

  // Misc
  glyphMargin: false,
};