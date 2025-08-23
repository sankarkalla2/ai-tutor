import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useLessonView } from "../../hooks/use-lesson-view";
import { useParams } from "next/navigation";
import { Bot, Loader2, Send, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Response } from "@/components/markdown-content";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LoadingIndicator } from "./loading-indicator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import LessonChatLoadingSkeleton from "./chat-loading-skeleton";

interface LessonViewChatProps {
  className?: string;
}

export const LessonViewChat: React.FC<LessonViewChatProps> = ({
  className,
}) => {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
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

  const scrollToBottom = () => {
    scrollAreaRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading lesson: {"Unknown error"}
      </div>
    );
  }
  if (isLoading) {
    return <LessonChatLoadingSkeleton />;
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <ScrollArea className="flex-1 h-0 px-1 pt-2">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start p-1.5 gap-x-1 rounded bg-muted",
                message.role === "assistant" && "bg-primar text-black"
              )}
            >
              <div className="font-bold py-1">
                {message.role === "user" ? (
                  <User className="h-5 w-5" />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
              </div>
              <div className="prose text-sm">
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <Response key={index}>{part.text}</Response>;
                  }
                })}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="h-[70vh] w-full flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
          {status === "submitted" && (
            <div className="flex justify-start items-center">
              <LoadingIndicator />
            </div>
          )}
          <div ref={scrollAreaRef} />
        </div>
      </ScrollArea>
      <div className="">
        <div className="space-y-2 text-sm p-2">
          {data?.lesson &&
            data?.lesson?.previewQuestions.length > 0 &&
            messages.length === 0 &&
            data.lesson.previewQuestions.map((question, index) => (
              <div
                key={index}
                className="bg-primary p-1 rounded cursor-pointer text-black"
                onClick={() => setInput(question)}
              >
                {question}{" "}
              </div>
            ))}
        </div>
      </div>

      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            sendMessage({
              role: "user",
              parts: [{ type: "text", text: input }],
            });
            setInput("");
          }}
          className="w-full "
        >
          <div className="flex-shrink-0 bg-background">
            <div className="flex items-end">
              <Input
                className="ring-0 ring-offset-0 border-0 focus-visible:ring-0 w-full focus-visible:ring-offset-0 flex-1 "
                value={input}
                placeholder="Say something..."
                disabled={status === "submitted" || isLoading}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                type="submit"
                className="flex-shrink-0"
                disabled={status === "submitted" || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
