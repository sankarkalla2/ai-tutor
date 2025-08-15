interface QuestionsProps {
  question: string;
  options?: string[];
}

interface AiQuestionChatProps {
  questions: QuestionsProps[];
  isLoading: boolean;
  messages: Message[];
  input: string;
  currentQuestionIndex: number;
  isComplete: boolean;
  setIsComplete: Dispatch<SetStateAction<boolean>>;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setInput: Dispatch<SetStateAction<string>>;
}



