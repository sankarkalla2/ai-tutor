"use client";

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
import { Suggestions } from "@/components/ai-elements/suggestion";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Book,
  Brain,
  BriefcaseBusiness,
  File,
  GraduationCap,
} from "lucide-react";
import { ModalProvider } from "@/components/modal-provider";
import TellAboutYourSelfForm from "@/modules/ask-tutor/ui/components/tell-about-self-form";
import { askAiTutor } from "../../hooks/use-ask-ai-tutor";
import { preQuestions } from "../../utils/data";

const AskTutorView = () => {
  const {
    open,
    setOpen,
    messages,
    onSelectTrigger,
    setInput,
    trigger,
    fileInputRef,
    files,
    setFiles,
    handleSubmit,
    input,
    status,
  } = askAiTutor();
  return (
    <div className="max-w-4xl mx-auto p-4 md:px-6 md:pb-10 relative size-full overflow-hidden devide-y h-[90vh] md:h-screen">
      <div className="flex flex-col h-full justify-end">
        <ModalProvider
          open={open}
          onOpenChange={() => {
            setOpen(false);
          }}
          title="Tell us about your self"
        >
          <TellAboutYourSelfForm setOpen={setOpen} />
        </ModalProvider>
        <Conversation className="h-full">
          <ConversationContent className="">
            {messages.length === 0 && (
              <Suggestions className="pt-10">
                <Tabs
                  defaultValue="learn"
                  className="w-full text-sm text-muted-foreground"
                >
                  <TabsList size="sm" variant="default" shape={"default"} className="overflow-y-auto">
                    <TabsTrigger
                      value="learn"
                      onClick={() => onSelectTrigger("learn")}
                    >
                      <Book /> Learn Topic
                    </TabsTrigger>
                    <TabsTrigger
                      value="career"
                      onClick={() => onSelectTrigger("career")}
                    >
                      <GraduationCap /> Life & Career Advice
                    </TabsTrigger>
                    <TabsTrigger
                      value="find job"
                      onClick={() => onSelectTrigger("job")}
                    >
                      <BriefcaseBusiness /> Help Me to Find Job
                    </TabsTrigger>
                    <TabsTrigger
                      value="test"
                      onClick={() => onSelectTrigger("test")}
                    >
                      <Brain /> Test My knowledge
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="learn">
                    <div className="flex flex-col items-start gap-y-2 w-full p-3">
                      {preQuestions.learnTopic.map((content, index) => (
                        <div
                          key={index}
                          className="text-gray-600 cursor-pointer border-b w-full py-2 hover:text-foreground"
                          onClick={() => setInput(content)}
                        >
                          {content}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="career">
                    <div className="flex flex-col items-start gap-y-2 w-full p-3">
                      {preQuestions.lifeAndCareerAdvice.map(
                        (content, index) => (
                          <div
                            key={index}
                            className="text-gray-600 cursor-pointer border-b w-full py-2 hover:text-foreground"
                            onClick={() => setInput(content)}
                          >
                            {content}
                          </div>
                        )
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="find job">
                    <div className="flex flex-col items-start gap-y-2 w-full p-3">
                      {preQuestions.helpFindJob.map((content, index) => (
                        <div
                          key={index}
                          className="text-gray-600 cursor-pointer border-b w-full py-2 hover:text-foreground"
                          onClick={() => setInput(content)}
                        >
                          {content}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="test">
                    <div className="flex flex-col items-start gap-y-2 w-full p-3">
                      {preQuestions.testKnowledge.map((content, index) => (
                        <div
                          key={index}
                          className="text-gray-600 cursor-pointer border-b w-full py-2 hover:text-foreground"
                          onClick={() => setInput(content)}
                        >
                          {content}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </Suggestions>
            )}
            {messages.map((message, index) => (
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
                        case "file":
                          return (
                            <iframe
                              key={`${message.id}-pdf-${index}`}
                              src={part.url}
                              width={250}
                              height={200}
                              title={`pdf-${index}`}
                            />
                          );
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

        <Suggestions>
          <Button
            size={"sm"}
            underlined={"dashed"}
            variant={"mono"}
            onClick={() => setOpen(true)}
          >
            Tell us about yourself
          </Button>
          {trigger !== "learn" && (
            <Button
              onClick={() => fileInputRef.current?.click()}
              size={"sm"}
              selected={files && files.length > 0}
            >
              {files &&
                files.length > 0 &&
                files[0].name &&
                "Resume: " +
                  files[0].name.substring(0, 5) +
                  "..." +
                  files[0].name.substring(
                    files[0].name.length - 5,
                    files[0].name.length
                  )}
              {!files && (
                <>
                  <File />
                  Upload Resume
                </>
              )}
            </Button>
          )}

          <input
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={(event) => {
              if (event.target.files) {
                setFiles(event.target.files);
              }
            }}
            ref={fileInputRef}
            disabled={(files && files.length > 0) || trigger === "learn"}
          />
        </Suggestions>
        <PromptInput
          onSubmit={handleSubmit}
          className="mt-1 bg-muted rounded-lg"
        >
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="rounded-lg bg-muted"
          />
          <PromptInputToolbar>
            <PromptInputTools></PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default AskTutorView;
