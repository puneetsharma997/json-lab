import { create } from 'zustand';
import { DEFAULT_JSON } from '@/shared/constants/default-json';
import { persist } from 'zustand/middleware';

// generate a unique identifier using timestamp and random string
const generateId = () => "doc_" + Date.now().toString(36) + Math.random().toString(36).substring(2);

const initialId = generateId();

export const useEditorStore = create(
  persist(
    (set) => ({
      // array holding all saved documents acting as a global file system
      documents: [
        {
          id: initialId,
          name: "New document 1",
          content: DEFAULT_JSON,
          lastModified: Date.now(),
        }
      ],

      // independent pointers for left and right active documents
      leftActiveId: initialId,
      rightActiveId: initialId,

      // tracks whether the split-screen compare view is active
      isCompareMode: false,

      // view mode for both panes (default is "text")
      leftViewMode: "text",
      rightViewMode: "text",

      // state to handle Monaco editor scroll navigation
      goToLocation: null,

      // state to trigger internal Monaco commands (fold/unfold) across components
      editorCommand: null,

      diffBlocks: [], // stores line numbers of differences
      activeDiffIndex: 0,
      compareNavigate: null,

      // toggle the comparison layout view
      toggleCompareMode: () => set((state) => ({
        isCompareMode: !state.isCompareMode,
      })),

      // update the view mode for the specified pane
      setViewMode: (mode, pane = "left") => set((state) => ({
        leftViewMode: pane === "left" ? mode : state.leftViewMode,
        rightViewMode: pane === "right" ? mode : state.rightViewMode,
      })),

      // set cursor location for the active editor to scroll into view
      setGoToLocation: (line, column) => set({
        goToLocation: { line, column, timestamp: Date.now() }
      }),

      // dispatch a command to be executed by the Monaco editor instance
      triggerEditorCommand: (command, pane = "left") => set({
        editorCommand: { command, pane, timestamp: Date.now() }
      }),

      // change the active document for the specified pane
      setActiveDocument: (id, pane = "left") => set((state) => ({
        leftActiveId: pane === "left" ? id : state.leftActiveId,
        rightActiveId: pane === "right" ? id : state.rightActiveId,
      })),

      // update the JSON content of the document active in the requested pane
      setEditorValue: (value, pane = "left") => set((state) => {
        const activeId = pane === "left" ? state.leftActiveId : state.rightActiveId;

        return {
          documents: state.documents.map((doc) =>
            doc.id === activeId
              ? { ...doc, content: value, lastModified: Date.now() }
              : doc
          ),
        }
      }),

      // update the file name of the document active in the requested pane
      setDocName: (name, pane = "left") => set((state) => {
        const activeId = pane === "left" ? state.leftActiveId : state.rightActiveId;

        return {
          documents: state.documents.map((doc) =>
            doc.id === activeId
              ? { ...doc, name, lastModified: Date.now() }
              : doc
          ),
        }
      }),

      // clear the content of the document active in the requested pane
      clearEditor: (pane = "left") => set((state) => {
        const activeId = pane === "left" ? state.leftActiveId : state.rightActiveId;

        return {
          documents: state.documents.map((doc) =>
            doc.id === activeId
              ? { ...doc, content: "", lastModified: Date.now() }
              : doc
          ),
        }
      }),

      // create a new file with default JSON and open it in the requesting pane
      createNewDocument: (pane = "left") => set((state) => {
        const newCount = state.documents.length + 1;
        const newDoc = {
          id: generateId(),
          name: `New document ${newCount}`,
          content: DEFAULT_JSON,
          lastModified: Date.now(),
        };
        return {
          documents: [...state.documents, newDoc],
          leftActiveId: pane === "left" ? newDoc.id : state.leftActiveId,
          rightActiveId: pane === "right" ? newDoc.id : state.rightActiveId,
        };
      }),

      // handle disk uploads by creating a new file and opening it in the requesting pane
      addUploadedDocument: (name, content, pane = "left") => set((state) => {
        const newDoc = {
          id: generateId(),
          name: name,
          content: content,
          lastModified: Date.now(),
        };
        return {
          documents: [...state.documents, newDoc],
          leftActiveId: pane === "left" ? newDoc.id : state.leftActiveId,
          rightActiveId: pane === "right" ? newDoc.id : state.rightActiveId,
        }
      }),

      // delete a document and securely adjust pane pointers to avoid crashes
      removeDocument: (id) => set((state) => {
        const remainingDocs = state.documents.filter(doc => doc.id !== id);

        // reset to a default blank document if the array becomes entirely empty
        if (remainingDocs.length === 0) {
          const newDoc = {
            id: generateId(),
            name: "New document 1",
            content: DEFAULT_JSON,
            lastModified: Date.now(),
          };
          return {
            documents: [newDoc],
            leftActiveId: newDoc.id,
            rightActiveId: newDoc.id
          };
        }

        // safely fallback to the first available file if the active document was deleted
        let newLeftId = state.leftActiveId;
        let newRightId = state.rightActiveId;

        if (state.leftActiveId === id) {
          newLeftId = remainingDocs[0].id;
        }
        if (state.rightActiveId === id) {
          newRightId = remainingDocs[0].id;
        }

        return {
          documents: remainingDocs,
          leftActiveId: newLeftId,
          rightActiveId: newRightId
        };
      }),

      // update the diff blocks
      setDiffBlocks: (blocks) => set({
        diffBlocks: blocks,
        activeDiffIndex: blocks.length > 0 ? 1 : 0
      }),

      // go to next difference in editor
      goToNextDiff: () => set((state) => {
        if (state.diffBlocks.length === 0) return state;

        const nextIndex = state.activeDiffIndex < state.diffBlocks.length ? state.activeDiffIndex + 1 : 1;
        const block = state.diffBlocks[nextIndex - 1];
        return {
          activeDiffIndex: nextIndex,
          compareNavigate: {
            targetPane: block.targetPane,
            leftLine: block.leftLine,         // for text view left pane
            rightLine: block.rightLine,       // for text view right pane
            treeLeftId: block.treeLeftId,     // for tree view left pane
            treeRightId: block.treeRightId,   // for tree view right pane
            timestamp: Date.now()
          }
        };
      }),

      // go to previous difference in editor
      goToPrevDiff: () => set((state) => {
        if (state.diffBlocks.length === 0) return state;

        const prevIndex = state.activeDiffIndex > 1 ? state.activeDiffIndex - 1 : state.diffBlocks.length;
        const block = state.diffBlocks[prevIndex - 1];
        return {
          activeDiffIndex: prevIndex,
          compareNavigate: {
            targetPane: block.targetPane,
            leftLine: block.leftLine,         // for text view left pane
            rightLine: block.rightLine,       // for text view right pane
            treeLeftId: block.treeLeftId,     // for tree view left pane
            treeRightId: block.treeRightId,   // for tree view right pane
            timestamp: Date.now()
          }
        };
      }),

    }),
    {
      name: 'json-lab-editor-storage',
    }
  )
);