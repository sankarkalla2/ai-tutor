import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useLessonView } from "../../hooks/use-lesson-view";
import { useParams } from "next/navigation";
import {
  Bot,
  Loader2,
  Send,
  SendIcon,
  SquareIcon,
  User,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { DefaultChatTransport } from "ai";

import { cn } from "@/lib/utils";
import { LoadingIndicator } from "./loading-indicator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import LessonChatLoadingSkeleton from "./chat-loading-skeleton";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import {
  GlobeIcon,
  MessageCircleCodeIcon,
  MessageSquare,
  MessageSquarePlus,
} from "lucide-react";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/source";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";

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

  // const scrollToBottom = () => {
  //   scrollAreaRef?.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

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

  // const handleQuestionClick = (question: string) => {
  //   setInput(question);
  // };

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
    // <div className="flex flex-col flex-1 overflow-hidden">
    //   <ScrollArea className="flex-1 h-0 px-1 pt-2">
    //     <div className="space-y-3">
    //       {messages.map((message) => (
    //         <div
    //           key={message.id}
    //           className={cn(
    //             "flex items-start p-1.5 gap-x-1 rounded bg-muted",
    //             message.role === "assistant" && "bg-primar text-black"
    //           )}
    //         >
    //           <div className="font-bold py-1">
    //             {message.role === "user" ? (
    //               <User className="h-5 w-5" />
    //             ) : (
    //               <Bot className="h-5 w-5" />
    //             )}
    //           </div>
    //           <div className="prose text-sm">
    //             {message.parts.map((part, index) => {
    //               if (part.type === "text") {
    //                 return <Response key={index}>{part.text}</Response>;
    //               }
    //             })}
    //           </div>
    //         </div>
    //       ))}
    //       {isLoading && (
    //         <div className="h-[70vh] w-full flex items-center justify-center">
    //           <Loader2 className="animate-spin" />
    //         </div>
    //       )}
    //       {status === "submitted" && (
    //         <div className="flex justify-start items-center">
    //           <LoadingIndicator />
    //         </div>
    //       )}
    //       <div ref={scrollAreaRef} />
    //     </div>
    //   </ScrollArea>
    //   <div className="">
    //     <div className="space-y-2 text-sm p-2">
    //       {data?.lesson &&
    //         data?.lesson?.previewQuestions.length > 0 &&
    //         messages.length === 0 &&
    //         data.lesson.previewQuestions.map((question, index) => (
    //           <div
    //             key={index}
    //             className="bg-primary p-1 rounded cursor-pointer text-black"
    //             onClick={() => setInput(question)}
    //           >
    //             {question}{" "}
    //           </div>
    //         ))}
    //     </div>
    //   </div>

    //   <div>
    //     <form
    //       onSubmit={async (event) => {
    //         event.preventDefault();
    //         sendMessage({
    //           role: "user",
    //           parts: [{ type: "text", text: input }],
    //         });
    //         setInput("");
    //       }}
    //       className="w-full "
    //     >
    //       <div className="flex-shrink-0 bg-background">
    //         <div className="flex items-end">
    //           <Input
    //             className="ring-0 ring-offset-0 border-0 focus-visible:ring-0 w-full focus-visible:ring-offset-0 flex-1 "
    //             value={input}
    //             placeholder="Say something..."
    //             disabled={status === "submitted" || isLoading}
    //             onChange={(e) => setInput(e.target.value)}
    //           />
    //           <Button
    //             type="submit"
    //             className="flex-shrink-0"
    //             disabled={status === "submitted" || isLoading}
    //           >
    //             <Send className="h-4 w-4" />
    //           </Button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div className="max-w-4xl mx-auto relative size-full h-[100vh-33px] p-1">
      <div className="flex flex-col h-full">
        {messages.length === 0 && (
          <div className="pt-56 text-muted-foreground flex items-center gap-x-2 justify-center">
            <MessageSquarePlus className="h-4 w-4" />
            No conversation history
          </div>
        )}
        <Conversation className="h-full">
          <ConversationContent className="">
            {messages.map((message) => (
              <div key={message.id} className=".scrollbar-hide overflow-hidden">
                {message.role === "assistant" && (
                  <Sources>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "source-url":
                          return (
                            <div key={i}>
                              <SourcesTrigger
                                count={
                                  message.parts.filter(
                                    (part) => part.type === "source-url"
                                  ).length
                                }
                              />
                              <SourcesContent key={`${message.id}-${i}`}>
                                <Source
                                  key={`${message.id}-${i}`}
                                  href={part.url}
                                  title={part.url}
                                />
                              </SourcesContent>
                            </div>
                          );
                      }
                    })}
                  </Sources>
                )}
                <Message
                  from={message.role}
                  key={message.id}
                  className="w-full"
                >
                  <MessageContent className="w-full !max-w-full">
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Response key={`${message.id}-${i}`}>
                              {part.text}
                            </Response>
                          );
                        case "reasoning":
                          return (
                            <Reasoning
                              key={`${message.id}-${i}`}
                              className="w-full"
                              isStreaming={status === "streaming"}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              </div>
            ))}
            {status === "submitted" && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        {messages.length === 0 && data?.lesson && (
          <Suggestions className="pb-2">
            {data.lesson.previewQuestions.map((question, index) => (
              <span
                key={index}
                className="bg-primary p-1 rounded cursor-pointer text-black text-xs"
                onClick={() => setInput(question)}
              >
                {question}{" "}
              </span>
            ))}
          </Suggestions>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full overflow-hidden flex items-center border rounded-xl bg-secondary pr-1 "
        >
          <Input
            className="ring-0 ring-offset-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            type="submit"
            className=""
            size={"sm"}
            disabled={!input || status === "submitted"}
          >
            {status === "submitted" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "streaming" ? (
              <SquareIcon className="h-4 w-4" />
            ) : status === "error" ? (
              <X className="h-4 w-4" />
            ) : (
              <SendIcon />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
