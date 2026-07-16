# 🧪 JSON Lab

> **The ultimate, privacy-first toolkit for developers to edit, format, validate, compare, and transform JSON data directly in the browser.**

JSON Lab is an enterprise-grade web application built to handle complex JSON operations. Designed with a strict **Separation of Concerns (SoC)** architecture, it features a dual-engine comparison system (Text & Tree), bi-directional format converters, dynamic code generators, and a highly modular codebase.

---

## ✨ Core Features

### 📝 Advanced Editor (Monaco Integration)
- **Syntax Highlighting & Validation:** Real-time JSON validation with exact line and column error diagnostics.
- **Auto-Repair:** One-click fix for malformed JSON using the `jsonrepair` engine.
- **Smart Formatting:** Standard formatting, Minification, and **Smart Compact Formatting** (keeps short arrays/objects on a single line for readability).
- **Structural Commands:** Expand or collapse all JSON nodes directly from the toolbar.

### 🔄 Bi-Directional Converters (Scratchpad)
- **Supported Formats:** Seamlessly convert between **YAML ⇄ JSON**, **XML ⇄ JSON**, and **CSV ⇄ JSON**.
- **Live Sync & Auto-Convert:** Real-time dual-pane synchronization. Includes a toggleable "Auto-Convert" feature, when disabled for large files, manual directional convert buttons appear.
- **Smart Error Boundaries:** Independent error tracking for Left and Right panes. Invalid syntax in one pane won't wipe out the valid data in the other.
- **Robust Parsing Engines:**
  - Uses `js-yaml` for strict YAML validation and formatting.
  - Uses `fast-xml-parser` for high-speed XML conversions (with `@_` prefixing to preserve XML attributes).
  - Uses a custom-built smart CSV parser to correctly handle nested quotes, escaped characters, and auto-convert numeric strings.

### ⚙️ Code Generators (One-Way Transform)
- **Supported Outputs:** Instantly generate **TypeScript Interfaces**, **Zod Validation Schemas**, and standard **JSON Schemas (Draft-07)** directly from raw JSON objects.
- **Smart Generation Engine:** Features an "Auto-Generate" toggle for live, keystroke-by-keystroke compilation. When turned off, a manual "Generate" fallback provides precise control over heavy payloads.
- **Custom Zod Formatter:** Includes a lightweight, custom-built formatting algorithm specifically for Zod schemas to ensure nested objects and chained methods are rendered with clean, VS Code-like indentation directly in the browser (bypassing the need for heavy Prettier bundles).
- **Context-Aware Workspaces:** Utilizes Zustand's persistence securely. Navigating between different generator tools (e.g., TS to Zod) automatically wipes the workspace to prevent context-clashing, while simple page refreshes gracefully preserve the active session and smartly re-hydrate the generated output.
- **Robust Generation Libraries:**
  - Uses `json-to-ts` for strictly typed, multi-interface TypeScript generation.
  - Uses `to-json-schema` for Draft-07 schema derivation.
  - Uses `json-schema-to-zod` for robust schema validation code.

### 🔍 JSONPath Tester (Utility)
- **Live Query Evaluation:** Safely evaluate complex JSONPath expressions in real-time using the robust `jsonpath-plus` engine against deeply nested objects and arrays.
- **Performance Optimized (Debouncing):** Built-in 300ms debouncing ensures the UI never blocks or freezes during rapid typing or deep structural scans.
- **Graceful Error Handling:** Incomplete query syntax (e.g., typing `$.[`) or invalid JSON are caught silently via try/catch boundaries, preventing application crashes and returning clean fallback states (0 matches).
- **Split-Pane Visualization:** Left pane strictly for raw JSON input, right pane for instantly formatted, read-only matched payload outputs.
- **Match Diagnostics:** Custom status bar dynamically computes and displays the exact number of matches found for the currently active query.

### 🌳 Visual Tree Mode
- **Semantic Rendering:** View JSON as an interactive, collapsible tree hierarchy.
- **Custom Theming:** Tree view colors are perfectly synced with the Monaco Editor's VS Code-like theme.
- **Safe Parsing:** Protected against crashes via safe-parsing utilities if invalid JSON is injected.

### ⚖️ Dual-Engine Compare Mode
- **Text Diffing (Smart Chunking):** Line-by-line comparison using the `diff` algorithm. Contiguous changes are intelligently grouped into blocks for smooth Next/Previous arrow navigation.
- **Tree Diffing (Semantic Diff):** Deep object comparison using `deep-diff`. Identifies newly added, deleted, or edited keys/values regardless of structural formatting or trailing commas, complete with visual highlights and flash-scroll effects.

### 📁 Virtual File System
- **Multi-Document Management:** Create, rename, delete, and switch between multiple JSON documents seamlessly in the Editor.
- **Import / Export:** Upload `.json`, `.yaml`, `.xml`, or `.csv` files directly from your local disk. Export your modified data directly back to these formats.
- **Persistent Storage:** All documents, scratchpad texts, and workspace preferences are saved locally in the browser using `zustand/middleware`.

### 🎨 Premium UI & Theming
- **Custom Ant Design:** Highly customized Ant Design theme with tailored Purple accents and a dedicated Dark Mode configuration.
- **Responsive Split Panes:** Resizable vertical split views for side-by-side comparison and conversion.
- **Debounced Search:** Global tool search with an optimized, debounced input handler.

---

## 🛠️ Tech Stack

**Core Frameworks**
- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Zustand 5](https://zustand-demo.pmnd.rs/) (Global State Management & Persistence)

**UI & Styling**
- **Ant Design (antd) 6** (Component Library)
- **Sass (SCSS)** (Modular Styling, CSS Variables)
- **Lucide React** (Iconography)
- **Monaco Editor** / `@monaco-editor/react` (Text Editor)
- **React Split Pane** (Resizable layouts)
- **React JSON Tree** (Data visualization)

**Data Processing & Diffing**
- **diff** (Text-based diffing)
- **deep-diff** (Semantic object diffing)
- **jsonc-parser** (AST parsing for exact error locations)
- **jsonrepair** (Auto-fixing broken JSON strings)
- **json-stringify-pretty-compact** (Smart compact formatting)
- **js-yaml** (YAML to JSON bidirectional parsing)
- **fast-xml-parser** (High-performance XML parsing)
- **fast-xml-builder** (High-performance XML building)
- **json-to-ts** (TypeScript interface generation)
- **to-json-schema** (JSON Schema Draft-07 generation)
- **json-schema-to-zod** (Zod validation schema generation)
- **jsonpath-plus** (Advanced JSONPath evaluation engine)

---

## 🏗️ Project Architecture

The project follows a strict **Feature-Sliced Design** and **Separation of Concerns**, ensuring high scalability, readability, and maintainability.

```text
src/
├── app/                      # Next.js App Router (Layouts, Global SCSS, Dynamic Routes)
├── config/                   # Global configurations (Antd Themes, Navigation Maps)
├── features/                 # Domain-specific modules
│   ├── home/                 # Landing page and tool grid
│   ├── converters/           # Bi-directional format converters (YAML, XML, CSV)
│   │   ├── components/       # Shared workspace, toolbar, and UI for converters
│   │   ├── hooks/            # useConverterLogic.js (Handles multi-format parsing)
│   │   └── ConverterPage.jsx # Dynamic page shell injected with specific tool types
│   ├── generators/           # One-way code generators (TypeScript, Zod, JSON Schema)
│   │   ├── components/       # Shared workspace, toolbar (with auto/manual sync), and UI
│   │   ├── hooks/            # useGeneratorLogic.js, Formatters & Exporters
│   │   └── GeneratorPage.jsx # Dynamic page shell for generating code outputs
│   ├── json-editor/          # The core JSON Editor application
│   │   ├── components/       # Editor UI components (Toolbar, ValidationPanel, etc.)
│   │   └── hooks/            # Granular hooks (Diffing, Formatting, File IO)
│   └── utilities/            # Developer utilities and specialized tools
│       └── jsonpath-tester/  # The core JSONPath Tester application
│           ├── components/   # QueryInput, Workspace, Toolbar, Statusbar
│           ├── hooks/        # usePathTesterLogic.js, Formatters, Exporters
│           └── JSONPathTesterPage.jsx # Page wrapper for the utility tool
├── shared/                   # Reusable cross-feature modules
│   ├── constants/            # Default JSON, Tool Mappings
│   ├── hooks/                # Global hooks (useApp, useMounted, useResolvedTheme)
│   ├── ui/                   # Shared components (Modals, ToolHeader, BaseValidationPanel)
│   └── utils/                # Pure utility functions (File IO, Parsers, Diff Engines)
└── store/                    # Zustand stores
    ├── editor.store.js       # Handles multi-document states for JSON Editor
    ├── converter.store.js    # Lightweight scratchpad state for converters
    ├── generator.store.js    # Context-aware generator state with auto-hydration
    ├── path-tester.store.js  # Persistent scratchpad for JSONPath inputs and queries
    └── theme.store.js        # Global theme persistence
```

### Architectural Highlights

1. **Pure Utility Functions (`shared/utils/`)**
   Complex calculations like `computeTextDiff`, `getJsonStatistics`, and custom CSV parsers are decoupled from React components. They take raw inputs and return pure outputs, making them highly performant and easy to test.

2. **Granular Custom Hooks (`features/.../hooks/`)**
   Massive monolithic logic is broken down into specific hooks. For example, `Toolbar.jsx` delegates logic to `useViewModeManager` and `useFileExporters`. The UI components remain extremely lightweight.

3. **Dynamic Routing & Reusability**
   Instead of creating separate pages for YAML, XML, and CSV converters, the app uses a single shared `ConverterPage.jsx` and `ConverterWorkspace.jsx`. The UI and logic dynamically adapt based on the active route type mapped in `tool-pages-mapping.js`.

4. **State Driven UI & Segregated Stores**
   Monaco editor commands (like `revealLineInCenter`) are triggered via Zustand state, avoiding messy prop-drilling. Furthermore, different domains use segregated stores (e.g., `editor.store.js` vs `converter.store.js`) to prevent state bloating.

5. **Hydration Safe Rendering**
   Next.js SSR hydration mismatches (specifically for Themes and Monaco Editor) are handled elegantly using a custom `useMounted` hook leveraging React's `useSyncExternalStore`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/puneetsharma997/json-lab.git
cd json-lab
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open the application**
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔮 Future Scope (Planned Tools)

As outlined in the `tool-navigation.js` configuration, JSON Lab is built to scale into a massive developer suite. Upcoming features include:
- **Utilities:** Mock Data Generator, and Interactive Node Visualizer.
