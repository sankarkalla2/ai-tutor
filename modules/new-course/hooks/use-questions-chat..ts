interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  options?: string[]; // optional for multiple-choice answers
  answer?: string; // optional for user's answer
}
export const useQuestionsCht = ({
  questions,
  setInput,
  isLoading,
  messages,
  input,
  currentQuestionIndex,
  isComplete,
  setIsComplete,
  setMessages,
  setCurrentQuestionIndex,
}: AiQuestionChatProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmitOption = (option: string) => {
    if (!option.trim() || isComplete) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: option.trim(),
      options: [],
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput("");

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setTimeout(() => {
        const nextQuestion: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: questions[nextQuestionIndex].question,
          options: questions[nextQuestionIndex].options,
          answer: option.trim(), // <-- Store answer in assistant message
        };

        setMessages((prev: Message[]) => [...prev, nextQuestion]);
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 500);
    } else {
      setTimeout(() => {
        const completionMessage: Message = {
          id: `completion-${Date.now()}`,
          role: "assistant",
          content:
            "Thank you for answering all the questions! Your responses have been recorded.",
          answer: option.trim(), // <-- Store answer in completion message if needed
        };

        setMessages((prev: Message[]) => [...prev, completionMessage]);
        setIsComplete(true);
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isComplete) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      options: [],
    };

    setMessages((prev: Message[]) => {
      if (prev.length === 0) return prev;

      const lastIndex = prev.length - 1;
      const updatedLast = { ...prev[lastIndex], answer: input.trim() };

      return [...prev.slice(0, lastIndex), updatedLast];
    });
    setMessages((prev: Message[]) => [...prev, userMessage]);

    setInput("");

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setTimeout(() => {
        const nextQuestion: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: questions[nextQuestionIndex].question,
          options: questions[nextQuestionIndex].options,
          answer: input.trim(), // <-- Store answer in assistant message
        };

        setMessages((prev: Message[]) => [...prev, nextQuestion]);
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 500);
    } else {
      setTimeout(() => {
        const completionMessage: Message = {
          id: `completion-${Date.now()}`,
          role: "assistant",
          content:
            "Thank you for answering all the questions! Your responses have been recorded.",
          answer: input.trim(), // <-- Store answer in completion message if needed
        };

        setMessages((prev: Message[]) => [...prev, completionMessage]);
        setIsComplete(true);
      }, 500);
    }
  };

  return { handleSubmit, handleInputChange, handleSubmitOption };
};
