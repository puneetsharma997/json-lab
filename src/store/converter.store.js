/**
 * zustand store for managing converter tool states (yaml, xml, csv to json).
 * acts as a persistent scratchpad, saving text values to prevent data loss on refresh.
 * handles bi-directional text values, error tracking, and auto-convert preferences.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useConverterStore = create(
  persist(
    (set, get) => ({
      leftValue: "",
      rightValue: "",
      leftError: null,
      rightError: null,
      autoConvert: true,
      rightEditorCommand: null,
      lastUsedType: null,

      triggerRightCommand: (cmd) => set({ rightEditorCommand: { command: cmd, id: Date.now() } }),

      // update left editor value and clear its error
      setLeftValue: (value) => set({ leftValue: value, leftError: null }),

      // update right editor value and clear its error
      setRightValue: (value) => set({ rightValue: value, rightError: null }),

      // set distinct errors for left or right panes if conversion fails
      setErrors: (leftError = null, rightError = null) => set({ leftError, rightError }),

      // toggle the live auto-conversion feature
      toggleAutoConvert: () => set((state) => ({ autoConvert: !state.autoConvert })),

      // completely wipe out the scratchpad data
      clearAll: () => set({
        leftValue: "",
        rightValue: "",
        leftError: null,
        rightError: null
      }),

      // tool change logic (clear data if switching tools)
      setActiveTool: (currentType) => {
        const lastType = get().lastUsedType;
        if (lastType && lastType !== currentType) {
          set({
            leftValue: "",
            rightValue: "",
            leftError: null,
            rightError: null,
            lastUsedType: currentType,
          });
        }
        else if (!lastType) {
          set({ lastUsedType: currentType });
        }
      },
    }),
    {
      name: "json-lab-converter-storage",
      // persist text values and preferences, ignoring temporary error states
      partialize: (state) => ({
        autoConvert: state.autoConvert,
        leftValue: state.leftValue,
        rightValue: state.rightValue,
        lastUsedType: state.lastUsedType
      }),
    }
  )
);