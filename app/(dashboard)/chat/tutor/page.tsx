"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import {
  ArrowLeft,
  Bell,
  Book,
  Brain,
  BriefcaseBusiness,
  File,
  GlobeIcon,
  GraduationCap,
  History,
  Home,
  MessageSquarePlus,
  Plus,
  ShieldCheck,
  UploadCloud,
  UserRound,
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
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PickCoursesCommand } from "@/modules/chat-with-course/ui/components/pick-courses-command";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ModalProvider } from "@/components/modal-provider";
import TellAboutYourSelfForm from "@/modules/ask-tutor/ui/components/tell-about-self-form";
import { file } from "zod";

const models = [
  {
    name: "GPT 4o",
    value: "openai/gpt-4o",
  },
  {
    name: "Deepseek R1",
    value: "deepseek/deepseek-r1",
  },
];
const suggestions = [
  "What are prereqsites to take this course?",
  "Test me with some questions from this course",
  "Can you make flashcards for the key concepts?",
  "how much time does it take to complete this course?",
];

const preQuestions = {
  learnTopic: [
    "Explain [photosynthesis / stock market basics / coding in Python] in simple terms.",
    "Can you create a step-by-step plan for me to learn [topic]?",
    "Give me practice exercises for [math algebra / public speaking / marketing].",
    "Summarize [this topic] like I’m a beginner.",
    "What are the most important things I should know about [topic]?",
  ],
  testKnowledge: [
    "Quiz me on [history / programming / business basics].",
    "Ask me 5 multiple choice questions about [topic].",
    "Give me a real-world scenario and test my problem-solving skills.",
    "Can you give me a short test and then grade me?",
    "Challenge me with advanced questions in [subject].",
  ],
  lifeAndCareerAdvice: [
    "I’m confused about what career path to choose. Can you guide me?",
    "How do I balance study and personal life better?",
    "What skills should I build for the future of work?",
    "I’m feeling stuck in my career — what can I do next?",
    "Can you suggest ways to improve my confidence?",
  ],
  helpFindJob: [
    "What are the best jobs for someone with my background in [field]?",
    "Can you help me write a resume for [job role]?",
    "What interview questions should I prepare for [job]?",
    "Where should I look for jobs if I’m interested in [industry]?",
    "How can I stand out when applying for jobs?",
  ],
};
async function convertFilesToDataURLs(
  files: FileList
): Promise<
  { type: "file"; filename: string; mediaType: string; url: string }[]
> {
  return Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<{
          type: "file";
          filename: string;
          mediaType: string;
          url: string;
        }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              type: "file",
              filename: file.name,
              mediaType: file.type,
              url: reader.result as string, // Data URL
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
}

const AskTutor = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [open, setOpen] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status, setMessages } = useChat();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [trigger, setTrigger] = useState<"learn" | "test" | "career" | "job">(
    "learn"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files && files.length > 0) {
      const fileParts =
        files && files.length > 0 ? await convertFilesToDataURLs(files) : [];

      sendMessage({
        role: "user",
        parts: [{ type: "text", text: input }, ...fileParts],
      });
      setFiles(undefined);
      setInput("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else if (input.trim()) {
      sendMessage(
        { text: input },

        {
          body: {
            model: model,
            webSearch: webSearch,
          },
        }
      );
      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };
  const onSelectTrigger = (value: typeof trigger) => {
    setTrigger(value);
  };
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
          <Button size={"sm"} variant={"secondary"}>
            <History />
            History
          </Button>
        </div>
      </div>

      <div className="flex flex-col h-full">
        {/* {messages.length === 0 && (
          <div className="pt-56 text-muted-foreground flex items-center gap-x-2 justify-center">
            <MessageSquarePlus className="h-4 w-4" />
            No conversation history
          </div>
        )} */}
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
                  <TabsList size="sm" variant="default" shape={"default"}>
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
        <PromptInput onSubmit={handleSubmit} className="mt-1">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton
                variant={webSearch ? "primary" : "ghost"}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default AskTutor;
