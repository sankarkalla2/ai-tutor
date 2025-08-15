import { create } from "zustand";

interface ToggleRightSideProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const useToggleRightSide = create<ToggleRightSideProps>((set) => ({
  isOpen: true,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
