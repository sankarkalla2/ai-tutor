"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Map, Sparkles, Send, Trash2 } from "lucide-react";
import { useChat, UseChatOptions } from "ai/react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Format = "course" | "guide" | "roadmap";

export const NewCoursePageView = () => {
  const [topic, setTopic] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<Format>("course");
  const [enableQuestions, setEnableQuestions] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      initialMessages: [],
      onFinish: () => {
        // Chat finished
      },
    });

  const handleCreateCourse = () => {
    if (!topic) {
      toast.error("Plase select the topic");
      return;
    }
  };

  const formats = [
    {
      id: "course" as Format,
      name: "Course",
      icon: BookOpen,
      description: "Structured learning path",
    },
    {
      id: "guide" as Format,
      name: "Guide",
      icon: FileText,
      description: "Step-by-step instructions",
    },
    {
      id: "roadmap" as Format,
      name: "Roadmap",
      icon: Map,
      description: "Learning progression map",
    },
  ];
  return (
    <div className="min-h-screen mx-auto p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Badge variant="secondary" className="text-xs">
              2 of 2 courses
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="ml-4 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
            >
              Need more? Upgrade
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            What can I help you learn?
          </h1>
          <p className="text-gray-600">
            Enter a topic below to generate a personalized course for it
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium  mb-2">
                  What can I help you learn?
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic"
                  className="w-full border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Choose the format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {formats.map((format) => {
                    const Icon = format.icon;
                    return (
                      <button
                        key={format.id}
                        type="button"
                        onClick={() => setSelectedFormat(format.id)}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          selectedFormat === format.id
                            ? "border-blue-500 bg-secondary-foreground"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2 " />
                        <div className="font-medium">{format.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={enableQuestions}
                  id="terms"
                  className="border border-gray-300"
                  onClick={() => {
                    if (!topic) {
                      toast.error("Please enter a topic");
                      return;
                    }
                    setEnableQuestions(!enableQuestions);
                  }}
                />
                <Label htmlFor="terms">
                  Answer questions for more effieciency in course
                </Label>
              </div>

              <div>
                {enableQuestions && (
                  <div className=" p-4">
                    <div className="max-w-4xl mx-auto">
                      <div className="rounded-lg shadow-sm border bg-sidebar">
                        <form onSubmit={handleSubmit}>
                          <div className="h-96 overflow-y-auto p-4 space-y-4 text-sm">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex ${
                                  message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >
                                <div
                                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    message.role === "user"
                                      ? "bg-blue-500 text-white"
                                      : "bg-yellow-100 text-gray-800"
                                  }`}
                                >
                                  {message.content}
                                </div>
                              </div>
                            ))}
                            {isLoading && (
                              <div className="flex justify-start">
                                <div className="bg-yellow-100 text-gray-800 px-4 py-2 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                    <span>AI is thinking...</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2 border border-gray-300 rounded-md justify-between items-center">
                            <Input
                              value={input}
                              onChange={handleInputChange}
                              placeholder="Type your answer..."
                              className="flex-1 py-5 rounded-md border-none outline-none ring-0 focus-visible:ring-0"
                              disabled={isLoading}
                            />
                            <Button
                              disabled={isLoading || !input.trim()}
                              type="submit"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                className="w-full"
                disabled={!topic}
                onClick={handleCreateCourse}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
