// src/stores/toggle-lesson-chat-store.ts
import { createStore } from "zustand/vanilla";

interface ToggleRightSideProps {
  isOpen: boolean;
  toggleOpen: () => void;
  setOpen: (value: boolean) => void;
}

export const createToggleLessonChatStore = (initialOpen: boolean) =>
  createStore<ToggleRightSideProps>()((set) => ({
    isOpen: initialOpen,
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),

    setOpen: (value) => set({ isOpen: value }),
  }));

export type ToggleLessonChatStore = ReturnType<
  typeof createToggleLessonChatStore
>;
