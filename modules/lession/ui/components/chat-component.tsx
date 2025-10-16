import {
  Loader2,
  SendIcon,
  SquareIcon,
  X,
  MessageSquarePlus,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Suggestions } from "@/components/ai-elements/suggestion";
import { PromptInput } from "@/components/ai-elements/prompt-input";
import { Message, MessageContent } from "@/components/ai-elements/message";
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
import { Response } from "@/components/ai-elements/response";

import LessonChatLoadingSkeleton from "./chat-loading-skeleton";
import { useLessonViewchat } from "../../hooks/use-lesson-view-chat";
import ErrorPage from "@/components/error";

export const LessonViewChat = () => {
  const {
    data,
    isLoading,
    input,
    setInput,
    isError,
    handleSubmit,
    messages,
    status,
  } = useLessonViewchat();

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full">
        <ErrorPage errorMessage="Error fetching Course. Please try again" />;
      </div>
    );
  }
  if (isLoading) {
    return <LessonChatLoadingSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto relative size-full p-1">
      <div className="flex flex-col h-full">
        {messages.length === 0 && (
          <div className="text-muted-foreground flex items-center gap-x-2 justify-center h-full my-auto">
            <MessageSquarePlus className="h-4 w-4" />
            No conversation history
          </div>
        )}
        <Conversation className="h-full">
          <ConversationContent className="p-2">
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
                  className="w-full  py-0 px-0"
                >
                  <MessageContent className="w-full !max-w-full px-1">
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
                className="bg-primary  p-1 rounded cursor-pointer text-white text-xs"
                onClick={() => setInput(question)}
              >
                {question}{" "}
              </span>
            ))}
          </Suggestions>
        )}

        <PromptInput onSubmit={handleSubmit}>
          <Input
            className="ring-0 ring-offset-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            type="submit"
            variant={"primary"}
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
        </PromptInput>
      </div>
    </div>
  );
};
