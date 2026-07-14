/**
 * zustand store for managing code generator states (typescript, zod, json schema).
 * acts as a persistent scratchpad for generator inputs and configurations.
 * handles the one-way data flow (json input -> generated code output).
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGeneratorStore = create(
  persist(
    (set, get) => ({
      jsonInput: "",
      generatedOutput: "",
      inputError: null,
      autoGenerate: true,
      leftEditorCommand: null,
      lastUsedType: null,

      triggerLeftCommand: (cmd) => set({ leftEditorCommand: { command: cmd, id: Date.now() } }),

      // update the raw json input and clear previous syntax errors
      setJsonInput: (value) => set({ jsonInput: value, inputError: null }),

      // set the successfully generated code/schema (read-only output)
      setGeneratedOutput: (value) => set({ generatedOutput: value }),

      // track invalid json parsing errors
      setInputError: (error) => set({ inputError: error }),

      // toggle the live auto-generation feature
      toggleAutoGenerate: () => set((state) => ({ autoGenerate: !state.autoGenerate })),

      // completely wipe out the scratchpad data
      clearAll: () => set({
        jsonInput: "",
        generatedOutput: "",
        inputError: null
      }),

      // tool change logic (clear data if switching tools)
      setActiveTool: (currentType) => {
        const lastType = get().lastUsedType;
        if (lastType && lastType !== currentType) {
          set({
            jsonInput: "",
            generatedOutput: "",
            inputError: null,
            lastUsedType: currentType,
          });
        }
        else if (!lastType) {
          set({ lastUsedType: currentType });
        }
      },
    }),
    {
      name: "json-lab-generator-storage",
      // persist the input data and preferences, ignore temporary errors and output
      partialize: (state) => ({
        autoGenerate: state.autoGenerate,
        jsonInput: state.jsonInput,
        lastUsedType: state.lastUsedType
      }),
    }
  )
);