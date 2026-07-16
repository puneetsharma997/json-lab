/**
 * zustand store for managing the state of the jsonpath tester utility.
 * acts as a persistent scratchpad for input json and query configurations.
 * handles editor commands and maintains the ui state for results and errors.
 */

import { create } from "zustand";
import { PATH_TESTER_DEFAULT_JSON } from "@/shared/constants/default-json";
import { persist } from "zustand/middleware";

// sample data with nested structures to perfectly demonstrate jsonpath capabilities
const DEFAULT_JSON = PATH_TESTER_DEFAULT_JSON

// default query targeting all book titles
const DEFAULT_QUERY = "$.store.book[*].title";

export const usePathTesterStore = create(
  persist(
    (set) => ({
      jsonInput: "",
      query: "",
      outputJson: "",
      inputError: null,
      matchesCount: 0,
      leftEditorCommand: null,
      rightEditorCommand: null,

      // trigger commands for the left editor (format, expand, collapse)
      triggerLeftCommand: (cmd) => set({ leftEditorCommand: { command: cmd, id: Date.now() } }),

      // trigger commands for the right editor (expand, collapse)
      triggerRightCommand: (cmd) => set({ rightEditorCommand: { command: cmd, id: Date.now() } }),

      // update the raw json input and clear previous syntax errors
      setJsonInput: (value) => set({ jsonInput: value, inputError: null }),

      // update the jsonpath query string
      setQuery: (value) => set({ query: value }),

      // set the resulting matched json output
      setOutputJson: (value) => set({ outputJson: value }),

      // update the count of total matches found by the query
      setMatchesCount: (count) => set({ matchesCount: count }),

      // track invalid json parsing errors
      setInputError: (error) => set({ inputError: error }),

      // completely wipe out the scratchpad data
      clearAll: () => set({
        jsonInput: "",
        query: "",
        outputJson: "",
        inputError: null,
        matchesCount: 0
      }),

      // load default sample data for quick testing
      loadSample: () => set({
        jsonInput: DEFAULT_JSON,
        query: DEFAULT_QUERY,
        inputError: null
      })
    }),
    {
      name: "json-lab-path-tester-storage",
      // persist only the input data and query
      partialize: (state) => ({
        jsonInput: state.jsonInput,
        query: state.query
      }),
    }
  )
);