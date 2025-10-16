import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useQuestionsCht } from "../../hooks/use-questions-chat.";

const AiQuestionsChat = ({
  questions,
  isLoading,
  messages,
  input,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setMessages,
  setInput,
  isComplete,
  setIsComplete,
}: AiQuestionChatProps) => {
  const { handleInputChange, handleSubmit, handleSubmitOption } =
    useQuestionsCht({
      questions,
      isLoading,
      messages,
      input,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      setMessages,
      setInput,
      isComplete,
      setIsComplete,
    });

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-sm border bg-sidebar">
          <form onSubmit={handleSubmit}>
            <div className="h-96 overflow-y-auto p-4 space-y-4 text-sm">
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-yellow-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      <span>Preparing questions...</span>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-accent"
                    }`}
                  >
                    {message.content}
                    {message.options && message.options.length > 0 && (
                      <div className="mt-2 flex items-center gap-x-1">
                        {message.options.map(
                          (option: string, index: number) => (
                            <Badge
                              key={index}
                              onClick={() => {
                                handleSubmitOption(option);
                                message.answer = option;
                              }}
                              className="text-xs cursor-pointer"
                            >
                              {option}
                            </Badge>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Show progress indicator */}
              {!isLoading && questions.length > 0 && !isComplete && (
                <div className="text-center text-xs text-gray-500 mt-2">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              )}
            </div>

            <div className="flex space-x-2 border border-gray-300 rounded-md justify-between items-center">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder={
                  isComplete
                    ? "All questions completed"
                    : isLoading
                    ? "Waiting for questions..."
                    : "Type your answer..."
                }
                className="flex-1 py-5 rounded-md border-none outline-none ring-0 focus-visible:ring-0"
                disabled={isLoading || isComplete}
              />
              <Button
                disabled={isLoading || !input.trim() || isComplete}
                type="submit"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiQuestionsChat;
