// src/providers/toggle-lesson-chat-provider.tsx
"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import { useStore } from "zustand";

import { useIsMobile } from "@/hooks/use-mobile"; // ✅ use hook here
import { createToggleLessonChatStore, ToggleLessonChatStore } from "@/store/use-toggle-chat-store";


const ToggleLessonChatContext = createContext<ToggleLessonChatStore | null>(
  null
);

export const ToggleLessonChatProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const isMobile = useIsMobile();
  const storeRef = useRef<ToggleLessonChatStore | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createToggleLessonChatStore(!isMobile); // ✅ Set initial value conditionally
  }

  

  return (
    <ToggleLessonChatContext.Provider value={storeRef.current}>
      {children}
    </ToggleLessonChatContext.Provider>
  );
};

export const useToggleLessonChat = <T,>(selector: (state: any) => T): T => {
  const store = useContext(ToggleLessonChatContext);
  if (!store)
    throw new Error(
      "useToggleLessonChat must be used within ToggleLessonChatProvider"
    );
  return useStore(store, selector);
};
