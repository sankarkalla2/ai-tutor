import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export const useChatWithCourse = (id: string) => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat/courses",
    }),
  });

  const suggestions = [
    "What are prereqsites to take this course?",
    "Test me with some questions from this course",
    "Can you make flashcards for the key concepts?",
    "how much time does it take to complete this course?",
  ];

  const handleSubmit = () => {
    if (input.trim()) {
      sendMessage(
        { text: input },

        {
          body: {
            messages,
            courseId: id,
          },
        }
      );
      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return {
    input,
    messages,
    status,
    suggestions,
    handleSubmit,
    handleSuggestionClick,
    sendMessage,
    setInput
  }
};
