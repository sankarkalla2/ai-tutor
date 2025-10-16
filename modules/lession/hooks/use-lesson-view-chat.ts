import { useParams } from "next/navigation";
import { useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { useLessonView } from "./use-lesson-view";
export const useLessonViewchat = () => {
  const [input, setInput] = useState("");
  const params = useParams<{ id: string; lessonId: string }>();
  const { data, isLoading, isError } = useLessonView(
    params.lessonId,
    params.id
  );

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/chat/${params.lessonId}`,
    }),
  });

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      await sendMessage({
        role: "user",
        parts: [{ type: "text", text: input }],
      });
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return {
    data,
    isLoading,
    input,
    setInput,
    isError,
    handleSubmit,
    messages,
    status
  };
};
