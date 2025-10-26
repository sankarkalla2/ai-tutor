"use client";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
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

import { PickCoursesCommand } from "@/modules/chat-with-course/ui/components/pick-courses-command";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
import { useChatWithCourse } from "../../hooks/use-chat-with-course-id";

const ChatWithCourseIdView = () => {
  const { id } = useParams<{ id: string }>();
  const {
    suggestions,
    input,
    messages,
    status,
    handleSubmit,
    handleSuggestionClick,
    setInput
  } = useChatWithCourse(id);
  return (
    <div className="max-w-4xl mx-auto p-4 md:px-6 md:pb-10 relative size-full h-screen">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MobileSidebarToggleButton />
            <Button className="md:hidden" size={"sm"} variant={"outline"}>
              <ArrowLeft />
              Home
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <PickCoursesCommand courseId={id} />
        </div>
      </div>
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
                <Message from={message.role} key={message.id}>
                  <MessageContent>
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
        {messages.length === 0 && (
          <Suggestions className="">
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={handleSuggestionClick}
                suggestion={suggestion}
              />
            ))}
          </Suggestions>
        )}

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4 bg-muted rounded-xl"
        >
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="rounded-md"
          />
          <PromptInputToolbar>
            <PromptInputTools>
              
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatWithCourseIdView;
